const express = require("express");
const router = express.Router();
//const Amadeus = require("../configs/Amadeus");
const Amadeus = require("amadeus");

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_KEY,
  clientSecret: process.env.AMADEUS_SECRET
});

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/api/flights", async (req, res) => {
  console.log(req.query);
  const { cityFrom, cityTo, departureDate } = req.query;
  // API call with params we requested from client app
  const response = await amadeus.shopping.flightOffers.get({
    origin: cityFrom,
    destination: cityTo,
    departureDate: departureDate,
    nonStop: true
  });

  let fares = JSON.parse(response.body).data.map(val => {
    let cleanData = val.offerItems[0].services[0].segments[0].flightSegment;
    let filtro = {
      departureCity: cleanData.departure.iataCode,
      destinationCity: cleanData.arrival.iataCode,
      departureDate: cleanData.departure.at.slice(0, 10),
      departureTime: cleanData.departure.at.slice(11, 16),
      price: val.offerItems[0].price.total,
      carrier: cleanData.carrierCode
    };
    return filtro;
  })
  
  let sorted = fares.sort((a,b) => Number(a.price) - Number(b.price) );

  try {
    await res.json(sorted);
    console.log(sorted);
  } catch (err) {
    await res.json(err);
  }

  /* .then(res => {
      console.log(res.data);
      await res.json(res.data);
    })
    .catch(err => {
      console.log(err);
    }); */
  // Sending response for client
  /* try {
    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  } */

  /* const flights = await Amadeus.getFlightprices("PAR", "MAD");

  try {
    await res.json(JSON.parse(flights));
  } catch (err) {
    await res.json(err);
  } */
});

module.exports = router;
