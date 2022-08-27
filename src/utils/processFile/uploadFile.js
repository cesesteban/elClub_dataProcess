var XLSX = require("xlsx");

const uploadFile = async function (file) {
    const fileType = file.type;
    if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        const data = await uploadXlxsFile(file);
        console.log("data", data);
    } else if (fileType === 'text/csv') {
        return uploadCsvFile(file);
    } else {
        console.log(`File type not supported: ${fileType}`);
    }
}

const uploadXlxsFile = function (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        console.log('file loaded');
        console.log("workbook.SheetNames", workbook.SheetNames);
        console.log("workbook.Sheets", workbook.Sheets);
        return {SheetNames: workbook.SheetNames, Sheets: workbook.Sheets};
    }
    console.log("Star load, please wait...");
    reader.readAsBinaryString(file);
}

const uploadCsvFile = function (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        console.log('file loaded');
        console.log("workbook.SheetNames", workbook.SheetNames);
        console.log("workbook.Sheets", workbook.Sheets);
        return {SheetNames: workbook.SheetNames, Sheets: workbook.Sheets};
    }
    console.log("Star load, please wait...");
    reader.readAsBinaryString(file);
}

export default uploadFile;