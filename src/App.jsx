import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import Header from "./components/header/Header";
import Meals from "./components/meals/Meals";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />

        <Meals />

        <Cart />

        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
