const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ensure_ctype = require("express-ensure-ctype");
const app = express();
const port = 3001;

// Set up the server
app.use(express.static("lab1"));
app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Server running on port ${port}`));

// Ensure json
const ensure_json = ensure_ctype("json");

// The fake database
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
  delete req.body.id;

  next();
}

// Set reservation middleware
function set_reservation(req, res, next) {
  const { id } = req.params;
  const reservation_index = find_reservation(id);

  if (reservation_index === -1) {
    return res.status(404).send("Reservation not found");
  }

  req.reservation = reservation_index;
  delete req.body.id;

  next();
}

// serve spaces as json
app.get("/spaces", (req, res) => {
  res.json(spaces);
});

// post new space
app.post("/spaces", ensure_json, (req, res) => {
  let newSpace = {
    ...req.body,
    id: space_autoincrement++,
    state: "free",
  };

  spaces.push(newSpace);
  res.status(201).send(newSpace);
});

// delete space
app.delete("/spaces/:id", set_space, (req, res) => {
  spaces.splice(req.space, 1);
  res.sendStatus(200);
});

// update space
app.put("/spaces/:id", set_space, ensure_json, (req, res) => {
  current_space = spaces[req.space];
  new_space = { ...current_space, ...req.body };
  spaces[req.space] = new_space;
  res.status(200).send(new_space);
});

// get space
app.get("/spaces/:id", set_space, (req, res) => {
  res.json(spaces[req.space]);
});

// serve reservations as json
app.get("/reservations", (req, res) => {
  res.json(reservations);
});

// post new reservation
app.post("/reservations", ensure_json, (req, res) => {
  newReservation = {
    ...req.body,
    id: reservations_autoincrement++,
    time: new Date(),
  };
  reservations.push(newReservation);
  res.status(201).send(newReservation);
});

// delete reservation
app.delete("/reservations/:id", set_reservation, (req, res) => {
  reservations.splice(req.reservation, 1);
  res.sendStatus(200);
});
