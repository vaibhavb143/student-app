const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model("Student", studentSchema);

const Student = require("./models/Student");

app.post("/register", async (req, res) => {
  const user = new Student(req.body);
  await user.save();
  res.send("Registered");
});

app.post("/login", async (req, res) => {
  const user = await Student.findOne({ email: req.body.email });

  if (!user) return res.send("User not found");

  if (user.password === req.body.password) {
    res.send("Login success");
  } else {
    res.send("Wrong password");
  }
});