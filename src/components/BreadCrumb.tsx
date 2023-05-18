import Link from "next/link";

interface BreadCrumbsProps {
  baseLink: string;
  links?: string[];
  baseIcon: JSX.Element;
  separator: JSX.Element;
}

const BreadCrumbs = ({
  baseLink,
  links,
  baseIcon: BaseIcon,
  separator: Separator,
}: BreadCrumbsProps) => {
  return (
    <div className="w-fit">
      <nav
        className="flex rounded-lg border border-gray-200 bg-gray-50 px-5 py-3 text-gray-700 dark:border-gray-700 dark:bg-gray-800"
        aria-label="BreadCrumbs"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {links?.length ? (
            links?.map((item, i) => {
              return (
                <li key={item + String(i)} className="inline-flex items-center">
                  <Link
                    href={i < 1 ? baseLink : `${item}/`}
                    className="inline-flex items-center text-sm font-medium capitalize text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    {i < 1 ? BaseIcon : Separator}
                    {item ? item : baseLink.slice(1)}
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="inline-flex items-center">
              <Link
                href={baseLink}
                className="inline-flex items-center text-sm font-medium capitalize text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                {BaseIcon}
                {baseLink.slice(1)}
              </Link>
            </li>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumbs;
/*
<svg
  aria-hidden="true"
  className="mr-2 h-4 w-4"
  fill="currentColor"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
</svg>

<svg
aria-hidden="true"
className="h-6 w-6 text-gray-400"
fill="currentColor"
viewBox="0 0 20 20"
xmlns="http://www.w3.org/2000/svg"
>
<path
  fill-rule="evenodd"
  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
  clip-rule="evenodd"
></path>
</svg>
*/
