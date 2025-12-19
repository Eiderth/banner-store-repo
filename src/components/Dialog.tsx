import { forwardRef, type ChangeEvent } from "react";
import Form from "./Form";
import InputIcon from "./InputIcon";
import Select from "./Select";
import Btn from "./Btn";
import {
  IconImageInPicture,
  IconBackground,
  IconColorPickerOff,
  IconTextCaption,
  IconFountain,
  IconBorderAll,
  IconBorderCornerIos,
  IconX,
} from "@tabler/icons-react";

const fonts = [
  "Arial, sans-serif",
  "Times New Roman serif",
  "Verdana, sans-serif",
  "Georgia, serif",
  "Courier New, monospace",
  "Comic Sans MS, cursive",
  "Impact, sans-serif",
  "Tahoma, sans-serif",
];
const borders = [
  "solid",
  "none",
  "hidden",
  "dotted",
  "dashed",
  "double",
  "groove",
  "ridge",
  "inset",
  "outset",
];
const borderWidths = Array.from({ length: 10 }, (_, idx) => `${idx + 1}px`);

type StyleBanner = {
  backgroundImage: string;
  bgColor: string;
  color: string;
  title: string;
  font: string;
  border: string;
  borderColor: string;
  borderWidth: string;
};

type Props = {
  editStyleBanner: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
  styleBanner: StyleBanner;
  updateStyleBanner: () => void;
  handleDialog: () => void;
};

const Dialog = forwardRef<HTMLDialogElement, Props>(
  ({ editStyleBanner, styleBanner, updateStyleBanner, handleDialog }, ref) => {
    return (
      <dialog
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-4 border-amber-300 max-w-10/12 w-96 max-h-[90vh] overflow-visible p-1"
        ref={ref}
      >
        <Form
          title="Edicion de Banner"
          classNameTitle="md:text-2xl"
          className="w-full h-full border-none bg-transparent grid  grid-cols-2 gap-y-2.5 "
        >
          <InputIcon
            label="Imagen de fondo"
            type="file"
            name="bgImg-input"
            id="file-editInput"
            className="hidden"
            onChange={editStyleBanner}
          >
            <IconImageInPicture />
          </InputIcon>

          <InputIcon
            label="Color de fondo"
            type="color"
            name="bgColor-input"
            id="bgcolor-editInput"
            classNameLabel=""
            className="ml-auto"
            value={styleBanner.bgColor}
            onChange={editStyleBanner}
          >
            <IconBackground />
          </InputIcon>

          <InputIcon
            label="Color de texto"
            type="color"
            name="textColor-input"
            id="color-editInput"
            classNameLabel=""
            className="ml-auto"
            value={styleBanner.color}
            onChange={editStyleBanner}
          >
            <IconColorPickerOff />
          </InputIcon>

          <InputIcon
            label="Cambiar titulo"
            type="text"
            name="textTitle-input"
            id="title-editInput"
            value={styleBanner.title}
            className="w-full outline-0 pt-2"
            onChange={editStyleBanner}
          >
            <IconTextCaption />
          </InputIcon>
          <Select
            label="Fuente"
            options={fonts}
            id="font-editSelect"
            name="textFont-select"
            value={styleBanner.font}
            onChange={editStyleBanner}
          >
            <IconFountain className="inline " />
          </Select>

          <InputIcon
            label="Color de borde"
            type="color"
            name="borderColor-input"
            id="borderColor-editInput"
            classNameLabel=""
            className=""
            value={styleBanner.borderColor}
            onChange={editStyleBanner}
          >
            <IconBorderAll />
          </InputIcon>
          <Select
            label="Tipo de borde"
            options={borders}
            id="border-editSelect"
            name="border-select"
            className="pt-2 block w-full"
            value={styleBanner.border}
            onChange={editStyleBanner}
          >
            <IconBorderCornerIos className="inline" />
          </Select>
          <Select
            label="grosor de borde"
            options={borderWidths}
            id="borderWidth-editSelect"
            name="borderWidth-select"
            className="pt-2 block w-full"
            value={styleBanner.borderWidth}
            onChange={editStyleBanner}
          >
            <IconBorderCornerIos className="inline" />
          </Select>

          <div className="flex gap-2.5 col-span-full">
            <Btn
              text="Anular"
              type="button"
              className="bg-gray-500 shadow-2xl w-fit justify-self-start md:p-2.5"
              onClick={updateStyleBanner}
            />
          </div>
        </Form>
        <button
          type="button"
          className="bg-red-500 text-amber-50 p-1 rounded-full absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
          onClick={handleDialog}
        >
          <IconX size={32} />
        </button>
      </dialog>
    );
  }
);
export default Dialog;
