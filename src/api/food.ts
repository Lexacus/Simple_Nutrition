import { Food } from "../types";
import axiosInstance from "./axios";

const getAllFoods = async (): Promise<Food[]> => {
  const password = import.meta.env.VITE_PASSWORD;
  const { data: foods } = await axiosInstance.get("/foods", {
    headers: { x_authorization: password },
  });
  return foods;
};

const replaceAllFoods = async (foods: Food[]) => {
  const password = import.meta.env.VITE_PASSWORD;

  const { data } = await axiosInstance.post("/foods", foods, {
    headers: { x_authorization: password },
  });
  return data;
};

export const foodApi = { getAllFoods, replaceAllFoods };
