const express = require("express");
const Amadeus = require("amadeus");

const app = express();
const port = process.env.PORT || 3000;

const amadeus = new Amadeus({
  clientId: "lsDPjaEpwGdi2Nh7xKM4MaptWCCSl8vV",
  clientSecret: "TwsD7Y44sBhcZ8HO",
});

app.use(express.static("public"));

app.get("/api/autocomplete", async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const response = await amadeus.referenceData.locations.get({
      keyword,
      subType: "CITY,AIRPORT",
    });
    res.json(response.result.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching autocomplete data");
  }
});

app.get("/api/search", async (req, res) => {
  try {
    const { origin, destination, departureDate, adults, children, infants, travelClass, returnDate } = req.query;
    const searchParams = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults,
      travelClass,
      ...(children ? { children } : {}),
      ...(infants ? { infants } : {}),
      ...(returnDate ? { returnDate } : {}),
    };

    const response = await amadeus.shopping.flightOffersSearch.get(searchParams);
    res.json(response.result.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching search results");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
