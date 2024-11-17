import { NextResponse } from "next/server";
import axios from "axios";

const GEO_API_URL = "http://geodb-free-service.wirefreethought.com/v1/geo/cities";
const GEO_API_HEADERS = {
  "Content-Type": "application/json",
};

// Cache variables
let cachedCityCount: number | null = null;
let lastFetchedTimestamp: number | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Function to fetch the total count of cities from the API
async function fetchTotalCityCount(): Promise<number> {
  try {
    const response = await axios.get(GEO_API_URL, {
      headers: GEO_API_HEADERS,
      params: { hateoasMode: "off", limit: 1, types: "CITY" },
    });
    return response.data.metadata.totalCount;
  } catch (error) {
    console.error("Error fetching total city count:", error);
    throw new Error("Failed to retrieve total city count");
  }
}

// Function to get the cached city count or fetch a new one if expired
async function getTotalCityCount(): Promise<number> {
  const now = Date.now();

  // Check if cachedCityCount is still valid
  if (
    cachedCityCount !== null &&
    lastFetchedTimestamp !== null &&
    now - lastFetchedTimestamp < CACHE_DURATION
  ) {
    return cachedCityCount;
  }

  // Fetch new city count and update cache
  cachedCityCount = await fetchTotalCityCount();
  lastFetchedTimestamp = now;
  return cachedCityCount;
}

// Function to get a city by random offset
async function getRandomCity(offset: number): Promise<any> {
  const response = await axios.get(GEO_API_URL, {
    headers: GEO_API_HEADERS,
    params: {
      limit: 1,
      offset: offset,
      types: "CITY",
      hateoasMode: "off",
    },
  });
  return response.data.data[0]; // Ensure this returns an object
}

// API route handler for fetching a random city
export async function GET() {
  try {
    const totalCount = await getTotalCityCount();

    
    const randomOffset = Math.floor(Math.random() * totalCount);

    
    const city = await getRandomCity(randomOffset);

    const { wikiDataId, regionWdId, regionCode, name, ...filteredCity } = city;

    return NextResponse.json({ city: filteredCity });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching a random city" },
      { status: 500 }
    );
  }
}
