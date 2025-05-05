const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const loginRoutes = require('./routes/login');
const attendanceRoutes = require('./routes/attendance');
const payslipRoutes = require('./routes/payslip');
const departmentRoutes = require("./routes/departments");
const salaryRoutes = require('./routes/salary');
const leaveRoutes = require("./routes/leave");
const MattendanceRoute = require("./routes/Mattendance");
const employeeInfoRoutes = require("./routes/employeeInfo");



const app = express();
const port = 5000; 


app.use(cors());
app.use(bodyParser.json());


app.use('/login', loginRoutes);


app.use('/api', attendanceRoutes);

app.use('/api', payslipRoutes);
app.use('/api', departmentRoutes);
app.use('/api', salaryRoutes);
app.use("/leave", leaveRoutes);
app.use("/attendance", MattendanceRoute);
app.use("/api", employeeInfoRoutes);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
