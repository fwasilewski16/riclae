import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store";
import { useState } from "react";

function CartItem(props) {
  const dispatch = useDispatch();

  return (
    <div className="flex min-w-full justify-between border-b border-black py-3">
      <div className="flex pr-2">
        <div className="flex min-w-fit pr-3">
          <img
            src={
              props.item.type === "print"
                ? props.item.image
                : props.item.images[0]
            }
            className="max-h-24 min-w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 md:justify-center">
          <p className="font-inter tracking-wide md:text-xl md:font-light">
            {props.item.name}
          </p>
          <p className="font-inter tracking-wide md:font-light">
            £{props.item.price}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 md:flex-row md:gap-16">
        <div className="flex items-center justify-between md:gap-5">
          <input
            onChange={(event) => {
              if (event.target.value <= props.item.qty)
                dispatch(
                  cartActions.changeCartQty({
                    id: props.item.id,
                    newQty: event.target.value,
                  }),
                );
              dispatch(cartActions.calculateTotal());
            }}
            onBlur={(event) => {
              if (event.target.value === "") {
                dispatch(
                  cartActions.changeCartQty({
                    id: props.item.id,
                    newQty: 1,
                  }),
                );
              }
              dispatch(cartActions.calculateTotal());
            }}
            onKeyDown={(event) => {
              if (
                isNaN(event.key) &&
                event.key != "Backspace" &&
                event.key != "Delete" &&
                event.key != "ArrowLeft" &&
                event.key != "ArrowRight"
              ) {
                event.preventDefault();
              }
              if (event.key === "0") {
                event.preventDefault();
              }
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={props.item.cartQty}
            min={1}
            max={props.item.qty}
            className="mr-4 h-10 w-10 rounded-lg border border-black bg-white text-center font-inter"
          />
          <div className="flex w-10 items-center justify-center">
            <p className="font-inter tracking-wide md:text-xl md:font-light md:tracking-wide">
              £{props.item.cartQty * props.item.price}
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              dispatch(cartActions.removeFromCart(props.item.id));
              dispatch(cartActions.calculateTotal());
            }}
            className="h-8 w-24 bg-black font-inter text-sm font-light tracking-wide text-white md:h-11 md:w-[134px]"
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
  const shipping = useSelector((state) => state.cart.shipping);

  const dispatch = useDispatch();

  return (
    <div className="flex min-h-[calc(100dvh-80px)] justify-center">
      <div className="min-h-full w-[95%] xl:w-1/2">
        <h2 className="my-10 text-center font-inter text-5xl font-extralight tracking-wide">
          CART:
        </h2>
        {cartContent.map((item, index) => (
          <CartItem item={item} key={index} />
        ))}
        {cartContent.length != 0 ? (
          <div className="flex flex-col items-end gap-5 py-5">
            <div className="flex items-center ">
              <p className="mx-2 font-inter tracking-wide">SHIPPING:</p>
              <button
                onClick={() => {
                  dispatch(cartActions.changeShipping(5));
                  dispatch(cartActions.calculateTotal());
                }}
                className={`h-full w-20 gap-4 text-center font-inter tracking-wide transition-all duration-200 lg:w-36 ${
                  shipping === 5 && "bg-white"
                }`}
              >
                UK
              </button>
              <p className="mx-2 text-lg">/</p>
              <button
                onClick={() => {
                  dispatch(cartActions.changeShipping(10));
                  dispatch(cartActions.calculateTotal());
                }}
                className={`h-full w-20 gap-4 text-center font-inter tracking-wide transition-all duration-200 lg:w-32 ${
                  shipping === 10 && "bg-white"
                }`}
              >
                WORLDWIDE
              </button>
              <p className="min-w-[50px] text-right font-inter tracking-wide">
                £{shipping}
              </p>
            </div>
            <div className="flex gap-5">
              <p className="font-inter text-lg tracking-wide">SUBTOTAL:</p>
              <p className="font-inter text-lg tracking-wide">£{total}</p>
            </div>
            <div className="mt-4 flex w-full justify-between py-4">
              <button className="h-11 w-[134px] border border-black bg-white font-inter tracking-wide">
                SHOP
              </button>
              <button
                disabled={shipping === 0}
                className="h-11 w-[134px] bg-black font-inter tracking-wide text-white transition-all duration-500 disabled:opacity-50"
              >
                CHECKOUT
              </button>
            </div>
          </div>
        ) : (
          <p className="my-20 text-center font-inter tracking-wide">
            Your cart is empty
          </p>
        )}
      </div>
    </div>
  );
}
