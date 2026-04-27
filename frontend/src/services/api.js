import axios from "axios";

export const runSimulation = async (inputs) => {
  try {
    const res = await axios.post(
      "http://127.0.0.1:5000/simulate", 
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