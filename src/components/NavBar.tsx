import type { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

type Links = {
  link: string;
  icon: ReactElement;
};

type Props = {
  className?: string;
  links: Links[];
  classNameLi?: string;
};

export default function NavBar({ className, links, classNameLi }: Props) {
  return (
    <nav>
      <ul className={twMerge("flex flex-col gap-3.5", className)}>
        {links.map((link) => (
          <li
            key={link.link}
            className={twMerge("transition-all", classNameLi)}
          >
            <a href={`#${link.link}`}>{link.icon}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
