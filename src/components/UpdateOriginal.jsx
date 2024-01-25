import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useUploadImage from "../hooks/useUploadImage";

import spinner from "../assets/spinner.gif";
import useUpdateOriginal from "../hooks/useUpdateOriginal";
import useDeleteOriginal from "../hooks/useDeleteOriginal";

export default function UpdateOriginal(props) {
  const navigate = useNavigate();

  const [name, setName] = useState(props.painting.name);
  const [price, setPrice] = useState(props.painting.price);
  const [year, setYear] = useState(props.painting.year);
  const [additionalInfo1, setAdditionalInfo1] = useState(
    props.painting.additionalInfo[0],
  );
  const [additionalInfo2, setAdditionalInfo2] = useState(
    props.painting.additionalInfo[1],
  );
  const [image1, setImage1] = useState(props.painting.images[0]);
  const [image2, setImage2] = useState(props.painting.images[1]);
  const [image3, setImage3] = useState(props.painting.images[2]);
  const [size, setSize] = useState(props.painting.size);
  const [qty, setQty] = useState(props.painting.qty);

  const [loading, setLoading] = useState(false);
  const [deleteWindowVisible, setDeleteWindowVisible] = useState(false);
  const [updateOk, setUpdateOk] = useState(false);
  const [deleteOk, setDeleteOk] = useState(false);

  const update =
    name != props.painting.name ||
    price != props.painting.price ||
    year != props.painting.year ||
    additionalInfo1 != props.painting.additionalInfo[0] ||
    additionalInfo2 != props.painting.additionalInfo[1] ||
    image1 != props.painting.images[0] ||
    image2 != props.painting.images[1] ||
    image3 != props.painting.images[2] ||
    size != props.painting.size ||
    qty != props.painting.qty;

  const formDisabled =
    !name || !price || !year || !additionalInfo1 || !size || !image1 || !qty;

  async function updateOriginal(e) {
    e.preventDefault();
    setLoading(true);
    const filteredInfo = [additionalInfo1, additionalInfo2].filter(
      (info) => info != null,
    );
    const filteredImages = [image1, image2, image3].filter(
      (image) => image != null,
    );
    const original = {
      name: name,
      price: price,
      year: year,
      additionalInfo: filteredInfo,
      size: size,
      images: filteredImages,
      qty: qty,
      _id: props.painting._id,
    };
    try {
      const result = await useUpdateOriginal(original);
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
        onSubmit={updateOriginal}
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
                    const result = await useDeleteOriginal(props.painting._id);
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
            <p className="tracking-wider">Original updated successfully</p>
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
            <p className="tracking-wider">Original deleted successfully</p>
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
          <label htmlFor="year" className="tracking-wider">
            Year:
          </label>
          <input
            id="year"
            type="text"
            defaultValue={props.painting.year}
            className={`w-24 rounded-sm border border-gray-500 px-2 ${
              year != props.painting.year && "bg-yellow-100"
            }`}
            onChange={(e) => setYear(e.target.value)}
          ></input>
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
        <div
          className={`flex justify-between ${
            image1 != props.painting.images[0] && "bg-yellow-100"
          }`}
        >
          <label htmlFor="image1" className="my-auto tracking-wider">
            Image 1:
          </label>
          <input
            className="my-auto w-[93.58px]"
            type="file"
            id="image1"
            name="image1"
            onChange={async (e) => {
              if (e.target.files[0]) {
                setLoading(true);
                try {
                  const response = await useUploadImage(e.target.files[0]);
                  if (!response.status) {
                    throw new Error("Image upload failed");
                  }
                  setImage1(response.link);
                } catch (error) {
                  alert(error.message);
                }
                setLoading(false);
              }
            }}
          />
          <div
            className={`flex h-16 w-16 justify-center rounded-lg ${
              image1 === null && "bg-red-100"
            }`}
          >
            {image1 != null && (
              <img src={image1} className="my-auto rounded-lg" />
            )}
          </div>
          <button
            disabled={image1 === null}
            onClick={(e) => {
              e.preventDefault();
              const file = document.querySelector("#image1");
              file.value = "";
              setImage1(null);
            }}
            className="hover:underline disabled:opacity-30 disabled:hover:no-underline"
          >
            CLEAR
          </button>
        </div>
        <div
          className={`flex justify-between ${
            image2 != props.painting.images[1] && "bg-yellow-100"
          }`}
        >
          <label htmlFor="image2" className="my-auto tracking-wider">
            Image 2:
          </label>
          <input
            className="my-auto w-[93.58px]"
            type="file"
            id="image2"
            name="image2"
            onChange={async (e) => {
              if (e.target.files[0]) {
                setLoading(true);
                try {
                  const response = await useUploadImage(e.target.files[0]);
                  if (!response.status) {
                    throw new Error("Image upload failed");
                  }
                  setImage2(response.link);
                } catch (error) {
                  alert(error.message);
                }
                setLoading(false);
              }
            }}
          />
          <div
            className={`flex h-16 w-16 justify-center rounded-lg ${
              image2 === null && "bg-gray-200"
            }`}
          >
            {image2 != null && (
              <img src={image2} className="my-auto rounded-lg" />
            )}
          </div>
          <button
            disabled={image2 === null || !image2}
            onClick={(e) => {
              e.preventDefault();
              const file = document.querySelector("#image2");
              file.value = "";
              setImage2(null);
            }}
            className="hover:underline disabled:opacity-30 disabled:hover:no-underline"
          >
            CLEAR
          </button>
        </div>
        <div
          className={`flex justify-between ${
            image3 != props.painting.images[2] && "bg-yellow-100"
          }`}
        >
          <label htmlFor="image3" className="my-auto tracking-wider">
            Image 3:
          </label>
          <input
            className="my-auto w-[93.58px]"
            type="file"
            id="image3"
            name="image3"
            onChange={async (e) => {
              if (e.target.files[0]) {
                setLoading(true);
                try {
                  const response = await useUploadImage(e.target.files[0]);
                  if (!response.status) {
                    throw new Error("Image upload failed");
                  }
                  setImage3(response.link);
                } catch (error) {
                  alert(error.message);
                }
                setLoading(false);
              }
            }}
          />
          <div
            className={`flex h-16 w-16 justify-center rounded-lg ${
              image3 === null && "bg-gray-200"
            }`}
          >
            {image3 != null && (
              <img src={image3} className="my-auto rounded-lg" />
            )}
          </div>
          <button
            disabled={image3 === null || !image3}
            onClick={(e) => {
              e.preventDefault();
              const file = document.querySelector("#image3");
              file.value = "";
              setImage3(null);
            }}
            className="hover:underline disabled:opacity-30 disabled:hover:no-underline"
          >
            CLEAR
          </button>
        </div>
        <div className="flex justify-between">
          <label htmlFor="size">Size:</label>
          <input
            id="size"
            defaultValue={props.painting.size}
            className={`w-[275px] rounded-sm border border-gray-500 px-2 ${
              size != props.painting.size && "bg-yellow-100"
            }`}
            onChange={(e) => setSize(e.target.value)}
          ></input>
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
