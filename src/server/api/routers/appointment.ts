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
  updateAppointment: protectedProcedure
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
        accepted: z.boolean().optional(),
        requiresConsultation: z.boolean().optional(),
        consultationDate: z.date().optional(),
        sessionsAmount: z.string().optional(),
        depositPaid: z.boolean().optional(),
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
            accepted: input.accepted,
            requiresConsultation: input.requiresConsultation,
            consultationDate: input.consultationDate,
            sessionsAmount: input.sessionsAmount,
            depositPaid: input.depositPaid,
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
  addReferenceImage: protectedProcedure
    .input(
      z.object({
        appointmentId: z.string(),
        imageURL: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.prisma.appointment.update({
          where: {
            id: input.appointmentId,
          },
          data: {
            referenceImageURL: input.imageURL,
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
