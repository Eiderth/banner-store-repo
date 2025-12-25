import { useState } from "react";
import SectionForm from "./components/SectionForm";
import SectionData from "./components/SectionData";
import SectionCalc from "./components/SectionCal";
import SectionBanner from "./components/SectionBanner";
import ComponentContext from "../contexts/ComponentContext";
import NavApp from "./components/NavApp";
import SectionDashBoard from "./components/SectionDashBoard";
export default function Aplication() {
  const [activeComponent, setActiveComponent] = useState("formulario");

  const renderComponent = () => {
    switch (activeComponent) {
      case "formulario":
        return <SectionForm id="formulario" />;
      case "data":
        return <SectionData id="data" />;
      case "calc":
        return <SectionCalc id="calc" />;
      case "banner":
        return <SectionBanner id="banner" />;
      case "dashBoard":
        return <SectionDashBoard id="dashBoard" />;
      default:
        return <SectionForm id="formulario" />;
    }
  };

  return (
    <ComponentContext>
      <main className="flex h-screen p-0">
        <NavApp setActiveComponent={setActiveComponent} />
        <div className="flex-1 min-w-0">{renderComponent()}</div>
      </main>
    </ComponentContext>
  );
}

//Sigue asi campeon vas avanzando
