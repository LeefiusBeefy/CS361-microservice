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
