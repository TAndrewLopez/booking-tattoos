import { useRouter } from "next/router";
import type { Ticket, User } from "@/types";
import { TableHeader } from "./TableHeader";
import { TableContent } from "./TableContent";

interface TableProps {
  showHeader?: boolean;
  pagePath?: string;
  tableName?: string;
  tableData?: User[] | Ticket[];
  tableColumnNames?: string[];
}

export default function Table({
  showHeader,
  pagePath,
  tableName,
  tableData,
  tableColumnNames,
}: TableProps) {
  const router = useRouter();
  const showTableHeader = showHeader && tableName;

  if (!tableData)
    return (
      <div>
        <p>Loading</p>
      </div>
    );

  return (
    <div className="relative overflow-x-auto">
      {showTableHeader && (
        <TableHeader
          title={`${tableName} Count: ${tableData.length} total`}
          navigateToList={
            pagePath ? () => void router.push(`/${pagePath}`) : undefined
          }
        />
      )}

      <table
        className={`w-full bg-gray-800 text-left text-sm text-gray-400
      ${!showTableHeader ? "rounded-t-xl" : ""}
      `}
      >
        <thead className="text-xs uppercase text-gray-400">
          <tr>
            {tableColumnNames?.map((name, i) => (
              <th key={name + String(i)} scope="col" className="px-6 py-3">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <TableContent
            pagePath={pagePath}
            tableData={tableData}
            tableColumnNames={tableColumnNames}
          />
        </tbody>
      </table>
    </div>
  );
}
