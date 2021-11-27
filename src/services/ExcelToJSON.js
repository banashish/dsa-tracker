import XLSX from "xlsx";

const fileRead = (filename) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(filename);
    fileReader.onload = (e) => {
      const buffer = e.target.result;
      const wb = XLSX.read(buffer, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws);
      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export default fileRead;
