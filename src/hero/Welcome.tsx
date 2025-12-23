import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import React from "react";
import bgImage from "../public/codigojs.jpg";
import sectionDat from "../public/sectionDat.jpg";
import sectionDashBoard from "../public/SectiondashBoard.jpg";

interface Props {
  onEnter: () => void;
}

interface HowItWorksStepProps {
  num: number;
  title: string;
  children: React.ReactNode;
}

const HowItWorksStep: React.FC<HowItWorksStepProps> = ({
  num,
  title,
  children,
}) => (
  <div className="flex items-start">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white font-bold text-xl mr-4">
      {num}
    </div>
    <div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600">{children}</p>
    </div>
  </div>
);

export const Welcome = ({ onEnter }: Props) => {
  return (
    <div className="bg-gray-100">
      <section className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden md:flex">
          <div
            className="md:w-1/2 p-8 flex flex-col justify-center items-center text-center bg-cover bg-center"
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
          >
            <div className="bg-white bg-opacity-75 p-6 rounded-lg">
              <p className="text-gray-800 font-semibold mb-4">
                Esta aplicación fue desarrollada con orgullo por un solo
                desarrollador.
                <br /> Saludos mi nombre es Eiderth Cona
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://github.com/eiderth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-blue-600"
                >
                  <IconBrandGithub size={32} />
                </a>
                <a
                  href="https://linkedin.com/in/eiderth-cona-075a3837b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-blue-600"
                >
                  <IconBrandLinkedin size={32} />
                </a>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              ¡Bienvenido a Banner Store!
            </h1>
            <p className="text-gray-600 text-xl mb-6">
              La forma más fácil de diseñar y administrar tus banners de
              marketing.
            </p>
            <button
              onClick={onEnter}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
            >
              Comenzar Ahora
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Así luce mi app</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-4">
                Panel de Control Intuitivo
              </h3>
              <p className="text-gray-600 mb-4">
                Gestiona tus ganancias e ingresos. Visualiza los datos
                ingresados, veras cuanto sera lo que invertiste y lo que
                ganaras.
              </p>
              <img
                src={sectionDashBoard}
                alt="Vista previa del panel de control"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
            <div className="text-left">
              <img
                src={sectionDat}
                alt="Vista previa de la seccion de datos"
                className="rounded-lg shadow-xl w-full mb-4"
              />
              <h3 className="text-2xl font-bold mb-4">
                Formularios Simples y Potentes
              </h3>
              <p className="text-gray-600">
                Crea tus banners llenando un simple formulario. Ajusta el texto,
                los colores y las dimensiones de forma rápida y sencilla.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            ¿Cómo Funciona?
          </h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-1 gap-12">
            <HowItWorksStep num={1} title="Rellena el formulario">
              Llena el formulario con los datos de tu producto
            </HowItWorksStep>
            <HowItWorksStep num={2} title="Personaliza a tu Gusto">
              Añade tu texto, ajusta los colores y sube tus propias imágenes o
              logos.
            </HowItWorksStep>
            <HowItWorksStep num={3} title="Descarga y Comparte">
              Una vez que estés satisfecho, descarga tu banner y úsalo donde
              quieras.
            </HowItWorksStep>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white">
        <div className="container mx-auto text-center py-20 px-4">
          <h2 className="text-4xl font-bold mb-4">
            ¿Listo para crear banners increíbles?
          </h2>
          <p className="text-xl mb-8">
            No esperes más. Entra a la aplicación y desata tu creatividad.
          </p>
          <button
            onClick={onEnter}
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300 ease-in-out"
          >
            Empezar a Diseñar
          </button>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://github.com/eiderth"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <IconBrandGithub />
            </a>
            <a
              href="https://linkedin.com/in/eiderth-cona-075a3837b"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <IconBrandLinkedin />
            </a>
          </div>
          <p>
            &copy; {new Date().getFullYear()} Banner Store. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
