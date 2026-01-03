import xlsx from 'xlsx';

export class Excelutils{


    static getExcelData(filepath: string, sheetname: string)
   {   

    try{
        const workbook = xlsx.readFile(filepath);
        const sheet = workbook.Sheets[sheetname];

        const jsonData= xlsx.utils.sheet_to_json(sheet);
        return jsonData

    } 

    catch(error)
    {
        console.log(error);
        console.log("FileNotFound", filepath)
    }
}
}