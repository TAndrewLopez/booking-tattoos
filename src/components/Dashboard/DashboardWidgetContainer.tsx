import { type ReactNode } from "react";

interface DashboardWidgetContainerProps {
  children: ReactNode;
}

export default function DashboardWidgetContainer({
  children,
}: DashboardWidgetContainerProps) {
  return (
    <div className="mb-6 border-y border-neutral-300 py-6">{children}</div>
  );
}
