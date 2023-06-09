import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const calendarEventRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.calendarEvent.findMany({
      include: {
        User: true,
      },
      orderBy: {
        date: "asc",
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        appointmentId: z.string().optional(),
        title: z.string(),
        date: z.date(),
        description: z.string(),
        label: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.prisma.calendarEvent.create({
          data: {
            userId: input.userId,
            title: input.title,
            date: input.date,
            description: input.description,
            label: input.label,
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
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        date: z.date(),
        description: z.string(),
        label: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const calendarEvent = await ctx.prisma.calendarEvent.findUnique({
          where: {
            id: input.id,
          },
        });

        if (
          calendarEvent?.appointmentId &&
          calendarEvent.type === "consultation"
        ) {
          await ctx.prisma.appointment.update({
            where: {
              id: calendarEvent.appointmentId,
            },
            data: {
              consultationDate: input.date.toISOString(),
            },
          });
        }

        return ctx.prisma.calendarEvent.update({
          where: {
            id: input.id,
          },
          data: {
            title: input.title,
            date: input.date,
            description: input.description,
            label: input.label,
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
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const calendarEvent = await ctx.prisma.calendarEvent.findUnique({
          where: {
            id: input.id,
          },
        });

        if (
          calendarEvent?.appointmentId &&
          calendarEvent.type === "consultation"
        ) {
          await ctx.prisma.appointment.update({
            where: {
              id: calendarEvent.appointmentId,
            },
            data: {
              consultationDate: null,
            },
          });
        }

        return ctx.prisma.calendarEvent.delete({
          where: {
            id: input.id,
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
