import { foodApi } from "@/api";
import { useFoodStore } from "@/store/FoodStore";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { shallow } from "zustand/shallow";

const Layout = ({ children }: { children: ReactNode }) => {
  const { setFoods } = useFoodStore(({ setFoods }) => ({ setFoods }), shallow);
  const { data: foods /* , isFetching: isFetchingFoods */ } = useQuery({
    queryKey: ["getFoods"],
    queryFn: foodApi.getAllFoods,
  });

  useEffect(() => {
    if (!foods) {
      return;
    }
    setFoods(foods);
  }, [foods, setFoods]);
  return <div className="flex flex-col">{children}</div>;
};

export default Layout;
