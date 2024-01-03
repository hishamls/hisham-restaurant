import { currencyFormatter } from "../../util/Formatting";
import Button from "../../ui/button/Button";
import { useContext } from "react";
import CartContext from "../../store/CartContext";

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);
  function addHandler(params) {
    cartCtx.addItem(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />

        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>

          <p className="meal-item-action">
            <Button onClick={addHandler}>Add to cart</Button>
          </p>
        </div>
      </article>
    </li>
  );
}
