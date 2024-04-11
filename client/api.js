const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { digitalkey } = require("./key_authority/dsa");
const { sendudp } = require("./udp_sender");
const path = require("path");

// Assuming index.html is in the root directory of your project

const app = express();
const port = 4000;

app.use(bodyParser.json()); // Parse JSON bodies

app.use(cors());
// Define a route to handle form submission

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "main.html"));
});

app.get("/single", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/multi", (req, res) => {
  res.sendFile(path.join(__dirname, "csvindex.html"));
});

app.post("/form-data", (req, res) => {
  console.log(res.body);
  const registerNumber = req.body.regno;
  const serverIP = req.body.serverip;
  const channel = req.body.channel;
  var port, data;
  if (channel == "secure") {
    port = 7000;
    data = { regno: registerNumber, sign: digitalkey(registerNumber) };
  } else {
    port = 6000;
    data = { regno: registerNumber };
  }
  console.log(data + " " + port);
  sendudp(serverIP, port, data);
  res.send("Form data received successfully!");
});

app.post("/file-data", (req, res) => {
  const arr = req.body.data;
  const serverIP = req.body.serverip;
  const channel = req.body.channel;
  var port;
  if (channel == "secure") {
    port = 7000;
    for (var i = 0; i < arr.length; i++) {
      const data = { regno: arr[i], sign: digitalkey(arr[i]) };
      sendudp(serverIP, port, data);
      // console.log(data);
    }
  } else {
    port = 6000;
    for (var i = 0; i < arr.length; i++) {
      const data = { regno: arr[i] };
      sendudp(serverIP, port, data);
      // console.log(data);
    }
  }

  res.send("Form data received successfully!");
});

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Frontend-Server at http://localhost:${port}/`);
});
