import type { Ticket, User } from "@/types";
import { useRouter } from "next/router";

interface TableContentProps {
  pagePath?: string;
  tableData?: User[] | Ticket[];
  tableColumnNames?: string[];
}

export function TableContent({
  pagePath,
  tableData,
  tableColumnNames,
}: TableContentProps) {
  const router = useRouter();

  return (
    <>
      {tableData &&
        tableData.map((item) => {
          return (
            <tr
              key={item.id}
              className={`bg-gray-800 transition 
              ${pagePath ? "cursor-pointer hover:bg-neutral-500" : ""}
              `}
              onClick={() =>
                pagePath ? void router.push(`/${pagePath}/${item.id}`) : null
              }
            >
              {tableColumnNames?.map((col, i) => (
                <td
                  key={col + String(i)}
                  className="px-6 py-4 font-medium text-white"
                >
                  {String(item[col as keyof typeof item])}
                </td>
              ))}
            </tr>
          );
        })}
    </>
  );
}
