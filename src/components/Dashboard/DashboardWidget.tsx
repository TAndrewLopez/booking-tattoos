import { useRouter } from "next/router";
import { type ReactNode } from "react";

interface DashboardWidgetProps {
  icon?: ReactNode;
  iconPOS?: "left" | "right";
  navigateOnClick?: string;
  defaultColor?: "default" | "error" | "caution" | "success";
  title: string;
  content?: ReactNode;
}

export default function DashboardWidget({
  icon,
  iconPOS,
  navigateOnClick,
  defaultColor,
  title,
  content,
}: DashboardWidgetProps) {
  const router = useRouter();
  return (
    <div
      onClick={navigateOnClick ? () => router.push(navigateOnClick) : undefined}
      className={`flex max-w-[200px] flex-1 flex-col gap-4 rounded-lg border border-neutral-200 px-3 py-6 shadow duration-300 ease-in-out
      ${navigateOnClick ? "cursor-pointer" : ""}
      ${defaultColor === "default" ? "hover:shadow-slate-400" : ""}
      ${defaultColor === "error" ? "hover:shadow-red-400" : ""}
      ${defaultColor === "caution" ? "hover:shadow-amber-400" : ""}
      ${defaultColor === "success" ? "hover:shadow-emerald-400" : ""}
      `}
    >
      <p
        className={`text-base font-medium
        ${defaultColor === "default" ? "text-slate-400" : ""}
        ${defaultColor === "error" ? "text-red-400" : ""}
        ${defaultColor === "caution" ? "text-amber-400" : ""}
        ${defaultColor === "success" ? "text-emerald-400" : ""}
         `}
      >
        {title}
      </p>
      {content && (
        <div className="text-2xl font-semibold">
          {iconPOS === "left" && (
            <span className="flex w-fit items-center gap-1">
              {icon}
              {content}
            </span>
          )}
          {!iconPOS && content}
          {iconPOS === "right" && (
            <span className="flex w-fit items-center gap-1">
              {content}
              {icon}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
