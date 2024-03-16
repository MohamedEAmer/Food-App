import Header from "./Components/Header.jsx";
import Meals from "./Components/Meals.jsx";
import Cart from "./Components/Cart.jsx";
import Checkout from "./Components/Checkout.jsx";
import { CartContextProvider } from "./store/CartContaxt.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
function App() {
  return (
    <>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header />
          <Meals />
          <Cart />
          <Checkout />
        </CartContextProvider>
      </UserProgressContextProvider>
    </>
  );
}

export default App;
