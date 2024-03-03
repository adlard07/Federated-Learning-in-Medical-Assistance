import React, { useState } from "react";
import "../Styles/dashboard.css";
import Axios from "axios";
import Header from "../Components/header/header";

function HomePage() {
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const selectedDisease = document.getElementById("language").value;
    const image = document.querySelector('input[type="file"]').files[0];

    formData.append("disease", selectedDisease);
    formData.append("image", image);

    try {
      const response = await Axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      setResponseMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An error occurred while processing your request.");
    }
  };

  return (
    <div className="App">
      <div className="content">
        <Header />
        <div className="left-section">
          <label htmlFor="language" style={{ color: "#fff" }}>
            Select disease
          </label>
          <div className="space">
            <select name="language" id="language">
              <option value="brain_tumor">Brain Tumor</option>
              <option value="breast_cancer">Breast Cancer</option>
              <option value="fracture">Fracture</option>
              <option value="kidney">Kidney</option>
              <option value="pneumonia">Pneumonia</option>
            </select>
          </div>
        </div>
        <br></br>
        <br></br>
        <div className="right-section">
          <div className="card">
            <div className="card-body">
              <h2>Upload Image</h2>
              <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" />
                <button className="button" type="submit">Submit</button>
              </form>
              {responseMessage && (
                <p>
                  Response: {responseMessage}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
      </div>
    </div>
  );
}

export default HomePage;
