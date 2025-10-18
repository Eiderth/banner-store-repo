import SectionForm from "./components/SectionForm";
import SectionData from "./components/SectionData";
import SectionCalc from "./components/SectionCal";
import SectionBanner from "./components/SectionBanner";
import DataContext, { useDataContext } from "../../contexts/DataContext";
import Slider from "../../components/Slider";

export default function Aplication() {
  const { productsProps } = useDataContext();
  return (
    <DataContext>
      <main>
        <Slider>
          <SectionForm />
          {productsProps.length > 0 ? (
            <>
              <SectionData />
              <SectionCalc />
              <SectionBanner />
            </>
          ) : (
            <section className="w-full h-full flex justify-center items-center">
              <h2 className="text-4xl font-bold text-blue-400">Sin items</h2>
            </section>
          )}
        </Slider>
      </main>
    </DataContext>
  );
}

//Sigue asi campeon vas avanzando
