const User = require("../models/userModel");

async function handleEvent(event, payload, ws) {
  switch (event) {
    case "CREATE":
      await createUser(payload);
      break;
    case "READ":
      const data = await readUser(payload);
      ws.send(JSON.stringify({ event: "DATA_RESPONSE", payload: data }));
      break;
    case "UPDATE":
      await updateUser(payload);
      break;
    case "DELETE":
      await deleteUser(payload);
      break;
    default:
      console.error("Unknown event:", event);
  }
}

async function createUser(data) {
  const user = new User(data);
  await user.save();
}

async function readUser(data) {
  return await User.findById(data.id);
}

async function updateUser(data) {
  await User.findByIdAndUpdate(data.id, data.update);
}

async function deleteUser(data) {
  await User.findByIdAndDelete(data.id);
}

module.exports = { handleEvent };
