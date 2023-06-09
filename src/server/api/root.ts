import { createTRPCRouter } from "@/server/api/trpc";
import { appointmentRouter } from "./routers/appointment";
import { appointmentNotesRouter } from "./routers/appointmentNotes";
import { calendarEventRouter } from "./routers/calendarEvent";
import { ticketRouter } from "./routers/ticket";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  appointment: appointmentRouter,
  appointmentNotes: appointmentNotesRouter,
  calendarEvents: calendarEventRouter,
  ticket: ticketRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
