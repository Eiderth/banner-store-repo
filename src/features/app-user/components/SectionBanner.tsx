import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { Context } from "../../../contexts/Contex";

import { IconEdit } from "@tabler/icons-react";
import Btn from "../../../components/Btn";
import Banner from "../../../components/Banner";

import Dialog from "../../../components/Dialog";
import downloadImage from "../../../functions/downloadImage";
const reducerStyle = (
  prev: typeof InitialstyleBanner,
  state:
    | {
        key: keyof typeof InitialstyleBanner;
        value: string;
        action: "EDIT";
      }
    | { action: "RESET" }
) => {
  switch (state.action) {
    case "EDIT":
      return {
        ...prev,
        [state.key]: state.value,
      };
    case "RESET":
      return InitialstyleBanner;
  }
};

const InitialstyleBanner = {
  backgroundImage: "none",
  bgColor: "#ffffff",
  color: "#000000",
  title: "Lista de Precios",
  font: "Arial, sans-serif",
  border: "solid",
  borderColor: "#42a5f5",
  borderWidth: "4px",
};

type Props = { id: string };
export default function SectionBanner({ id }: Props) {
  const { products } = useContext(Context);

  //referencia para descargar la imagen del banner y estado hidden para ocultar boton de editar
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const [hiddenEdit, setHiddenEdit] = useState(false);

  //funcion de descarga de imagen
  const handleDownloadImage = useCallback(async () => {
    setHiddenEdit(true);
    if (!bannerRef.current) return;
    downloadImage(bannerRef, () => setHiddenEdit(false));
  }, []);

  //funcion para manejar el estado del dialog
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleDialog = () => {
    if (!dialogRef.current) return;
    isOpen ? dialogRef.current.showModal() : dialogRef.current.close();
    setIsOpen(!isOpen);
  };

  //funciones para el manejo de los cambios de estilos del banner
  const [styleBanner, updateStyleBanner] = useReducer(
    reducerStyle,
    (() => {
      try {
        const data = localStorage.getItem("BannerStyle");
        return data ? JSON.parse(data) : InitialstyleBanner;
      } catch {
        return InitialstyleBanner;
      }
    })()
  );
  const editStyleBanner = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      const name = e.target.name;
      switch (name) {
        case "bgImg-input": {
          const event = e as ChangeEvent<HTMLInputElement>;
          const file = event.target.files;
          if (file && file[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
              updateStyleBanner({
                key: "backgroundImage",
                value: `no-repeat center /cover url(${e.target?.result})`,
                action: "EDIT",
              });
            };
            reader.readAsDataURL(file[0]);
          }
          break;
        }
        case "bgColor-input":
          updateStyleBanner({
            key: "bgColor",
            value: e.target.value,
            action: "EDIT",
          });
          break;

        case "textColor-input":
          updateStyleBanner({
            key: "color",
            value: e.target.value,
            action: "EDIT",
          });
          break;

        case "textTitle-input":
          updateStyleBanner({
            key: "title",
            value: e.target.value,
            action: "EDIT",
          });
          break;

        case "textFont-select":
          updateStyleBanner({
            key: "font",
            value: e.target.value,
            action: "EDIT",
          });
          break;

        case "borderColor-input":
          updateStyleBanner({
            key: "borderColor",
            value: e.target.value,
            action: "EDIT",
          });
          break;
        case "border-select":
          updateStyleBanner({
            key: "border",
            value: e.target.value,
            action: "EDIT",
          });
          break;
        case "borderWidth-select":
          updateStyleBanner({
            key: "borderWidth",
            value: e.target.value,
            action: "EDIT",
          });
          break;
      }
    },
    []
  );

  useEffect(() => {
    if (!bannerRef.current) return;
    const bannerStyle = bannerRef.current.style;
    bannerStyle.background = styleBanner.backgroundImage;
    bannerStyle.backgroundColor = styleBanner.bgColor;
    bannerStyle.color = styleBanner.color;
    bannerStyle.fontFamily = styleBanner.font;
    bannerStyle.border = styleBanner.border;
    bannerStyle.borderColor = styleBanner.borderColor;
    bannerStyle.borderWidth = styleBanner.borderWidth;
    const DataJson = JSON.stringify(styleBanner);
    localStorage.setItem("BannerStyle", DataJson);
  }, [styleBanner]);

  return (
    <section
      id={id}
      className="h-full flex flex-col justify-center items-center gap-2.5 relative"
    >
      <Banner
        ref={bannerRef}
        title={styleBanner.title}
        headers={["producto", "precio"]}
        keys={["producto", "precio_final"]}
        data={products}
        className="w-[70%] max-w-80 min-h-[70%] bg-white "
        classNameTable="table-fixed lg:border-spacing-y-5"
      >
        {hiddenEdit === false ? (
          <button
            className="bg-amber-100 p-2.5 rounded-full"
            onClick={handleDialog}
          >
            <IconEdit size={12} color="black" />
          </button>
        ) : (
          <></>
        )}
      </Banner>
      <Dialog
        ref={dialogRef}
        handleDialog={handleDialog}
        styleBanner={styleBanner}
        editStyleBanner={editStyleBanner}
        updateStyleBanner={() => updateStyleBanner({ action: "RESET" })}
      />
      <Btn
        text="Descargar"
        className="bg-blue-400 absolute top-5 right-2"
        onClick={handleDownloadImage}
      />
    </section>
  );
}
