const express = require('express');
const router = express.Router();
//const Amadeus = require("../configs/Amadeus");
const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_KEY,
  clientSecret: process.env.AMADEUS_SECRET
});

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/api/flights', async (req, res) => {
  console.log('REQ.QUERY', req.query);
  const { cityFrom, cityTo, departureDate, returnDate } = req.query;
  // API call with params we requested from client app
  const response = await amadeus.client.get(`/v2/shopping/flight-offers`, {
    originLocationCode: cityFrom,
    destinationLocationCode: cityTo,
    departureDate: departureDate,
    returnDate: returnDate,
    adults: 1
  });

  

  try {
    res.json(response.result);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
