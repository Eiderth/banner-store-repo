import type { ComponentProps, ReactElement } from "react";
import { twMerge } from "tailwind-merge";

export type Links = {
  link: string;
  icon: ReactElement;
  info?: string;
};

type Props = {
  className?: string;
  links: Links[];
  classNameLi?: string;
  classNameSpan?: string;
} & ComponentProps<"nav">;

export default function NavBar({
  className,
  links,
  classNameLi,
  classNameSpan,
  ...props
}: Props) {
  return (
    <nav {...props}>
      <ul className={twMerge("flex flex-col relative gap-3.5", className)}>
        {links.map((link) => (
          <li
            key={link.link}
            className={twMerge("transition-all relative group", classNameLi)}
          >
            <a href={`#${link.link}`}>{link.icon}</a>
            {link.info && (
              <span
                className={twMerge(
                  "transition-opacity group-hover:opacity-100 opacity-0 group-hover:inline-block hidden absolute top-1/2 -translate-y-1/2",
                  classNameSpan
                )}
              >
                {link.info}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
