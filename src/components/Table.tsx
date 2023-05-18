import { useRouter } from "next/router";
import type { Ticket, User } from "@/types";

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

interface TableHeaderProps {
  title: string;
  navigateToList?: () => void;
}

export function TableHeader({ title, navigateToList }: TableHeaderProps) {
  return (
    <h3
      onClick={navigateToList}
      className={`rounded-t-lg border-b border-neutral-400 bg-gray-800 p-4 text-center text-base font-semibold capitalize text-white
      ${navigateToList ? "cursor-pointer hover:bg-neutral-500" : ""}
      `}
    >
      {title}
    </h3>
  );
}
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
                  className="whitespace-nowrap px-6 py-4 font-medium text-white"
                >
                  {String(item[col as keyof typeof item]) || "null"}
                </td>
              ))}
            </tr>
          );
        })}
    </>
  );
}
