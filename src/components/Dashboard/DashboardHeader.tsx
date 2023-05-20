import { type ReactNode } from "react";

export default function DashboardHeader({ children }: { children: ReactNode }) {
  return <header className="mb-6 text-slate-700">{children}</header>;
}
