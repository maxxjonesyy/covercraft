const express = require("express");
const router = express.Router();

const clients = new Set();

router.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  clients.add(res);

  req.on("close", () => {
    clients.delete(res);
    res.end();
  });
});

function broadcastMessage(message) {
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(message)}\n\n`);
  });
}

module.exports = { router, broadcastMessage };
