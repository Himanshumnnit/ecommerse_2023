import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import { fabric } from "fabric";
import { useNavigate } from "react-router-dom";
function Tshirt() {
  const navigate = useNavigate();
  const [textValue, setTextValue] = useState("");
  const [canvas, setCanvas] = useState(null);
  useEffect(() => {
    // let canvas = new fabric.Canvas("tshirt-canvas");

    const canvas = new fabric.Canvas("tshirt-canvas");
    setCanvas(canvas);
    canvas.setHeight(400);

    function updateTshirtImage(imageURL) {
      fabric.Image.fromURL(imageURL, function (img) {
        img.scaleToHeight(300);
        img.scaleToWidth(300);
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
      });
    }

    document.getElementById("tshirt-color").addEventListener(
      "change",
      function () {
        document.getElementById("tshirt-div").style.backgroundColor =
          this.value;
      },
      false
    );

    document.getElementById("tshirt-design").addEventListener(
      "change",
      function () {
        updateTshirtImage(this.value);
      },
      false
    );

    document.getElementById("tshirt-custompicture").addEventListener(
      "change",
      function (e) {
        var reader = new FileReader();

        reader.onload = function (event) {
          var imgObj = new Image();
          imgObj.src = event.target.result;

          imgObj.onload = function () {
            var img = new fabric.Image(imgObj);
            img.scaleToHeight(300);
            img.scaleToWidth(300);
            canvas.centerObject(img);
            canvas.add(img);
            canvas.renderAll();
          };
        };

        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
      },
      false
    );

    document.addEventListener(
      "keydown",
      function (e) {
        var keyCode = e.keyCode;

        if (keyCode == 46) {
          console.log("Removing selected element on Fabric.js on DELETE key !");
          canvas.remove(canvas.getActiveObject());
        }
      },
      false
    );

    return () => {
      canvas.dispose();
    };
  }, []);

  const addTextToCanvas = () => {
    if (canvas && textValue.trim() !== "") {
      const text = new fabric.Text(textValue, {
        left: 100,
        top: 100,
        fontSize: 20,
        fill: "#000",
      });
      canvas.add(text);
    }
  };

  const handleExportImage = () => {
    var node = document.getElementById("tshirt-div");
    navigate("/dashboard/user/placeorder");
    domtoimage
      .toPng(node)
      .then(function (dataUrl) {
        console.log(dataUrl);

        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        id="tshirt-div"
        style={{
          width: "452px",
          height: "548px",
          marginLeft: "150px",
          marginTop: "80px",
          position: "relative",
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
      >
        <img
          id="tshirt-backgroundpicture"
          src="https://ourcodeworld.com/public-media/gallery/gallery-5d5afd3f1c7d6.png"
          style={{ width: "100%", height: "100%" }} // Adjust image size to fit the container
        />
        <div
          className="drawing-area"
          style={{
            position: "absolute",
            top: "80px",
            left: "126px",
            width: "200px",
            height: "500px",
            // border: "1px solid #ccc",
            overflow: "hidden",
          }}
        >
          <div className="canvas-container">
            <canvas
              id="tshirt-canvas"
              style={{ width: "50%", height: "100%" }}
            ></canvas>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "80px",
          marginLeft: "180px",
          border: "2px solid black",
          boxShadow: "2px 3px ",
          padding: "20px",
        }}
      >
        <h6 style={{ fontWeight: "bold", textDecoration: "underline" }}>
          Note:
        </h6>
        <p style={{ fontWeight: "bold" }}>
          To remove a loaded picture on the T-Shirt select it and press the{" "}
          <kbd>DEL</kbd> key.
        </p>
        <hr />
        <br />
        <label
          htmlFor="tshirt-design"
          style={{ fontWeight: "bold", marginRight: "30px" }}
        >
          T-Shirt Design:
        </label>
        <select id="tshirt-design">
          <option value="">Select one of our designs ...</option>
          <option value="https://ourcodeworld.com/public-media/gallery/gallery-5d5b0e95d294c.png">
            Batman
          </option>
        </select>
        <br />
        <hr />

        <label
          htmlFor="tshirt-color"
          style={{ fontWeight: "bold", marginRight: "30px" }}
        >
          T-Shirt Color:
        </label>
        <select id="tshirt-color">
          <option value="#fff">White</option>
          <option value="#000">Black</option>
          <option value="#f00">Red</option>
          <option value="#008000">Green</option>
          <option value="#ff0">Yellow</option>
        </select>
        <br />
        <hr />

        <div>
          {/* Input field for entering text */}
          <label
            htmlFor="text-input"
            style={{ fontWeight: "bold", marginRight: "30px" }}
          >
            Enter Text:
          </label>
          <input
            type="text"
            id="text-input"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <button
            onClick={addTextToCanvas}
            style={{ fontWeight: "bold", marginRight: "30px" }}
          >
            Add Text
          </button>
        </div>
        <hr />

        <label
          htmlFor="tshirt-custompicture"
          style={{ fontWeight: "bold", marginRight: "30px" }}
        >
          Upload your own design:
        </label>
        <input type="file" id="tshirt-custompicture" />
        <hr />

        <p style={{ fontWeight: "bold" }}>
          Make sure to fill the details and make Payment 👍!!!
        </p>
        <button onClick={handleExportImage}>Place Order</button>
      </div>
    </div>
  );
}

export default Tshirt;
