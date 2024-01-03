import "./Header.css";
import Button from "../../ui/button/Button";
import { useContext } from "react";
import CartContext from "../../store/CartContext";
import UserProgressContext from "../../store/UserProgressContext";

export default function Header() {
  const crtCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = crtCtx.items.reduce((totalItems, item) => {
    return totalItems + item.quantity;
  }, 0);

  function showCartHandler() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header" className="row">
      <div id="title" className="row">
        <img src="logo.jpg" alt="" />
        <h1>Hisham Restaurant</h1>
      </div>

      <nav>
        <Button textOnly onClick={showCartHandler}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
