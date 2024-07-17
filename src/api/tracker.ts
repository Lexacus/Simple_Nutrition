import { DietDay, Food } from "../types";
import axiosInstance from "./axios";

const getAllTrackedDays = async (): Promise<
  { day: string; foods: Food[] }[]
> => {
  const { data: trackedDays } = await axiosInstance.get("/tracker");
  return trackedDays;
};

const replaceAllTrackedDays = async (days: Record<string, DietDay>) => {
  const parsedDays = Object.entries(days).map(([key, value]) => ({
    day: key,
    foods: value.foods,
  }));
  const { data } = await axiosInstance.post("/tracker", parsedDays);
  return data;
};

export const trackerApi = { getAllTrackedDays, replaceAllTrackedDays };
