import { useMutation, useQuery } from "@tanstack/react-query";
import { foodApi, trackerApi } from "../../../api";
import { toast } from "react-toastify";

const useSettings = () => {
  const { isFetching: isFetchingAllFoods, refetch: foodsRefetch } = useQuery({
    queryKey: ["getAllFoods"],
    queryFn: foodApi.getAllFoods,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { isFetching: isFetchingAllTrackedDays, refetch: trackedDaysRefetch } =
    useQuery({
      queryKey: ["getAllTrackedDays"],
      queryFn: trackerApi.getAllTrackedDays,
      refetchOnWindowFocus: false,
      enabled: false,
    });

  const { mutateAsync: saveAllFoods } = useMutation({
    mutationKey: ["saveAllFoods"],
    mutationFn: foodApi.replaceAllFoods,
    onSuccess: () => {
      toast("Successfully saved foods to server", {
        hideProgressBar: true,
        type: "success",
      });
    },
    onError: (err) => {
      console.error(err);
      toast("Error while saving foods to server", {
        hideProgressBar: true,
        type: "error",
      });
    },
  });

  const { mutateAsync: saveAllTrackedDays } = useMutation({
    mutationKey: ["saveAllTrackedDays"],
    mutationFn: trackerApi.replaceAllTrackedDays,
    onSuccess: () => {
      toast("Successfully saved tracked days to server", {
        hideProgressBar: true,
        type: "success",
      });
    },
    onError: (err) => {
      console.error(err);
      toast("Error while saving tracked days to server", {
        hideProgressBar: true,
        type: "error",
      });
    },
  });

  return {
    saveAllFoods,
    foodsRefetch,
    saveAllTrackedDays,
    trackedDaysRefetch,
    isFetchingAllFoods,
    isFetchingAllTrackedDays,
  };
};

export default useSettings;
