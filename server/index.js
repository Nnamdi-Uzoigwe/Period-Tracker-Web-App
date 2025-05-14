const express = require("express")
require("dotenv").config()
const helmet = require("helmet")
const cors = require("cors")
const authRoutes = require("./routes/authRoutes")
const cycleRoutes = require("./routes/cycleRoutes")
const predictionRoutes = require("./routes/predictionRoutes") 
const mongoose = require("mongoose")

const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(helmet())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/cycles', cycleRoutes)
app.use('/api/prediction', predictionRoutes)

mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('MongoDB connection error:', err.message);
});
