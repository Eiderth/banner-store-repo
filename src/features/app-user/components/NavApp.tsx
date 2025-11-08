import NavBar from "../../../components/NavBar";
import { IconChecklist, IconTableFilled } from "@tabler/icons-react";
type Props = {};

const links = [
  {
    link: "formulario",
    icon: <IconChecklist />,
  },
  {
    link: "banner",
    icon: <IconTableFilled />,
  },
];
export default function NavApp({}: Props) {
  return (
    <NavBar
      links={links}
      className="w-fit h-11/12 p-2.5 pt-5 rounded-br-2xl bg-[#F6FAFD] group "
      classNameLi="group-hover:bg-gray-50 group-hover:p-2.5 group-hover:rounded-2xl"
    />
  );
}
