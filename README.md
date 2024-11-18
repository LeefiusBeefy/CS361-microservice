Random City Microservice

This microservice provides a random city using data from the GeoDB Cities API.

Communication Contract

How to Request Data

To programmatically request data, make an HTTP GET request to:

/api/random-city

Example Request:

import fetch from "node-fetch";

const testMicroservice = async () => {
  try {
    const response = await fetch("https://cs-361-microservice.vercel.app/api/random-city");
    const data = await response.json();
    console.log("Response from microservice:", data);
  } catch (error) {
    console.error("Error calling microservice:", error);
  }
};

testMicroservice();

How to Receive Data
The response is a JSON object containing details of a random city.

Example Response:

{
  "city": {
    "id": 3850019,
    "type": "CITY",
    "city": "Berlin",
    "country": "Germany",
    "countryCode": "DE",
    "region": "Berlin",
    "latitude": 52.516666666,
    "longitude": 13.383333333,
    "population": 3755251
  }
}
UML Sequence Diagram
Below is a UML sequence diagram illustrating the interaction:

+-------------+        +---------------------+        +-------------------+
| Application |        | Random City Service|        |    Cities API    |
+-------------+        +---------------------+        +-------------------+
       |                           |                                    |
       | GET /api/random-city      |                                    |
       |-------------------------->|                                    |
       |                           |        GET totalCount              |
       |                           |----------------------------------->|
       |                           |        Respond with totalCount     |
       |                           |<-----------------------------------|
       |                           |        GET city by offset          |
       |                           |----------------------------------->|
       |                           |        Respond with city details   |
       |                           |<-----------------------------------|
       | Respond with random city details                               |
       |<--------------------------|                                    |
       |                           |                                    |