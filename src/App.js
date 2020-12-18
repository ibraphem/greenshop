import React, { useState } from "react";
import { BrowserRouter, Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Product from "./components/products/Product";
import Slider from "./components/slider/Slider";
import ProductPage from "./components/products/ProductPage";
import JSON from "./db.json";
import CheckOut from "./components/checkout/CheckOut";
import Cart from "./components/cart/Cart";

const App = () => {
  const [products, setProducts] = useState(JSON);
  const [filtered, setFiltered] = useState(null);

  const getKeyword = (event) => {
    let keyword = event.target.value.toUpperCase();
    // console.log(keyword);
    if (keyword !== "") {
      let filter = products.filter((product) => {
        let productName = product.name.toUpperCase();
        // console.log(productName);
        return productName.indexOf(keyword) > -1;
      });
      setFiltered(filter);
    } else {
      setFiltered(null);
    }

    //
  };

  // console.log(filtered);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Header keywords={getKeyword} filter={filtered} />
            <Slider />
            <Product products={products} />
          </Route>
          <Route exact path="/:category/:name">
            <Header keywords={getKeyword} filter={filtered} />
            <ProductPage />
          </Route>
          <Route exact path="/checkout">
            <CheckOut />
          </Route>
          <Route exact path="/cart">
            <Header keywords={getKeyword} filter={filtered} />
            <Cart />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
