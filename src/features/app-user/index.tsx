import SectionData from "./components/SectionData";
("./components/SectionData");

import SectionForm from "./components/SectionForm";
import DataContext from "../../contexts/DataContext";
// import SectionBanner from "./components/SectionBanner";
import Slider from "../../components/slider";

export default function Aplication() {
  return (
    <DataContext>
      <main>
        <Slider>
          <SectionForm />
          <SectionData />
        </Slider>
      </main>
    </DataContext>
  );
}

//Sigue asi campeon vas avanzando
