import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./Slider.css";

const fadeImages = [
  "https://cdn11.bigcommerce.com/s-45hj43/images/stencil/1280x1280/products/654/3020/FB_81__83777.1424787901.jpg?c=2",
  "https://images.pexels.com/photos/145685/pexels-photo-145685.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://static.onecms.io/wp-content/uploads/sites/37/2020/04/17/tango-oakleaf-lettuce-c6f6417e.jpg",
];

const Slider = () => {
  return (
    <div className="slide-container">
      <Fade>
        <div className="each-fade">
          <div className="image-container">
            <img src={fadeImages[0]} className="slider-image" />
          </div>
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img src={fadeImages[1]} className="slider-image" />
          </div>
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img src={fadeImages[2]} className="slider-image" />
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Slider;
