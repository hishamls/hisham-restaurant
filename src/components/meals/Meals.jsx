import { useEffect, useState } from "react";
import "./Meals.css";
import MealItem from "../meal-item/MealItem.jsx";
import useHttp from "../../hooks/useHttp.js";
import Error from "../error/Error.jsx";

export default function Meals(props) {
  const configRequest = {};
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", configRequest, []);

  // isLoading && <p className="center">Meals are fetching...</p>;// not working
  // if (isLoading) {
  //   return <p className="center">Meals are fetching...</p>;
  // }

  if (error) {
    <Error title="Fail to fetch meals!" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
