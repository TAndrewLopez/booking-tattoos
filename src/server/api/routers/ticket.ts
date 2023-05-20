import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const ticketRouter = createTRPCRouter({
  getAllTickets: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.ticket.findMany({
      include: {
        user: true,
      },
    });
  }),
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
  toggleViewed: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const selectedTicket = await ctx.prisma.ticket.findUnique({
          where: {
            id: input.id,
          },
        });

        if (!selectedTicket) return null;

        return ctx.prisma.ticket.update({
          where: {
            id: input.id,
          },
          data: {
            viewed: !selectedTicket.viewed,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          cause: error,
        });
      }
      return {};
    }),
  updateTicket: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        category: z.string().optional(),
        priority: z.string().optional(),
        description: z.string().optional(),
        steps: z.string().optional(),
        viewed: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const updatedTicket = await ctx.prisma.ticket.update({
          where: {
            id: input.id,
          },
          data: {},
        });

        return {
          ...updatedTicket,
          success: "true",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          cause: error,
        });
      }
      return {};
    }),
});
