import { Food } from "../types";
import axiosInstance from "./axios";

const getAllFoods = async (): Promise<Food[]> => {
  const { data: foods } = await axiosInstance.get("/foods");
  return foods;
};

const replaceAllFoods = async (foods: Food[]) => {
  const { data } = await axiosInstance.post("/foods", foods);
  return data;
};

export const foodApi = { getAllFoods, replaceAllFoods };
