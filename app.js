const Pokemon = require('./lib/models/filament');
const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());


app.post('/filament', async(req, res) => {
  const filament = await Pokemon.insert(req.body);
  res.send(filament);
});

app.get('/filament', async(req, res) => {
  const filament = await Pokemon.find(req.body);
  res.send(filament);
});

app.get('/filament/:id', async(req, res) => {
  const filament = await Pokemon.findById(req.params.id);
  res.send(filament);
});

app.delete('/filament/:id', async(req, res) => {
  const filament = await Pokemon.delete(req.params.id);
  res.send(filament);
});

app.put('/filament/:id', async(req, res) => {
  const filament = await Pokemon.update(req.params.id, req.body);
  res.send(filament);
});

module.exports = app;
