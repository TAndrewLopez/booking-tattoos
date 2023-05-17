import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

export const userRouter = createTRPCRouter({
  createUser: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        role: z.enum(["admin", "dev"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { email, password, role } = input;
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = ctx.prisma.user.create({
          data: {
            email,
            hashedPassword,
            role,
          },
        });

        return createdUser;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          cause: error,
        });
      }
    }),

  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    try {
      return ctx.prisma.user.findMany();
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        cause: error,
      });
    }
  }),
  updateRole: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        role: z.enum(["admin", "dev"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.prisma.user.update({
          where: {
            id: input.id,
          },
          data: {
            role: input.role,
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
