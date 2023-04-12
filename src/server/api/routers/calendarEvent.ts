import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const calendarEventRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.calendarEvent.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        label: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.calendarEvent.create({
        data: {
          title: input.title,
          date: input.date,
          description: input.description,
          label: input.label,
        },
      });
    }),
  remove: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.calendarEvent.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
