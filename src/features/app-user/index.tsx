import SectionForm from "./components/SectionForm";
import SectionData from "./components/SectionData";
import SectionCalc from "./components/SectionCal";
import SectionBanner from "./components/SectionBanner";
import Slider from "../../components/Slider";
import ComponentContext from "../../contexts/ComponentContext";
import NavApp from "./components/NavApp";
export default function Aplication() {
  return (
    <ComponentContext>
      <main className="flex w-dvw">
        <NavApp />
        <Slider className="flex-1">
          <SectionForm id="formulario" />
          <SectionData />
          <SectionCalc />
          <SectionBanner id="banner" />
        </Slider>
      </main>
    </ComponentContext>
  );
}

//Sigue asi campeon vas avanzando
