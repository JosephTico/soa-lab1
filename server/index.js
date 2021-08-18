const express = require("express");
const https = require('https')
const fs = require('fs')
const cors = require("cors");
const bodyParser = require("body-parser");
const ensure_ctype = require("express-ensure-ctype");
const app = express();
const port = 3000;

// Set up the server
app.use(express.static("lab1"));
app.use(express.json());
app.use(cors());


https.createServer({
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.crt')
}, app).listen(3000, () => {
  console.log(`Server running on port ${port}`)
})

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
    return res.status(404).send({ errors: "Space not found" });
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
    return res.status(404).send({ errors: "Reservation not found" });
  }

  req.reservation = reservation_index;
  delete req.body.id;

  next();
}

function find_free_space() {
  return spaces.findIndex((x) => x.state == "free");
}

// serve spaces as json
app.get("/spaces", (req, res) => {

  let filter = req.query.filter;
  if (filter == null) {
    filtered_spaces = spaces;
  } else {
    console.log("searching: "+filter)
    filtered_spaces = spaces.filter((x) => x.description.includes(filter))
  }
  let limit = req.query.limit;//req.params.limit;
  let offset = req.query.offset;
  if (limit == null) {
    res.json(filtered_spaces);
  } else {
    if (offset == null) {offset=0};
    paged_spaces = filtered_spaces.slice(offset, +offset + +limit);
    res.json(paged_spaces);
  }
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
  const free_space = find_free_space();

  if (free_space === -1) {
    return res.status(400).send({ error: "No free space" });
  }

  spaces[find_space(free_space)].state = "in-use";

  newReservation = {
    ...req.body,
    id: reservations_autoincrement++,
    space_id: free_space,
    time: new Date(),
  };

  reservations.push(newReservation);
  res.status(201).send(newReservation);
});

// delete reservation
app.delete("/reservations/:id", set_reservation, (req, res) => {
  space_index = find_space(reservations[req.reservation].space_id);
  spaces[find_space(space_index)].state = "free";
  reservations.splice(req.reservation, 1);
  res.sendStatus(200);
});
