const dgram = require("dgram");
const client = dgram.createSocket("udp4");

function sendudp(serverip, port, data) {
  // Convert sensorData object to JSON string
  const jsondata = JSON.stringify(data);

  // Send encrypted message to server
  client.send(Buffer.from(jsondata), port, serverip, (err) => {
    if (err) {
      console.log("Error sending message:", err);
    } else {
      if (port == 7000) {
        console.log("Signed message sent to server");
      } else {
        console.log("message sent to server");
      }
    }
  });

  client.on("error", (err) => {
    client.close();
  });
}

module.exports = { sendudp };
