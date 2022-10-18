import { useState, useEffect } from "react";
import { useAxiosApi } from "@hooks";

const useMealsApi = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: getMeals } = useAxiosApi();

  useEffect(() => {
    const loadMeals = (fetchedMeals) => {
      setMeals(fetchedMeals);
    };
    getMeals({ url: "meals.json" }, loadMeals);
  }, [getMeals]);

  return { meals, isLoading, error };
};

export default useMealsApi;
