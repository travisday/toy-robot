import type { Payload } from "./types";

// API Utility to call the api endpoints

// I would put this in an env file but for ease of testing and sharing I left it here.
const API_URL = 'http://localhost:3000/positions'

// function that sends a POST request to my api to log a new position in the db
export async function addPos(pos: Payload): Promise<string> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pos)
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return "200"
}

// function that gets the latest position in the db
export async function getLastPos(): Promise<Payload> {
  const response = await fetch(API_URL + '/latest');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  console.log(data)

  return {x:Number(data.x), y:Number(data.y), facing:data.facing}
}