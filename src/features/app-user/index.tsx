import SectionForm from "./components/SectionForm";
import SectionData from "./components/SectionData";
import SectionCalc from "./components/SectionCal";
import SectionBanner from "./components/SectionBanner";
import Slider from "../../components/Slider";
import ComponentContext from "../../contexts/ComponentContext";

export default function Aplication() {
  return (
    <ComponentContext>
      <main>
        <Slider>
          <SectionForm />
          <SectionData />
          <SectionCalc />
          <SectionBanner />
        </Slider>
      </main>
    </ComponentContext>
  );
}

//Sigue asi campeon vas avanzando
