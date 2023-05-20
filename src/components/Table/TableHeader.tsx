interface TableHeaderProps {
  title: string;
  navigateToList?: () => void;
}

export function TableHeader({ title, navigateToList }: TableHeaderProps) {
  return (
    <h3
      onClick={navigateToList}
      className={`w-full rounded-t-lg border-b border-neutral-400 bg-gray-800 p-4 text-center text-base font-semibold capitalize text-white
      ${navigateToList ? "cursor-pointer hover:bg-neutral-500" : ""}
      `}
    >
      {title}
    </h3>
  );
}
