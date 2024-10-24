
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// API Routes
app.post("/api/users", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
