import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const appointmentRouter = createTRPCRouter({
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
});
