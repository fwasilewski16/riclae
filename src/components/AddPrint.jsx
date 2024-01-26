import { useState } from "react";
import Modal from "../UI/Modal";
import useUploadPrint from "../hooks/useUploadPrint";
import useUploadImage from "../hooks/useUploadImage";

import spinner from "../assets/spinner.gif";

export default function AddPrint(props) {
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [additionalInfo1, setAdditionalInfo1] = useState(null);
  const [additionalInfo2, setAdditionalInfo2] = useState(null);
  const [printedArea, setPrintedArea] = useState(null);
  const [printSize, setPrintSize] = useState(null);
  const [image, setImage] = useState(null);
  const [numberedSigned, setNumberedSigned] = useState(null);
  const [qty, setQty] = useState(null);
  const [id, setId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [uploadOk, setUploadOk] = useState(false);

  const formDisabled =
    !name || !price || !printedArea || !printSize || !image || !qty || !id;

  async function uploadPrint() {
    setLoading(true);
    const filteredInfo = [additionalInfo1, additionalInfo2].filter(
      (info) => info != null,
    );
    const print = {
      type: "print",
      name: name,
      price: price,
      additionalInfo: filteredInfo,
      printedArea: printedArea,
      printSize: printSize,
      image: image,
      numberedSigned: numberedSigned,
      qty: qty,
      id: id,
    };
    try {
      const result = await useUploadPrint(print);
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
        className="relative flex w-[600px] flex-col gap-2 rounded-lg bg-white px-8 py-4"
        encType="multipart/form-data"
        method="POST"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          uploadPrint();
        }}
      >
        {loading && (
          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-white bg-opacity-80">
            <img src={spinner} />
          </div>
        )}
        {uploadOk && (
          <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center rounded-lg bg-white bg-opacity-90">
            <p className="tracking-wider">Print uploaded successfully</p>
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
            className={`w-[250px] rounded-sm border border-gray-500 px-2 ${
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
              className={`w-24 rounded-sm border border-gray-500 px-2 ${
                price ? "bg-green-100" : "bg-red-100"
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
            className={`w-[250px] rounded-sm border border-gray-500 px-2 ${
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
            className="w-[250px] rounded-sm border border-gray-500 px-2"
            onChange={(e) => setAdditionalInfo2(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="printedArea">Printed Area:</label>
          <input
            id="printedArea"
            className={`w-[250px] rounded-sm border border-gray-500 px-2 ${
              printedArea ? "bg-green-100" : "bg-red-100"
            }`}
            onChange={(e) => setPrintedArea(e.target.value)}
          ></input>
        </div>
        <div className="flex justify-between">
          <label htmlFor="printSize">Print Size:</label>
          <input
            id="printSize"
            className={`w-[250px] rounded-sm border border-gray-500 px-2 ${
              printSize ? "bg-green-100" : "bg-red-100"
            }`}
            onChange={(e) => setPrintSize(e.target.value)}
          ></input>
        </div>
        <div className="flex justify-between">
          <label
            htmlFor="image"
            className="flex w-1/2 items-center justify-between tracking-wider"
          >
            <p className="w-1/2">Image :</p>
            <div className="flex w-1/2 justify-center">
              <div className="h-7 w-24 rounded-lg bg-blue-500 text-center tracking-widest text-white shadow-lg hover:cursor-pointer">
                ADD FILE
              </div>
            </div>
          </label>
          <input
            className="my-auto w-0"
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
          <label htmlFor="numberedSigned" className="tracking-wider">
            Numbered and signed:
          </label>
          <input
            className={`${numberedSigned ? "bg-green-100" : "bg-red-100"}`}
            type="checkbox"
            id="numberedSigned"
            onChange={(e) => {
              setNumberedSigned((prev) => !prev);
            }}
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="qty" className="tracking-wider">
            Quantity:
          </label>
          <input
            min={1}
            id="qty"
            type="number"
            className={`w-24 rounded-sm border border-gray-500 px-2 ${
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
            className={`w-[250px] rounded-sm border border-gray-500 px-2 ${
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
            className="h-9 w-1/4 rounded-lg bg-blue-500 text-lg tracking-widest text-white shadow-lg disabled:opacity-30"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </Modal>
  );
}
