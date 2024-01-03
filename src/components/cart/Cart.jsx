import { useContext } from "react";
import Modal from "../../ui/modal/Modal";
import CartContext from "../../store/CartContext";
import { currencyFormatter } from "../../util/Formatting";
import Button from "../../ui/button/Button";
import UserProgressContext from "../../store/UserProgressContext";
import CartItem from "../cartItem/CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotalPrice = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  function closeCartHandler() {
    userProgressCtx.hideCart();
  }

  function openCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? closeCartHandler : null}
    >
      <h2>Your Cart</h2>

      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            onIncrease={() => {
              cartCtx.addItem(item);
            }}
            onDecrease={() => {
              cartCtx.removeItem(item.id);
            }}
            {...item}
          />
        ))}
      </ul>

      <p className="cartTotal">
        Total price: {currencyFormatter.format(cartTotalPrice)}
      </p>

      <div className="modal-action">
        <Button textOnly onClick={closeCartHandler}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={openCheckout}> Go to checkout</Button>
        )}
      </div>
    </Modal>
  );
}
