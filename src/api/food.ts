import { useAuthStore } from "../store/AuthStore";
import { Food } from "../types";
import axiosInstance from "./axios";

const getAllFoods = async (): Promise<Food[]> => {
  const password = useAuthStore.getState().tempPassword;
  const { data: foods } = await axiosInstance.get("/foods", {
    headers: { Authorization: password },
  });
  return foods;
};

const replaceAllFoods = async (foods: Food[]) => {
  const password = useAuthStore.getState().tempPassword;

  const { data } = await axiosInstance.post("/foods", foods, {
    headers: { Authorization: password },
  });
  return data;
};

export const foodApi = { getAllFoods, replaceAllFoods };
