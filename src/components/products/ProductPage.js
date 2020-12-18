import React from "react";
import { Grid } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useStateValue } from "../../StateProvider";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import "./Product.css";
import RelatedProduct from "./RelatedProduct";

const ProductPage = () => {
  let data = useLocation();
  //console.log(data.state.params);
  let product = data.state.params;
  //  console.log(product);
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        tag: product.tag,
        image: product.image,
        feed: product.feed,
        quantity: 1,
      },
    });
    //   console.log(dispatch);
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} className="ProductPage">
          <img
            src="https://copperalliance.eu/uploads/2018/07/salad-bar-header-1400x260.jpg"
            alt="product page ad"
            className="ProductPage_banner"
          />
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={12}>
            <h1
              style={{
                textAlign: "center",
                color: "#255d28",
                fontFamily: "algerian",
                fontWeight: "900px",
                fontSize: "3rem",
              }}
            >
              {`${product.name} (${product.category})`}
            </h1>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img src={product.image} className="ProductPage_image" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="ProductPage_feed">
              <h2>&#8358;{product.price}</h2>
              {product.feed}
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addToBasket}
                  startIcon={<AddShoppingCartIcon />}
                  style={{ marginTop: "20px" }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <div
            style={{
              marginLeft: "100px",
              marginRight: "100px",
              paddingTop: "30px",
            }}
          >
            <hr />
            <h2>You may also like this</h2>
          </div>
          <RelatedProduct product={product} />
        </Grid>
      </Grid>
    </>
  );
};

export default ProductPage;
