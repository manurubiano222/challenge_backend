const xlsx = require('xlsx');

const parseExcel = (buffer) => {
    try {
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        let parsedData = [];
        let validationErrors = [];

        data.forEach((row, rowIndex) => {
            if (rowIndex === 0) return;

            const [name, age, nums] = row;
            let hasError = false;

            if (!name || typeof name !== 'string' || /\d/.test(name.trim())) {
                validationErrors.push({ row: rowIndex + 1, col: 1, message: 'Nombre inválido' });
                hasError = true;
            }

            if (!Number.isInteger(age)) {
                validationErrors.push({ row: rowIndex + 1, col: 2, message: 'Edad inválida' });
                hasError = true;
            }

            if (!nums || typeof nums !== 'string') {
                validationErrors.push({ row: rowIndex + 1, col: 3, message: 'Números inválidos' });
                hasError = true;
            }

            if (!hasError) {
                const numsArray = nums.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));
                parsedData.push({ name: name.trim(), age, nums: numsArray.sort((a, b) => a - b) });
            }
        });

        return { parsedData, validationErrors };
    } catch (error) {
        throw new Error('Error al procesar el archivo Excel');
    }
};

module.exports = { parseExcel };
