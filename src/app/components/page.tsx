import { cartList } from "../dashboard/cart/cartItems";
export default function TesterData() {
  return (
    <div>
      <p>Tester Data Component</p>
        <p>Number of Items in Cart: {cartList.length}</p>
        <p>First Item in Cart: {cartList[0]?.Product.name}</p>
        <p>Second Item in Cart: {cartList[1]?.Product.name}</p>
    </div>
  );
}