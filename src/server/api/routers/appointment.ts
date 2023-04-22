import { mailOptions, transporter } from "@/lib/nodemailer";
import { generateTattooRequestConfirmationEmailContent } from "@/utils/emailGeneration";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const appointmentRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.appointment.findMany({
      include: {
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
            tattooReferral: null,
          },
        });

        const consultationEvent = await ctx.prisma.calendarEvent.findFirst({
          where: {
            appointmentId: updatedAppointment.id,
            type: "consultation",
          },
        });

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
            rejectionReason: input.rejectionReason,
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
