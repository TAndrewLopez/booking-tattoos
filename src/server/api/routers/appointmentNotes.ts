import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const appointmentNotesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        appointmentId: z.string(),
        text: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const note = ctx.prisma.appointmentNotes.create({
          data: {
            userId: input.userId,
            appointmentId: input.appointmentId,
            text: input.text,
          },
        });
        return note;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          cause: error,
        });
      }
    }),
});
