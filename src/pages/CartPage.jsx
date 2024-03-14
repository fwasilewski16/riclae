import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store";

function CartItem(props) {
  const dispatch = useDispatch();

  return (
    <div className="flex min-w-full justify-between border-b border-black py-4">
      <div className="flex">
        <div className="flex min-w-fit justify-start pr-3">
          <img
            src={
              props.item.type === "print"
                ? props.item.image
                : props.item.images[0]
            }
            className="max-h-20 min-w-full object-cover md:max-w-16"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-light tracking-wider md:text-lg md:tracking-widest">
            {props.item.name}
          </p>
          <p className="font-light tracking-wider md:text-lg md:tracking-widest">
            £{props.item.price}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex">
          <input
            onChange={(event) =>
              dispatch(
                cartActions.changeCartQty({
                  id: props.item.id,
                  newQty: event.target.value,
                }),
              )
            }
            type="number"
            defaultValue={props.item.cartQty}
            min={1}
            max={props.item.qty}
            className="h-8 w-10 rounded-lg border border-black bg-[#FAF2F5] p-2 text-center text-sm md:text-lg"
          />
          <div className="flex w-10 items-center justify-center">
            <p className="font-light tracking-wider md:text-lg md:tracking-widest">
              £{props.item.cartQty * props.item.price}
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={() => dispatch(cartActions.removeFromCart(props.item.id))}
            className="h-8 w-20 bg-black text-sm tracking-widest text-white md:h-11 md:w-[134px]"
          >
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const cartContent = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.total);

  return (
    <div className="flex min-h-[calc(100dvh-80px)] justify-center">
      <div className="w-[95%] xl:w-1/2">
        <h2 className="my-10 text-center text-4xl font-thin tracking-widest">
          CART:
        </h2>
        {cartContent.map((item) => (
          <CartItem item={item} />
        ))}
        {/* <div>
          <div>SUBTOTAL:</div>
          <p>{total}</p>
        </div>
        <div className="mt-4 flex justify-between px-4">
          <button className="h-11 w-[134px] bg-black tracking-widest text-white">
            SHOP
          </button>
          <button className="h-11 w-[134px] bg-black tracking-widest text-white">
            CHECKOUT
          </button>
        </div> */}
      </div>
    </div>
  );
}
