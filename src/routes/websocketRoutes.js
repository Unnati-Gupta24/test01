const { handleEvent } = require("../controllers/eventController");

const websocketRoutes = (ws) => {
  ws.on("message", async (message) => {
    const data = JSON.parse(message);
    await handleEvent(data.event, data.payload, ws);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
};

module.exports = websocketRoutes;
