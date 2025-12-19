import { type FormData } from "../types";
const validate = (
  name: keyof Omit<FormData, "precio" | "iva">,
  value: string
): boolean => {
  switch (name) {
    case "producto": {
      const newValue = value.toUpperCase();
      return (
        newValue.length > 20 ||
        /[^a-zA-Z ]/.test(newValue) ||
        newValue.length < 3
      );
    }
    case "costo":
      return !/^\d*\.?\d*$/.test(value) || value === "";

    case "unidades":
      return !/^\d*$/.test(value) || value === "";

    case "porcentaje":
      return !/^\d*\.?\d*$/.test(value) || value === "";
  }
};
export const initialInvalid = {
  producto: false,
  costo: false,
  unidades: false,
  porcentaje: false,
};

export default validate;
