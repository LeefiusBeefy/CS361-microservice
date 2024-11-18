Random City Microservice
This microservice provides a random city using data from the GeoDB Cities API.

Communication Contract
How to Request Data
To programmatically request data, make an HTTP GET request to:

arduino
Copy code
/api/random-city
Optional Query Parameters:

None
Example Request:

javascript
Copy code
const fetch = require("node-fetch");

(async () => {
  const response = await fetch("http://localhost:3000/api/random-city");
  const data = await response.json();
  console.log(data);
})();
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

plaintext
Copy code
+-------------+        +---------------------+        +-------------------+
| Application |        | Random City Service|        | GeoDB Cities API  |
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
+-------------+        +---------------------+        +-------------------+
Mitigation Plan
For which teammate did you implement “Microservice A”?
I implemented this microservice for [Teammate Name or Project Name].

What is the current status of the microservice?
The microservice is done and ready to use.

If the microservice isn’t done, which parts aren’t done and when will they be done?
N/A

How is your teammate going to access your microservice?
The microservice is hosted on Vercel at:
arduino
Copy code
https://your-vercel-app.vercel.app/api/random-city
Teammates can also clone the repository from GitHub and run it locally if needed:
arduino
Copy code
git clone https://github.com/your-username/random-city-generator
npm install
npm run dev
If your teammate cannot access/call YOUR microservice, what should they do?
They should contact me immediately at [your email or preferred contact method].
I will be available during weekdays from 9 AM to 5 PM.
If your teammate cannot access/call your microservice, by when do they need to tell you?
They should inform me at least 3 days before the project deadline to ensure I can assist in troubleshooting.

Is there anything else your teammate needs to know?
The microservice relies on the GeoDB Cities API, which has rate limits. If any issues arise due to rate limits, we can coordinate adjustments.
Ensure that your program handles network errors gracefully when calling the microservice.