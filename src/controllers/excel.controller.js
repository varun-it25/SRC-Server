// controllers/feedbackController.js
import ExcelJS from 'exceljs'

export const createFeedbacksExcel = async(req, res) => {
  const {data} = req.body;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Feedbacks Data');

  worksheet.columns = [
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Roll', key: 'rtu_roll_no', width: 20 },
    { header: 'Mobile No', key: 'mobile_no', width: 20 },
    { header: 'Experience', key: 'experience', width: 20 }
  ];

  data.forEach(row => {
    worksheet.addRow(row);
  });

  await workbook.xlsx.writeFile('./store/feedbacksData.xlsx');
  res.send('Excel file created.')
}



export const createRegistersExcel = async(req, res) => {
  const {data} = req.body;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Registers Data');

  worksheet.columns = [
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Roll', key: 'rtu_roll_no', width: 20 },
    { header: 'College Email', key: 'college_email', width: 20 },
    { header: 'Personal Email', key: 'personal_email', width: 20 },
    { header: 'Mobile No', key: 'mobile_no', width: 20 }
  ];

  data.forEach(row => {
    worksheet.addRow(row);
  });

  await workbook.xlsx.writeFile('./store/registersData.xlsx');
  res.send('Excel file created.')
}