import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
const GEO_API_URL = 'http://geodb-free-service.wirefreethought.com/v1/geo/cities';
const GEO_API_HEADERS = {
  'Content-Type': 'application/json'
};

// Cache variables
let cachedCityCount: number | null = null;
let lastFetchedTimestamp: number | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

app.use(cors());
app.use(express.json());

// Function to fetch the total count of cities from the API
async function fetchTotalCityCount(): Promise<number> {
  try {
    const response = await axios.get(GEO_API_URL, {
      headers: GEO_API_HEADERS,
      params: { 
        hateoasMode: 'off', 
        limit: 1,
        types: 'CITY'}
    });
    return response.data.metadata.totalCount;
  } catch (error) {
    console.error('Error fetching total city count:', error);
    throw new Error('Failed to retrieve total city count');
  }
}

// Function to get the cached city count or fetch a new one if expired
async function getTotalCityCount(): Promise<number> {
  const now = Date.now();

  // Check if cachedCityCount is still valid
  if (cachedCityCount !== null && lastFetchedTimestamp !== null && (now - lastFetchedTimestamp) < CACHE_DURATION) {
    return cachedCityCount;
  }

  // Fetch new city count and update cache
  cachedCityCount = await fetchTotalCityCount();
  lastFetchedTimestamp = now;
  return cachedCityCount;
}

// API endpoint to get a random city name
app.get('/random-city', async (req: Request, res: Response) => {
  try {
    // Step 1: Get total city count, using the cached value if available
    const totalCount = await getTotalCityCount();

    // Step 2: Generate a random offset
    const randomOffset = Math.floor(Math.random() * totalCount);

    // Step 3: Fetch a city using the random offset
    const cityName = await getRandomCity(randomOffset);

    // Step 4: Send the city name as a response
    res.json({ city: cityName });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching a random city' });
  }
});

// Function to get a city by random offset
async function getRandomCity(offset: number): Promise<string> {
  const response = await axios.get(GEO_API_URL, {
    headers: GEO_API_HEADERS,
    params: {
      limit: 1,
      offset: offset,
      types: 'CITY',
      hateoasMode: 'off'
    }
  });
  return response.data.data[0];
}

// Start the server
app.listen(PORT, () => {
  console.log(`Random city service is running on http://localhost:${PORT}`);
});
