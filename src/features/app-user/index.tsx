import SectionForm from "./components/SectionForm";
import SectionData from "./components/SectionData";
import SectionCalc from "./components/SectionCal";
import SectionBanner from "./components/SectionBanner";
import Slider from "../../components/Slider";
import ComponentContext from "../../contexts/ComponentContext";
import NavApp from "./components/NavApp";
import { useState } from "react";
export default function Aplication() {
  const [isHover, setIsHover] = useState(false);
  return (
    <ComponentContext>
      <main className="flex w-dvw">
        <NavApp isHover={setIsHover} />
        <Slider className={`flex-1 ${isHover ? "blur-sm" : ""}`}>
          <SectionForm id="formulario" />
          <SectionData id="data" />
          <SectionCalc id="calc" />
          <SectionBanner id="banner" />
        </Slider>
      </main>
    </ComponentContext>
  );
}

//Sigue asi campeon vas avanzando
