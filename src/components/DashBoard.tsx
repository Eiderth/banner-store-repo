import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import type { Links } from "../types";

type Props = {
  liElements: Links[];
  changueSection: (section: "form" | "data" | "banner") => void;
} & ComponentProps<"ul">;

export default function DashBoard({
  liElements,
  changueSection,
  ...props
}: Props) {
  return (
    <ul
      className={twMerge(
        "flex gap-2.5 justify-end bg-blue-300 p-2 px-4 w-full",
        props.className
      )}
      {...props}
    >
      {liElements.map((item, idx) => (
        <li
          key={`${item.li}-${idx}`}
          className="bg-green-400 px-2  rounded-2xl font-medium"
          onClick={() => changueSection(item.link)}
        >
          <a href={`#${item.link.toLowerCase()}`}>{item.li.toLowerCase()}</a>
        </li>
      ))}
    </ul>
  );
}
