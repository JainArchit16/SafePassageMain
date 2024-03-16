import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./Details";
import Reject from "./Reject";
import image from "../assets/upload_image.png";
import { BiCloudUpload } from "react-icons/bi";
import upload from "../assets/upload.png";
import { useNavigate, useParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import axios from "axios";

const Scan = () => {
  const { email: routeEmail } = useParams();
  const [previewUrl, setPreviewUrl] = useState(upload);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
  const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;
  const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
  const [userData, setData] = useState({});
  const [emaily, setEmail] = useState(routeEmail);
  const [location, setLocation] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchUserData = async (mail) => {
    if (mail) {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userDataArray = querySnapshot.docs.map((doc) => doc.data());
        console.log(emaily);
        const userWithUid = userDataArray.find((user) => user.email === emaily);
        console.log(userWithUid);
        setData(userWithUid);
      } catch (error) {
        console.error("Error fetching account type:", error.message);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUserData(emaily);
  }, [emaily]);
  useEffect(() => {
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);
            setLocation({ latitude, longitude });
          },

          function (error) {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                console.error("User denied the request for Geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
              case error.UNKNOWN_ERROR:
                console.error("An unknown error occurred.");
                break;
            }
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, []);
  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      if (1) {
        if (imageFile) {
          console.log(userData);
          const PARAMS = {
            email: emaily,
            date: Date.now(),
            time: Date.now(),
            carNumber: userData?.carNumb,
            carModel: userData?.model,
            latitude: location.latitude,
            longitude: location.longitude,
          };
          const response = await axios.post(
            "https://safepassage-mail.onrender.com/api/v1/mail/sendMail",
            PARAMS
          );

          console.log(response);
          navigate("/details/" + emaily);
        } else {
          console.log("No file selected");
        }
      } else navigate("/reject");
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center p-4 lg:flex-row">
      <div className="text-white lg:w-1/2 mx-12">
        <ul className="list-disc">
          <li className="my-6">
            <strong>Image Upload Feature : </strong>
            <span>
              This is a feature on the website that allows you to upload images
              for scanning via an advanced AI system.
            </span>
          </li>
          {/* Add more list items as needed */}
        </ul>
      </div>

      <div className="flex flex-col gap-8 items-center justify-between lg:w-1/3 mx-20">
        <img
          src={previewUrl}
          alt="xyz"
          className="aspect-square w-full lg:w-2/3 object-cover"
        />

        <div className="text-white bg-[#161D29] p-4 rounded-lg w-full">
          <p className="text-lg my-1">Upload Car Picture</p>
          <div className="flex flex-col gap-4 mt-2 lg:flex-row lg:items-center lg:gap-8">
            <button
              className="py-2 bg-richblack-700 text-[#C5C7D4] rounded-lg px-4 font-semibold"
              onClick={() => fileInputRef.current.click()}
            >
              Select
            </button>
            <button
              className="flex flex-row gap-2 items-center text-black bg-yellow-50 rounded-lg px-4 py-2 font-semibold"
              onClick={handleFileUpload}
            >
              <p>Upload</p>
              <BiCloudUpload className="text-lg" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/png, image/gif, image/jpeg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;
