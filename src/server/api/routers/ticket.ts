import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const ticketRouter = createTRPCRouter({
  createTicket: protectedProcedure
    .input(
      z.object({
        category: z.string(),
        priority: z.string(),
        description: z.string(),
        steps: z.string(),
        userId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.prisma.ticket.create({
          data: {
            category: input.category,
            priority: input.priority,
            description: input.description,
            steps: input.steps,
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
  getAllTickets: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.ticket.findMany();
  }),
});
