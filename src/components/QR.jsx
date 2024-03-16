import React, { useState } from "react";
import QRCode from "react-qr-code";
import { auth } from "../config/firebase";

const QR = () => {
  const [qrvalue, setQRvalue] = useState("");
  const [text, setText] = useState(auth.currentUser.email);

  const handleSubmit = (event) => {
    event.preventDefault();
    setQRvalue("https://safe-passage.vercel.app/scan/" + text);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="text-white mx-auto md:mx-[100px] my-4 md:my-[50px] w-full md:w-[40%] text-lg">
        <ul className="list-disc">
          <li className="my-6">
            <strong>Generate QR Code:</strong>
            <span>
              From your email ID, a QR code containing a link to the scan page
              for your particular email ID will be generated.
            </span>
          </li>
          <li className="my-6">
            <strong>Scan QR Code:</strong>
            <span>Use your device's camera to scan the QR code.</span>
          </li>
          <li className="my-6">
            <strong>Automatic Redirection:</strong>
            <span>
              Once the QR code is scanned, you'll be automatically redirected to
              the scan page associated with your email ID.
            </span>
          </li>
          <li className="my-6">
            <strong>Upload Image:</strong>
            <span>On the scan page, you can upload an image as required.</span>
          </li>
          <li className="my-6">
            <strong>Further Instructions (if any):</strong>
            <span>
              Follow any additional instructions provided on the website, such
              as submitting additional details or waiting for further
              processing.
            </span>
          </li>
        </ul>
      </div>

      <div className="px-4 md:px-16 border border-solid rounded-lg w-full md:w-fit h-[450px] my-4 md:my-[70px] mx-auto md:mx-8">
        <div className="my-10 mx-6">
          <QRCode value={qrvalue} />
        </div>
        <form onSubmit={handleSubmit} className="my-8">
          <button
            type="submit"
            className="text-white border border-blue-500 rounded-lg px-2 py-2 bg-blue-500 mx-4 md:mx-12 my-4"
          >
            Generate QR Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default QR;
