import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { mailOptions, transporter } from "@/lib/nodemailer";
import { generateTattooRequestConfirmationEmailContent } from "@/utils/emailGeneration";

export const appointmentRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.appointment.findMany({
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
      } catch (error) {
        console.log(error);
      }
      return ctx.prisma.appointment.create({
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
    }),
  update: protectedProcedure
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
        userId: z.string().nullish(),
        requiresConsultation: z.boolean().optional(),
        consultationDate: z.date().optional(),
        accepted: z.boolean().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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
          requiresConsultation: input.requiresConsultation,
          consultationDate: input.consultationDate,
          accepted: input.accepted,
          notes: input.notes,
        },
      });
    }),
});
