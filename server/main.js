const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Set up the server
app.use(express.static("lab1"));
app.use(bodyParser.json());
app.listen(port, () => console.log(`Server running on port ${port}`));

spaces = [];
reservations = [];
space_autoincrement = 0;
reservations_autoincrement = 0;

function find_space(id) {
  return spaces.findIndex((x) => x.id == id);
}

function find_reservation(id) {
  return reservations.findIndex((x) => x.id == id);
}

// Set space middleware
function set_space(req, res, next) {
  const { id } = req.params;
  const space_index = find_space(id);

  if (space_index === -1) {
    return res.status(404).send("Space not found");
  }

  req.space = space_index;

  next();
}

// serve spaces as json
app.get("/spaces", (req, res) => {
  res.json(spaces);
});

// post new space
app.post("/spaces", (req, res) => {
  let newSpace = { ...req.body, id: space_autoincrement++ };
  spaces.push(newSpace);
  res.status(201).send(newSpace);
});

// delete space
app.delete("/spaces/:id", set_space, (req, res) => {
  spaces.splice(req.space, 1);
  res.sendStatus(200);
});

// update space
app.put("/spaces/:id", set_space, (req, res) => {
  current_space = spaces[req.space];
  new_space = { ...current_space, ...req.body };
  spaces[req.space_index] = new_space;
  res.status(200).send(new_space);
});

// get space
app.get("/spaces/:id", set_space, (req, res) => {
  res.json(spaces[req.space]);
});
