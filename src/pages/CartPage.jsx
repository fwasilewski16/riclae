import { useSelector } from "react-redux";

export default function CartPage() {
  const cartContent = useSelector((state) => state.cart.cart);
  console.log(cartContent);

  return (
    <div className="min-h-[calc(100dvh-80px)]">
      <h2>CART: </h2>
      {cartContent.map((item) => (
        <p>{item.name}</p>
      ))}
    </div>
  );
}
