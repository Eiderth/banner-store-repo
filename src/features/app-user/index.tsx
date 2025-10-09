import SectionData from "./components/SectionData";
("./components/SectionData");
import { useState } from "react";
import NavBar from "../../components/NavBar";
import type { Links } from "../../types";
import SectionForm from "./components/SectionForm";
import DataContext from "../../contexts/DataContext";
import SectionBanner from "./components/SectionBanner";
const liElements: Links[] = [
  { li: "Formulario", link: "form" },
  { li: "Datos", link: "data" },
  { li: "Banner", link: "banner" },
];
export default function Aplication() {
  const [changueSection, setChangieSection] = useState<
    "form" | "data" | "banner"
  >("form");

  return (
    <DataContext>
      <nav className="fixed top-2.5 right-2.5 min-w-[50%] max-w-fit overflow-hidden rounded-full md:top-7 ">
        <NavBar liElements={liElements} changueSection={setChangieSection} />
      </nav>
      <main className="flex-1">
        {changueSection === "form" && <SectionForm />}
        {changueSection === "data" && <SectionData />}
        {changueSection === "banner" && <SectionBanner />}
      </main>
    </DataContext>
  );
}

//Sigue asi campeon vas avanzando
