import axios from "axios";

export const runSimulation = async (inputs) => {
  try {
    const res = await axios.post(
      "https://digital-twin-earth.onrender.com", 
      inputs,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
};
