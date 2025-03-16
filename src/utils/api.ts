export const fetchFixturesByDate = async (date: string) => {
  try {
    const API_KEY = "5G5ULKlzuWWPaz4ycVgvv0wB11ynHXHSILICVtrwTraLpVwnhJ2n0oh8og8Z";
    const BASE_URL = "https://corsproxy-1.onrender.com/full?url=https://api.sportmonks.com/v3/football/fixtures";


    const response = await fetch(`${BASE_URL}/date/${date}?api_token=${API_KEY}`);

    console.log('_____:', response)

    if (!response.ok) throw new Error("API Failed");

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("API failed, returning mock data");

    return {
      data: [
        {
          id: 19146700,
          name: "St. Mirren vs Hibernian",
          starting_at: "2024-08-04 14:00:00",
          result_info: "St. Mirren won after full-time.",
        },
        {
          id: 19146701,
          name: "Celtic vs Kilmarnock",
          starting_at: "2024-08-04 15:30:00",
          result_info: "Celtic won after full-time.",
        },
      ],
    };
  }
};
