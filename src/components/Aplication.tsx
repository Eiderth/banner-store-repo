import SectionData from "./components-secondary/SectionData";
import { useState } from "react";
import DashBoard from "./components-secondary/DashBoard";
import type { Links } from "../types";
import SectionForm from "./components-secondary/SectionForm";
import DataContext from "../contexts/DataContext";

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
    <main>
      <DataContext>
        <nav className="fixed top-1 right-2.5 min-w-[50%] max-w-fit overflow-hidden rounded-full ">
          <DashBoard
            liElements={liElements}
            changueSection={setChangieSection}
          />
        </nav>
        {changueSection === "form" && <SectionForm />}
        {changueSection === "data" && <SectionData />}
        {changueSection === "banner" && <section>Banner Section</section>}
      </DataContext>
    </main>
  );
}

//Sigue asi campeon vas avanzando
