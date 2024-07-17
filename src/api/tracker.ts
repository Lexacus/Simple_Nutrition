import { useAuthStore } from "../store/AuthStore";
import { DietDay, Food } from "../types";
import axiosInstance from "./axios";

const getAllTrackedDays = async (): Promise<
  { day: string; foods: Food[] }[]
> => {
  const password = useAuthStore.getState().tempPassword;
  const { data: trackedDays } = await axiosInstance.get("/tracker", {
    headers: { Authorization: password },
  });
  return trackedDays;
};

const replaceAllTrackedDays = async (days: Record<string, DietDay>) => {
  const password = useAuthStore.getState().tempPassword;

  const parsedDays = Object.entries(days).map(([key, value]) => ({
    day: key,
    foods: value.foods,
  }));
  const { data } = await axiosInstance.post("/tracker", parsedDays, {
    headers: { Authorization: password },
  });
  return data;
};

export const trackerApi = { getAllTrackedDays, replaceAllTrackedDays };
