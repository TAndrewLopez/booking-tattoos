import { mailOptions, transporter } from "@/lib/nodemailer";
import { generateTattooRequestConfirmationEmailContent } from "@/utils/emailGeneration";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const appointmentRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.appointment.findMany({
      include: {
        appointmentDates: true,
        notes: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  getConsultations: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.appointment.findMany({
      where: {
        requiresConsultation: true,
      },
      include: {
        notes: {
          include: {
            user: true,
          },
        },
      },
    });
  }),
  getSingleAppointment: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const existingAppointment = await ctx.prisma.appointment.findUnique({
          where: {
            id: input.id,
          },
          include: {
            appointmentDates: true,
            notes: true,
          },
        });
        if (!existingAppointment) return {};
        return existingAppointment;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          cause: error,
        });
      }
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        preferredPronouns: z.string(),
        email: z.string(),
        phoneNumber: z.string(),
        description: z.string(),
        size: z.string(),
        placement: z.string(),
        color: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // SEND EMAIL CONFIRMATION TO USER AFTER SUBMITTING TATTOO REQUEST
      try {
        const appointment = ctx.prisma.appointment.create({
          data: {
            name: input.name,
            preferredPronouns: input.preferredPronouns,
            email: input.email,
            phoneNumber: input.phoneNumber,
            description: input.description,
            size: input.size,
            placement: input.placement,
            color: input.color,
          },
          include: {
            appointmentDates: true,
            notes: {
              include: {
                user: true,
              },
            },
          },
        });
        await transporter.sendMail({
          ...mailOptions,
          ...generateTattooRequestConfirmationEmailContent({
            name: input.name,
            preferredPronouns: input.preferredPronouns,
            email: input.email,
            phoneNumber: input.phoneNumber,
            description: input.description,
            size: input.size,
            placement: input.placement,
            color: input.color,
          }),
          subject: "Tattoo Request Confirmation",
        });
        return appointment;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          cause: error,
        });
      }
    }),
  updateContactAndTattooInformation: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        preferredPronouns: z.string(),
        email: z.string(),
        phoneNumber: z.string(),
        description: z.string(),
        size: z.string(),
        placement: z.string(),
        color: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.prisma.appointment.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            preferredPronouns: input.preferredPronouns,
            email: input.email,
            phoneNumber: input.phoneNumber,
            description: input.description,
            size: input.size,
            placement: input.placement,
            color: input.color,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          cause: error,
        });
      }
    }),
  updateAcceptedAppointment: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        accepted: z.boolean().optional(),
        requiresConsultation: z.boolean().optional(),
        consultationDate: z.string().optional(),
        sessionsAmount: z.string().optional(),
        appointmentDates: z
          .object({
            id: z.string().optional(),
            date: z.string(),
            type: z.string(),
          })
          .array()
          .optional(),
        depositPaid: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedAppointment = await ctx.prisma.appointment.update({
          where: {
            id: input.id,
          },
          data: {
            accepted: input.accepted,
            requiresConsultation: input.requiresConsultation,
            consultationDate: input.consultationDate,
            sessionsAmount: input.sessionsAmount,
            depositPaid: input.depositPaid,
            rejectionReason: null,
            otherReason: null,
            tattooReferral: null,
          },
          include: {
            appointmentDates: true,
          },
        });

        const consultationEvent = await ctx.prisma.calendarEvent.findFirst({
          where: {
            appointmentId: updatedAppointment.id,
            type: "consultation",
          },
        });

        const existingAppointmentDates =
          updatedAppointment.appointmentDates.filter(
            (apt) => apt.type === "appointment"
          );

        if (
          !input.appointmentDates?.length &&
          existingAppointmentDates.length
        ) {
          await ctx.prisma.calendarEvent.deleteMany({
            where: {
              appointmentId: updatedAppointment.id,
              type: "appointment",
            },
          });
        }

        if (
          input.appointmentDates?.length &&
          !existingAppointmentDates.length
        ) {
          await Promise.all(
            input.appointmentDates.map((apt, i) =>
              ctx.prisma.calendarEvent.create({
                data: {
                  appointmentId: updatedAppointment.id,
                  date: new Date(apt.date),
                  description: updatedAppointment.description,
                  type: "appointment",
                  label: "green",
                  title: `${updatedAppointment.name} Appt # ${i + 1}`,
                },
              })
            )
          );
        }

        if (input.appointmentDates?.length && existingAppointmentDates.length) {
          await Promise.all(
            input.appointmentDates.map(async (apt, i) => {
              if (apt.id && apt.date) {
                await ctx.prisma.calendarEvent.update({
                  where: {
                    id: apt.id,
                  },
                  data: {
                    date: new Date(apt.date),
                    title: `${updatedAppointment.name} Appt # ${i + 1}`,
                  },
                });
              }

              if (apt.id && !apt.date) {
                await ctx.prisma.calendarEvent.delete({
                  where: {
                    id: apt.id,
                  },
                });
              }

              if (!apt.id && apt.date) {
                await ctx.prisma.calendarEvent.create({
                  data: {
                    appointmentId: updatedAppointment.id,
                    date: new Date(apt.date),
                    description: updatedAppointment.description,
                    type: "appointment",
                    label: "green",
                    title: `${updatedAppointment.name} Appt # ${i + 1}`,
                  },
                });
              }
            })
          );
        }

        if (!consultationEvent) {
          if (updatedAppointment.consultationDate) {
            const newConsultationEvent = await ctx.prisma.calendarEvent.create({
              data: {
                type: "consultation",
                title: `${updatedAppointment.name} Consultation`,
                date: new Date(updatedAppointment.consultationDate),
                description: updatedAppointment.description,
                appointmentId: updatedAppointment.id,
                label: "indigo",
              },
            });
            return { updatedAppointment, newConsultationEvent };
          }
        } else {
          if (!input.consultationDate) {
            const deletedConsultationEvent =
              await ctx.prisma.calendarEvent.delete({
                where: {
                  id: consultationEvent.id,
                },
              });
            return { updatedAppointment, deletedConsultationEvent };
          }

          const datesEqual =
            updatedAppointment.consultationDate ===
            consultationEvent.date.toISOString();
          if (datesEqual) {
            return updatedAppointment;
          } else {
            const updatedConsultationEvent =
              await ctx.prisma.calendarEvent.update({
                where: {
                  id: consultationEvent.id,
                },
                data: {
                  date: input.consultationDate,
                },
              });
            return { updatedAppointment, updatedConsultationEvent };
          }
        }
        return updatedAppointment;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          cause: error,
        });
      }
    }),
  updateRejectedAppointment: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        rejectionReason: z.string().optional(),
        otherReason: z.string().optional(),
        tattooReferral: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedAppointment = await ctx.prisma.appointment.update({
          where: {
            id: input.id,
          },
          data: {
            accepted: false,
            requiresConsultation: null,
            sessionsAmount: null,
            depositPaid: null,
            consultationDate: null,
            rejectionReason: input.rejectionReason,
            otherReason: input.otherReason,
            tattooReferral: input.tattooReferral,
          },
        });
        await ctx.prisma.calendarEvent.deleteMany({
          where: {
            appointmentId: input.id,
          },
        });
        return updatedAppointment;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          cause: error,
        });
      }
    }),
  clearAppointment: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedAppointment = await ctx.prisma.appointment.update({
          where: {
            id: input.id,
          },
          data: {
            accepted: null,
            requiresConsultation: null,
            sessionsAmount: null,
            depositPaid: null,
            rejectionReason: null,
            otherReason: null,
            tattooReferral: null,
          },
        });
        await ctx.prisma.calendarEvent.deleteMany({
          where: {
            appointmentId: input.id,
          },
        });
        return updatedAppointment;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          cause: error,
        });
      }
    }),
  addReferenceImage: protectedProcedure
    .input(
      z.object({
        appointmentId: z.string(),
        firebaseRef: z.string(),
        referenceImageURL: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.prisma.appointment.update({
          where: {
            id: input.appointmentId,
          },
          data: {
            firebaseRef: input.firebaseRef,
            referenceImageURL: input.referenceImageURL,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          cause: error,
        });
      }
    }),
  removeReferenceImage: protectedProcedure
    .input(
      z.object({
        appointmentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.prisma.appointment.update({
          where: {
            id: input.appointmentId,
          },
          data: {
            firebaseRef: null,
            referenceImageURL: null,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          cause: error,
        });
      }
    }),
});
