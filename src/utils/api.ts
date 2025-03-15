const API_KEY = "5G5ULKlzuWWPaz4ycVgvv0wB11ynHXHSILICVtrwTraLpVwnhJ2n0oh8og8Z";
const BASE_URL = "https://api.sportmonks.com/v3/football/fixtures";


export const fetchFixturesByDate = async (date: string) => {
  const response = await fetch(`${BASE_URL}/date=${date}&api_token=${API_KEY}`);
  if (!response.ok) throw new Error("Failed to fetch fixtures");
  return response.json();
};
