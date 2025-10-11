import SectionForm from "./components/SectionForm";
import SectionData from "./components/SectionData";
import SectionCalc from "./components/SectionCal";
import SectionBanner from "./components/SectionBanner";
import DataContext from "../../contexts/DataContext";
import Slider from "../../components/Slider";

export default function Aplication() {
  return (
    <DataContext>
      <main>
        <Slider>
          <SectionForm />
          <SectionData />
          <SectionCalc />
          <SectionBanner />
        </Slider>
      </main>
    </DataContext>
  );
}

//Sigue asi campeon vas avanzando
