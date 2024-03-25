import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "./qrcode.jpeg";

import "./placeorder.css";
const Placeorder = () => {
  const navigate = useNavigate();
  const [bulk, setBulkData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    address: "",
    size: "",
    quantity: "",
    prize: 0,
    tshirtimage: "",
    photo: "",
  });

  const handleFileUpload = (e, imageType) => {
    const file = e.target.files[0];
    setBulkData({ ...bulk, [imageType]: file });
    console.log(`Uploaded ${imageType}:`, file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", bulk.name);
      formData.append("contactNumber", bulk.contactNumber);
      formData.append("email", bulk.email);
      formData.append("address", bulk.address);
      formData.append("size", bulk.size);
      formData.append("quantity", bulk.quantity);
      formData.append("prize", bulk.prize);
      formData.append("tshirtimage", bulk.tshirtimage);
      formData.append("photo", bulk.photo);
      console.log(bulk.photo + "this is photo");
      if (
        !bulk.photo ||
        !bulk.tshirtimage ||
        !bulk.name ||
        !bulk.email ||
        !bulk.contactNumber ||
        !bulk.address
      ) {
        window.alert("fill all fields");
        return;
      }
      if (bulk.contactNumber.length != 10) {
        window.alert("write contact number properly images");
        return;
      }
      const res = await axios.post("/api/v1/product/bulkorder", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.alert("Order placed");
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalPrice = (q) => {
    const { size } = bulk;
    let pricePerTshirt = 0;

    // Determine price per T-shirt based on size
    switch (size) {
      case "S":
      case "M":
        pricePerTshirt = 200;
        break;
      case "L":
      case "XL":
        pricePerTshirt = 230;
        break;
      case "XXL":
        pricePerTshirt = 250;
        break;
      default:
        pricePerTshirt = 0;
    }

    // Calculate total price
    const totalPrice = pricePerTshirt * q;
    return totalPrice;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBulkData({ ...bulk, [name]: value });
    if (name === "quantity") {
      const totalPrice = calculateTotalPrice(e.target.value);
      setBulkData({ ...bulk, [name]: value, prize: totalPrice });
    }
  };

  return (
    <>
      <div id="guest-form" style={{ marginTop: "0px" }}>
        <form onSubmit={handleSubmit} action="upload/">
          <h4 className="title" style={{ marginBottom: "20px" }}>
            ❗❗❗ FILL UP DETAILS AND MAKE PAYMENT BELOW 👇🏻
          </h4>
          <div className="mb-3">
            <input
              type="text"
              id="exampleInputName"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              id="exampleInputEmail"
              name="email"
              value={bulk.email}
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              id="exampleInputContactNo"
              name="contactNumber"
              placeholder="Enter your contact number"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              id="exampleInputEmail"
              name="address"
              placeholder="Enter your Address"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            Select Tshirt Size:
            <select
              id="exampleInputTshirtSize"
              name="size"
              onChange={handleChange}
              required
            >
              <option value="">Select T-shirt size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>
          <div className="mb-3">
            <input
              type="number"
              id="exampleInputQuantity"
              name="quantity"
              placeholder="Enter quantity"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              id="exampleInputTotalPrice"
              name="totalPrize"
              value={bulk.prize}
              readOnly
            />
          </div>
        </form>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h4 className="title" style={{ marginBottom: "10px" }}>
            T-Shirt Pricing:
          </h4>
          <ol>
            <li>T-Shirt (S/M):(Price: ₹200 per Tshirt )</li>
            <li>T-Shirt (L/XL): (Price: ₹230 per Tshirt )</li>
            <li>T-Shirt (XXL): (Price: ₹250 per Tshirt )</li>
          </ol>
        </div>

        {/* yeh tshirt photo hai */}
        <label htmlFor="file-upload" className="custom-file-upload">
          <img src={bulk.tshirtimage} alt="" />
        </label>
        <input
          type="file"
          label="Image"
          name="tshirtimage"
          id="file-upload"
          accept=".jpeg, .png, .jpg"
          onChange={(event) => handleFileUpload(event, "tshirtimage")}
        />
        <label htmlFor="file-upload" className="custom-file-upload">
          <img src={bulk.photo} alt="" />
        </label>
        <input
          type="file"
          label="Image"
          name="photo"
          id="file-upload"
          accept=".jpeg, .png, .jpg"
          onChange={(event) => handleFileUpload(event, "photo")}
        />

        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {/* Image */}
        <img
          src={image}
          alt="Description"
          style={{
            display: "block",
            margin: "0 auto",
            height: 200,
            width: 200,
          }}
        />
      </div>
    </>
  );
};

export default Placeorder;
