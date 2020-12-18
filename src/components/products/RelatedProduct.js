import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import JSON from "../../db.json";
import ProductCard from "./ProductCard";

const RelatedProduct = ({ product }) => {
  let settings_3 = {
    dots: false,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };
  const [shop, setShop] = useState(JSON);
  const [category, setCategory] = useState([]);

  const related = () => {
    let relatedCategory = shop.filter((cat) => {
      //   console.log(cat.category);
      if (cat.id !== product.id) {
        return cat.category.indexOf(product.category) > -1;
      }
    });
    setCategory(relatedCategory);
  };

  useEffect(() => {
    related();
  }, []);

  return (
    <Slider {...settings_3}>
      {category.map((cat) => (
        <Grid item xs={12} sm={12} key={cat.id}>
          <ProductCard product={cat} />
        </Grid>
      ))}
    </Slider>
  );
};

export default RelatedProduct;
