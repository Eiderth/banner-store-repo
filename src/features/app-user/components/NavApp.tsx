import NavBar, { type Links } from "../../../components/NavBar";
import {
  IconAlbum,
  IconChartDots,
  IconChecklist,
  IconDashboard,
  IconFilePencil,
} from "@tabler/icons-react";
type Props = {};

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
  {
    link: "dashBoard",
    icon: <IconDashboard />,
    info: "DashBoard",
  },
];
export default function NavApp({}: Props) {
  return (
    <NavBar
      links={links}
      className="w-fit h-11/12 p-2.5 pt-5 rounded-br-2xl bg-[#F6FAFD]  gap-3.5 group z-50 "
      classNameLi="p-0 group-hover:p-2.5 transition-all duration-500 hover:bg-[#BDD8E9] rounded-2xl"
      classNameSpan="bg-[#F6FAFD] p-2 rounded-2xl -translate-x-25 group-hover:translate-x-14 opacity-0 group-hover:opacity-100 transition-transform duration-200 z-50"
    />
  );
}
