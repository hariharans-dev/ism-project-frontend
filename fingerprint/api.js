const express = require("express");
const fs = require("fs").promises; // Use fs.promises to get promise-based API
const app = express();
const { digitalkey } = require("./key_authority/dsa");
const port = 9000;
var control = 0;

app.get("/frontend", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/", async (req, res) => {
  try {
    const id = req.query.text;
    const regno = await json_data(id);
    console.log(regno);
    res.send({ regno: regno, sign: digitalkey(regno) });
  } catch (error) {
    console.error("Error reading JSON file:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/changecontrol", (req, res) => {
  if (control == 1) {
    control = 0;
  } else {
    control = 1;
  }
  res.send("mode change to enrollment" + control);
});

app.get("/getcontrol", (req, res) => {
  res.send(control + "");
});

app.get("/control", (req, res) => {
  console.log(control);
  var data = control;
  if (control == 1) {
    control = 0;
  }
  res.send(data + "");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const json_data = async (id) => {
  try {
    const data = await fs.readFile("register-number.json", "utf8");
    const jsondata = JSON.parse(data);
    return jsondata[id];
  } catch (error) {
    throw error;
  }
};
