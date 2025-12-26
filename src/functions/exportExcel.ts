import ExcelJs from "exceljs";
import { saveAs } from "file-saver";
import type { Products } from "../types";
const exportoExcel = async (data: Products[]) => {
  try {
    const validData = data.map((dat) => {
      return {
        producto: dat.producto,
        costo: dat.costo + "$",
        unidades: dat.unidades,
        precio_base: dat.precio_base + "$",
        ganancia: dat.ganancia_unidad + "$",
        precio_final: dat.precio_final + "$",
        ingresos: dat.ingresos + "$",
        ganancia_total: dat.ganancia_total + "$",
      };
    });
    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet("Reporte  de productos");
    worksheet.columns = [
      {
        header: "Producto",
        key: "producto",
        width: 20,
      },
      {
        header: "Costo",
        key: "costo",
        width: 10,
      },
      {
        header: "Unidades",
        key: "unidades",
        width: 10,
      },
      {
        header: "Precio Base",
        key: "precio_base",
        width: 10,
      },
      {
        header: "Ganancia",
        key: "ganancia",
        width: 10,
      },
      {
        header: "Precio Final",
        key: "precio_final",
        width: 10,
      },
      {
        header: "Ingresos",
        key: "ingresos",
        width: 10,
      },
      {
        header: "Ganancia Total",
        key: "ganancia_total",
        width: 20,
      },
    ];
    validData.forEach((product) => {
      const row = worksheet.addRow(product);
      row.eachCell((cell) => {
        cell.alignment = { horizontal: "left" };
      });
    });
    worksheet.getRow(1).font = { bold: true };

    worksheet.insertRow(1, []);
    worksheet.mergeCells("A1:H1");
    worksheet.getCell("A1").value = "Reporte de Productos";
    worksheet.getCell("A1").font = { size: 16, bold: true };
    worksheet.getCell("A1").alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getRow(1).height = 30;
    worksheet.getRow(2).font = { bold: true };

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "ReporteProductos.xlsx");
  } catch (error) {
    alert("error al descargar");
  }
};
export default exportoExcel;
