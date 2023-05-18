import { type ReactNode } from "react";

export default function DashboardWidgets({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mb-6 border-y border-neutral-300 py-6">{children}</div>
  );
}

export function DashboardHeader({ children }: { children: ReactNode }) {
  return <header className="mb-6 text-slate-700">{children}</header>;
}

interface WidgetProps {
  defaultColor?: "caution" | "error";
  customHex?: string;
  title: string;
  content?: string;
}

export function Widget({
  defaultColor,
  customHex,
  title,
  content,
}: WidgetProps) {
  return (
    <div className="flex max-w-[200px] flex-1 flex-col gap-4 rounded-lg border border-neutral-200 px-3 py-6 shadow">
      <p
        className={`text-sm font-medium
        ${defaultColor === "error" ? "text-red-700" : ""}
        ${defaultColor === "caution" ? "text-amber-400" : ""}
        ${customHex ? `${customHex}` : ""}
         `}
      >
        {title}
      </p>
      <p className="text-2xl font-semibold">{content}</p>
    </div>
  );
}
