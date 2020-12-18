import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProductCard from "./ProductCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    margin: "20px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    fontSize: "15px",
  },
  headerTitle: {
    fontWeight: 700,
    fontSize: "1rem",
  },
  price: {
    color: "#fff",
    backgroundColor: "#4caf50",
    padding: "8px",
    borderRadius: "7px",
    fontWeight: 600,
  },
}));

const Product = ({ products }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container style={{ padding: "0px, 80px, 80px, 0px" }}>
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
            GREEN SHOPPING
          </h1>
        </Grid>
        {products.map((product) => (
          <Grid item xs={6} sm={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Product;
