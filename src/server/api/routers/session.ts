import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const sessionRouter = createTRPCRouter({
  createSessionToken: protectedProcedure
    .input(
      z.object({
        sessionToken: z.string(),
        userId: z.string(),
        expires: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.prisma.session.create({
          data: {
            expires: input.expires,
            sessionToken: input.sessionToken,
            userId: input.userId,
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
