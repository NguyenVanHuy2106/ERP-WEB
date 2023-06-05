import React from "react";
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";
import { AiOutlineExport } from "react-icons/ai";
const ExportExcel = ({ data }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  return (
    <Button
      variant="contained"
      onClick={exportToExcel}
      style={{ marginLeft: 16 }}
    >
      <AiOutlineExport size={16} />
      <div style={{ paddingLeft: 4 }}>Xuất Excel</div>
    </Button>
  );
};

export default ExportExcel;
