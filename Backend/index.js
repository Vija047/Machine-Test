const express = require('express');
// DB connection
const connectDB = require('./config/db'); 
const { errorHandler } = require("./middleware/errormiddle");
const app = express();
const cors=require("cors");
const port = process.env.PORT || 9000;


connectDB(); 

// Middleware to parse JSON
app.use(express.json());
const authroute=require("./routes/authRoute")
const agetRoute=require("./routes/agentRoutes");
const adminRoute=require("./routes/adminROute");

// connecting with frontend 
app.use(cors({
  origin: "http://localhost:3000", 
  methods: ["GET", "POST"],
  credentials: true,
}));


// Routes
app.use("/api/agent",agetRoute);
app.use("/api/auth",authroute);
app.use("/api/admin",adminRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
