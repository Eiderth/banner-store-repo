import NavBar, { type Links } from "../../../components/NavBar";
import {
  IconAlbum,
  IconChartDots,
  IconChecklist,
  IconFilePencil,
} from "@tabler/icons-react";
type Props = {
  isHover: (boolean: boolean) => void;
};

const links: Links[] = [
  {
    link: "formulario",
    icon: <IconChecklist />,
    info: "Formulario",
  },
  {
    link: "data",
    icon: <IconFilePencil />,
    info: "Data",
  },
  {
    link: "calc",
    icon: <IconChartDots />,
    info: "Calculos",
  },
  {
    link: "banner",
    icon: <IconAlbum />,
    info: "Banner",
  },
];
export default function NavApp({ isHover }: Props) {
  return (
    <NavBar
      onMouseEnter={() => isHover(true)}
      onMouseLeave={() => isHover(false)}
      links={links}
      className="w-fit h-11/12 p-2.5 pt-5 rounded-br-2xl bg-[#F6FAFD] hover:gap-5 group z-50"
      classNameLi="p-0 group-hover:p-2.5"
      classNameSpan="left-full ml-6 bg-[#F6FAFD] p-2 rounded-2xl"
    />
  );
}
