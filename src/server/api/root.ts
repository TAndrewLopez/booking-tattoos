import { createTRPCRouter } from "@/server/api/trpc";
import { appointmentRouter } from "./routers/appointment";
import { calendarEventRouter } from "./routers/calendarEvent";
import { appointmentNotesRouter } from "./routers/appointmentNotes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  appointment: appointmentRouter,
  appointmentNotes: appointmentNotesRouter,
  calendarEvents: calendarEventRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
