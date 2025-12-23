import { useState } from "react";
import Aplication from "./app-user";
import { Welcome } from "./hero/Welcome";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleEnter = () => {
    setShowWelcome(false);
  };

  return (
    <>{showWelcome ? <Welcome onEnter={handleEnter} /> : <Aplication />}</>
  );
}

export default App;
