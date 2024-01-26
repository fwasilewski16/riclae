import { useState } from "react";
import Modal from "../UI/Modal";
import useUploadOriginal from "../hooks/useUploadOriginal";
import useUploadImage from "../hooks/useUploadImage";

import spinner from "../assets/spinner.gif";

export default function AddOriginal(props) {
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [year, setYear] = useState(null);
  const [additionalInfo1, setAdditionalInfo1] = useState(null);
  const [additionalInfo2, setAdditionalInfo2] = useState(null);
  const [size, setSize] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [qty, setQty] = useState(null);
  const [id, setId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [uploadOk, setUploadOk] = useState(false);

  const formDisabled =
    !name ||
    !price ||
    !year ||
    !additionalInfo1 ||
    !size ||
    !image1 ||
    !qty ||
    !id;

  async function uploadOriginal() {
    setLoading(true);
    const filteredInfo = [additionalInfo1, additionalInfo2].filter(
      (info) => info != null,
    );
    const filteredImages = [image1, image2, image3].filter(
      (image) => image != null,
    );
    const original = {
      type: "original",
      name: name,
      price: price,
      year: year,
      additionalInfo: filteredInfo,
      size: size,
      images: filteredImages,
      qty: qty,
      id: id,
    };
    try {
      const result = await useUploadOriginal(original);
      if (!result.status) {
        throw new Error(result.message);
      }
      setLoading(false);
      setUploadOk(true);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  }

  return (
    <Modal>
      <form
        className="relative flex w-[600px] flex-col gap-2 rounded-lg bg-white px-6 py-4"
        encType="multipart/form-data"
        method="POST"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          uploadOriginal();
        }}
      >
        {loading && (
          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-white bg-opacity-80">
            <img src={spinner} />
          </div>
        )}
        {uploadOk && (
          <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center rounded-lg bg-white bg-opacity-90">
            <p className="tracking-wider">Original uploaded successfully</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
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
            className={`w-[250px] rounded-sm border border-gray-500 px-1 transition duration-500 ${
              name ? "bg-green-100" : "bg-red-100"
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
              className={`w-24 rounded-sm border border-gray-500 px-1 transition duration-500 ${
                price ? "bg-green-100" : "bg-red-100"
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
            className={`w-24 rounded-sm border border-gray-500 px-1 transition duration-500 ${
              year ? "bg-green-100" : "bg-red-100"
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
            className={`w-[250px] rounded-sm border border-gray-500 px-1 transition duration-500 ${
              additionalInfo1 ? "bg-green-100" : "bg-red-100"
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
            className="w-[250px] rounded-sm border border-gray-500 px-1"
            onChange={(e) => setAdditionalInfo2(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="size">Size:</label>
          <input
            id="size"
            className={`w-[250px] rounded-sm border border-gray-500 px-1 transition duration-500 ${
              size ? "bg-green-100" : "bg-red-100"
            }`}
            onChange={(e) => setSize(e.target.value)}
          ></input>
        </div>
        <div className="flex justify-between">
          <label
            htmlFor="image1"
            className="flex w-1/2 items-center justify-between tracking-wider"
          >
            <p className="w-1/2">Image 1:</p>
            <div className="flex w-1/2 justify-center">
              <div className="flex h-8 w-24 items-center justify-center rounded-lg bg-sky-500 shadow-lg hover:cursor-pointer">
                <p className="text-xs tracking-widest text-white">ADD FILE</p>
              </div>
            </div>
          </label>
          <input
            className="my-auto w-0"
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
            className={`flex h-16 w-16 justify-center rounded-lg transition duration-500 ${
              image1 === null && "bg-red-100"
            }`}
          >
            {image1 != null && (
              <img src={image1} className="my-auto h-16 rounded-lg border" />
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
        <div className="flex justify-between">
          <label
            htmlFor="image2"
            className="flex w-1/2 items-center justify-between tracking-wider"
          >
            <p className="w-1/2">Image 2:</p>
            <div className="flex w-1/2 justify-center">
              <div className="flex h-8 w-24 items-center justify-center rounded-lg bg-sky-500 shadow-lg hover:cursor-pointer">
                <p className="text-xs tracking-widest text-white">ADD FILE</p>
              </div>
            </div>
          </label>
          <input
            className="my-auto w-0"
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
            className={`flex h-16 w-16 justify-center rounded-lg transition duration-500 ${
              image2 === null && "bg-gray-200"
            }`}
          >
            {image2 != null && (
              <img src={image2} className="my-auto h-16 rounded-lg border" />
            )}
          </div>
          <button
            disabled={image2 === null}
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
        <div className="flex justify-between">
          <label
            htmlFor="image3"
            className="flex w-1/2 items-center justify-between tracking-wider"
          >
            <p className="w-1/2">Image 3:</p>
            <div className="flex w-1/2 justify-center">
              <div className="flex h-8 w-24 items-center justify-center rounded-lg bg-sky-500 shadow-lg hover:cursor-pointer">
                <p className="text-xs tracking-widest text-white">ADD FILE</p>
              </div>
            </div>
          </label>
          <input
            className="my-auto w-0"
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
            className={`flex h-16 w-16 justify-center rounded-lg transition duration-500 ${
              image3 === null && "bg-gray-200"
            }`}
          >
            {image3 != null && (
              <img src={image3} className="my-auto h-16 rounded-lg border" />
            )}
          </div>
          <button
            disabled={image3 === null}
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
          <label htmlFor="qty" className="tracking-wider">
            Quantity:
          </label>
          <input
            min={1}
            id="qty"
            type="number"
            className={`w-24 rounded-sm border border-gray-500 px-1 transition duration-500 ${
              qty ? "bg-green-100" : "bg-red-100"
            }`}
            onChange={(e) => {
              setQty(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="id" className="tracking-wider">
            Id:
          </label>
          <input
            id="id"
            type="text"
            className={`w-[250px] rounded-sm border border-gray-500 px-1 transition duration-500 ${
              id ? "bg-green-100" : "bg-red-100"
            }`}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={props.closeModal}
            className="h-9 w-1/4 rounded-lg bg-gray-500 text-lg tracking-widest text-white shadow-lg"
          >
            CLOSE
          </button>
          <button
            disabled={formDisabled}
            type="submit"
            className="h-9 w-1/4 rounded-lg bg-sky-500 text-lg tracking-widest text-white shadow-lg disabled:opacity-30"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </Modal>
  );
}
