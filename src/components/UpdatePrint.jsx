import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useUploadImage from "../hooks/useUploadImage";

import spinner from "../assets/spinner.gif";
import useUpdatePrint from "../hooks/useUpdatePrint";
import useDeletePrint from "../hooks/useDeletePrint";

export default function UpdatePrint(props) {
  const navigate = useNavigate();

  const [name, setName] = useState(props.painting.name);
  const [price, setPrice] = useState(props.painting.price);
  const [additionalInfo1, setAdditionalInfo1] = useState(
    props.painting.additionalInfo[0],
  );
  const [additionalInfo2, setAdditionalInfo2] = useState(
    props.painting.additionalInfo[1],
  );
  const [printedArea, setPrintedArea] = useState(props.painting.printedArea);
  const [printSize, setPrintSize] = useState(props.painting.printSize);
  const [image, setImage] = useState(props.painting.image);
  const [qty, setQty] = useState(props.painting.qty);

  const [loading, setLoading] = useState(false);
  const [deleteWindowVisible, setDeleteWindowVisible] = useState(false);
  const [updateOk, setUpdateOk] = useState(false);
  const [deleteOk, setDeleteOk] = useState(false);

  const update =
    name != props.painting.name ||
    price != props.painting.price ||
    additionalInfo1 != props.painting.additionalInfo[0] ||
    additionalInfo2 != props.painting.additionalInfo[1] ||
    printedArea != props.painting.printedArea ||
    printSize != props.painting.printSize ||
    image != props.painting.image ||
    qty != props.painting.qty;

  const formDisabled =
    !name ||
    !price ||
    !additionalInfo1 ||
    !printedArea ||
    !printSize ||
    !image ||
    !qty;

  async function updatePrint(e) {
    e.preventDefault();
    setLoading(true);
    const filteredInfo = [additionalInfo1, additionalInfo2].filter(
      (info) => info != null,
    );
    const print = {
      name: name,
      price: price,
      additionalInfo: filteredInfo,
      printedArea: printedArea,
      printSize: printSize,
      image: image,
      qty: qty,
      _id: props.painting._id,
    };
    try {
      const result = await useUpdatePrint(print);
      if (!result.status) {
        throw new Error(result.message);
      }
      setUpdateOk(true);
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  }

  return (
    <div className="my-auto">
      <form
        onSubmit={updatePrint}
        className="relative flex w-[600px] flex-col gap-2 rounded-lg bg-white px-8 py-4"
      >
        {loading && (
          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-white bg-opacity-80">
            <img src={spinner} />
          </div>
        )}
        {deleteWindowVisible && (
          <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center rounded-lg bg-white bg-opacity-90">
            <p className="tracking-wider">
              Are you sure you want to delete {props.painting.name}?
            </p>
            <div className="flex gap-16">
              <button
                onClick={() => setDeleteWindowVisible(false)}
                className="mt-4 h-9 w-20 rounded-lg bg-blue-400 text-lg tracking-widest text-white shadow-lg"
              >
                NO
              </button>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    setDeleteWindowVisible(false);
                    setLoading(true);
                    const result = await useDeletePrint(props.painting._id);
                    if (!result.status) {
                      throw new Error(result.message);
                    }
                    setLoading(false);
                    setDeleteOk(true);
                  } catch (error) {
                    setLoading(false);
                    alert(error.message);
                  }
                }}
                className="mt-4 h-9 w-20 rounded-lg bg-red-400 text-lg tracking-widest text-white shadow-lg"
              >
                YES
              </button>
            </div>
          </div>
        )}
        {updateOk && (
          <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center rounded-lg bg-white bg-opacity-90">
            <p className="tracking-wider">Print updated successfully</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin");
              }}
              className="mt-4 h-9 w-20 rounded-lg bg-green-400 text-lg tracking-widest text-white shadow-lg"
            >
              OK
            </button>
          </div>
        )}
        {deleteOk && (
          <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center rounded-lg bg-white bg-opacity-90">
            <p className="tracking-wider">Print deleted successfully</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin");
              }}
              className="mt-4 h-9 w-20 rounded-lg bg-green-400 text-lg tracking-widest text-white shadow-lg"
            >
              OK
            </button>
          </div>
        )}
        <div className="flex justify-between">
          <label htmlFor="name" className="tracking-wider">
            Name:
          </label>
          <input
            id="name"
            type="text"
            defaultValue={props.painting.name}
            className={`w-[250px] rounded-sm border border-gray-500 px-2 ${
              name != props.painting.name && "bg-yellow-100"
            }`}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="price" className="tracking-wider">
            Price:
          </label>
          <div className="flex gap-2">
            <p>£</p>
            <input
              min={0}
              id="price"
              type="number"
              defaultValue={props.painting.price}
              className={`w-24 rounded-sm border border-gray-500 px-2 ${
                price != props.painting.price && "bg-yellow-100"
              }`}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="additionalInfo1" className="tracking-wider">
            Additional info 1:
          </label>
          <input
            id="additionalInfo1"
            type="text"
            defaultValue={props.painting.additionalInfo[0]}
            className={`w-[275px] rounded-sm border border-gray-500 px-2 ${
              additionalInfo1 != props.painting.additionalInfo[0] &&
              "bg-yellow-100"
            }`}
            onChange={(e) => setAdditionalInfo1(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="additionalInfo2" className="tracking-wider">
            Additional info 2:
          </label>
          <input
            id="additionalInfo2"
            type="text"
            defaultValue={props.painting.additionalInfo[1]}
            className={`w-[275px] rounded-sm border border-gray-500 px-2 ${
              additionalInfo2 != props.painting.additionalInfo[1] &&
              "bg-yellow-100"
            }`}
            onChange={(e) => setAdditionalInfo2(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="printedArea" className="tracking-wider">
            Printed area:
          </label>
          <input
            id="printedArea"
            type="text"
            defaultValue={props.painting.printedArea}
            className={`w-[275px] rounded-sm border border-gray-500 px-2 ${
              printedArea != props.painting.printedArea && "bg-yellow-100"
            }`}
            onChange={(e) => setPrintedArea(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="printSize" className="tracking-wider">
            Print size:
          </label>
          <input
            id="printSize"
            type="text"
            defaultValue={props.painting.printSize}
            className={`w-[275px] rounded-sm border border-gray-500 px-2 ${
              printSize != props.painting.printSize && "bg-yellow-100"
            }`}
            onChange={(e) => setPrintSize(e.target.value)}
          />
        </div>
        <div
          className={`flex justify-between ${
            image != props.painting.image && "bg-yellow-100"
          }`}
        >
          <label htmlFor="image" className="my-auto tracking-wider">
            Image:
          </label>
          <input
            className="my-auto w-[93.58px]"
            type="file"
            id="image"
            name="image"
            onChange={async (e) => {
              if (e.target.files[0]) {
                setLoading(true);
                try {
                  const response = await useUploadImage(e.target.files[0]);
                  if (!response.status) {
                    throw new Error("Image upload failed");
                  }
                  setImage(response.link);
                } catch (error) {
                  alert(error.message);
                }
                setLoading(false);
              }
            }}
          />
          <div
            className={`flex h-16 w-16 justify-center rounded-lg ${
              image === null && "bg-red-100"
            }`}
          >
            {image != null && (
              <img src={image} className="my-auto h-16 rounded-lg" />
            )}
          </div>
          <button
            disabled={image === null}
            onClick={(e) => {
              e.preventDefault();
              const file = document.querySelector("#image");
              file.value = "";
              setImage(null);
            }}
            className="hover:underline disabled:opacity-30 disabled:hover:no-underline"
          >
            CLEAR
          </button>
        </div>
        <div className="flex justify-between">
          <label htmlFor="qty" className="tracking-wider">
            Quantity:
          </label>
          <input
            min={0}
            id="qty"
            type="number"
            defaultValue={props.painting.qty}
            className={`w-24 rounded-sm border border-gray-500 px-2 ${
              qty != props.painting.qty && "bg-yellow-100"
            }`}
            onChange={(e) => {
              setQty(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="qty" className="tracking-wider">
            ID:
          </label>
          <p>{props.painting.id}</p>
        </div>
        <div className="flex justify-between">
          <label htmlFor="qty" className="tracking-wider">
            _id:
          </label>
          <p>{props.painting._id}</p>
        </div>
        <div className="mt-5 flex w-full justify-between">
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="h-9 w-1/4 rounded-lg bg-blue-500 text-lg tracking-widest text-white shadow-lg disabled:opacity-30"
          >
            <NavLink to="/admin">BACK</NavLink>
          </button>
          <button
            disabled={!update}
            onClick={(e) => {
              e.preventDefault();
              window.location.reload();
            }}
            className="h-9 w-1/4 rounded-lg bg-red-400 text-lg tracking-widest text-white shadow-lg disabled:opacity-30"
          >
            RESET
          </button>
          <button
            disabled={!update || formDisabled}
            className="h-9 w-1/4 rounded-lg bg-blue-500 text-lg tracking-widest text-white shadow-lg disabled:opacity-30"
          >
            UPDATE
          </button>
        </div>
      </form>
      <div className="flex justify-center px-8">
        <button
          onClick={() => setDeleteWindowVisible(true)}
          className={`mt-4 h-9 w-1/4 rounded-lg bg-red-400 text-lg tracking-widest text-white shadow-lg ${
            (deleteWindowVisible || loading || updateOk || deleteOk) &&
            "opacity-0"
          }`}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}
