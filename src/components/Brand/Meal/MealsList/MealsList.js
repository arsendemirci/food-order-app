import { Card, MealItem } from "@components";
import classes from "./MealsList.module.scss";
import { meals } from "@constants";

export default function MealsList(props) {
  return (
    <Card className={classes.meals}>
      <ul>
        {meals.map((meal) => (
          <MealItem key={meal.id} {...meal}></MealItem>
        ))}
      </ul>
    </Card>
  );
}
