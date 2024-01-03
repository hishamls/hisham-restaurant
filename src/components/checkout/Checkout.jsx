import { useContext } from "react";
import Modal from "../../ui/modal/Modal";
import CartContext from "../../store/CartContext";
import { currencyFormatter } from "../../util/Formatting";
import UserProgressContext from "../../store/UserProgressContext";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";
import useHttp from "../../hooks/useHttp";
import Error from "../error/Error";

export default function Checkout(props) {
  const cartCtx = useContext(CartContext);

  const cartTotalPrice = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  const userProgressCtx = useContext(UserProgressContext);

  const requestedConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const {
    error,
    isLoading: isSending,
    data,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestedConfig);

  function closeHandler() {
    userProgressCtx.hideCheckout();
  }

  function finishHandler() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function submitHandler(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());

    console.log(customerData);
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={closeHandler}>
        Close
      </Button>
      <Button type="submit">Submit</Button>
    </>
  );

  if (isSending) {
    actions = <p>Sending order data...</p>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={finishHandler}
      >
        <h2>Success</h2>
        <p>Your order has been sent successfully!</p>
        <div className="modal-actions">
          <Button onClick={finishHandler}>Okay</Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={closeHandler}
    >
      <form onSubmit={submitHandler}>
        <h2>Checkout</h2>
        <p>Total amount:{currencyFormatter.format(cartTotalPrice)}</p>
        <Input id="name" label="Full name" type="text" />
        <Input id="email" label="Email" type="email" />
        <Input id="street" label="Street" type="text" />
        <div className="control-row">
          <Input id="postal-code" label="postal code" type="text" />
          <Input id="city" label="city" type="text" />
        </div>

        {error && <Error title="Fail to submit order!" message={error} />}

        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  );
}
