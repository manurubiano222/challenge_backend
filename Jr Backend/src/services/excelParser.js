const xlsx = require('xlsx');

const parseExcel = (buffer) => {    

    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]]; 
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 }); 


    let parsedData = [];
    let validationErrors = [];

    data.forEach((row, rowIndex) => {
        if (rowIndex === 0) return; 

        const [name, age, nums] = row; 
        let hasError = false;

        if (typeof name !== 'string' || name.trim() === '' || /\d/.test(name)) {
            validationErrors.push({ row: rowIndex + 1, col: 1 });
            hasError = true;
        }

        if (typeof age !== 'number' || !Number.isInteger(age)) {
            validationErrors.push({ row: rowIndex + 1, col: 2 });
            hasError = true;
        }

        if (typeof nums !== 'string' || nums.trim() === '') {
            validationErrors.push({ row: rowIndex + 1, col: 3 });
            hasError = true;
        }

        if (!hasError) {
            const numsArray = nums.split(',').map(n => Number(n.trim()));
            if (numsArray.some(isNaN)) {
                validationErrors.push({ row: rowIndex + 1, col: 3 });
            } else {
                parsedData.push({ name, age, nums: numsArray.sort((a, b) => a - b) });
            }
        }
    });

    return { parsedData, validationErrors };
};

module.exports = { parseExcel };
