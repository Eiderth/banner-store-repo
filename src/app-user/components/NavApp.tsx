import {
  IconAlbum,
  IconChartDots,
  IconChecklist,
  IconDashboard,
  IconFilePencil,
} from "@tabler/icons-react";

const links = [
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

type Props = {
  setActiveComponent: (componentId: string) => void;
};

export default function NavBar({ setActiveComponent }: Props) {
  return (
    <nav>
      <ul className="flex flex-col gap-3.5 w-fit h-11/12 p-2.5 pt-5 rounded-br-2xl bg-[#F6FAFD] group z-50">
        {links.map((link) => (
          <li
            key={link.link}
            className="transition-all relative group p-0 group-hover:p-2.5 duration-500 hover:bg-[#BDD8E9] rounded-2xl cursor-pointer"
            onClick={() => setActiveComponent(link.link)}
          >
            <div className="flex flex-row gap-2.5 p-2.5">
              {link.icon}
              {link.info && (
                <span className="font-semibold hidden group-hover:inline-block">
                  {link.info}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
