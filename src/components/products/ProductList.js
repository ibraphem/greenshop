import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { useStateValue } from "../../StateProvider";
import { getBasketTotal } from "../../Reducer";
import { Link } from "react-router-dom";
import CheckOutButton from "../checkout/CheckOutButton";
import { Card } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: 300,
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
  listPrimary: {
    color: "red",
    fontWeight: "100rem",
    fontSize: "1rem",
  },
  card: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const ProductList = ({ search, cartProps }) => {
  // console.log(search);
  const classes = useStyles();

  const [{ basket }, dispatch] = useStateValue();
  const addToBasket = (e) => {
    let items = e.currentTarget.value;
    let cartProduct = items.split(",").map(String);

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: cartProduct[0],
        name: cartProduct[1],
        category: cartProduct[2],
        price: cartProduct[3],
        tag: cartProduct[4],
        image: cartProduct[5],
        feed: cartProduct[6],
        quantity: 1,
      },
    });
    //   console.log(dispatch);
  };

  const removeFromBasket = (e) => {
    let id = e.currentTarget.value;
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  const [style, setStyle] = useState(true);

  return (
    <Card className={classes.card}>
      <List className={classes.root}>
        {search.map((item) => (
          <>
            <ListItem key={item.id}>
              <ListItemAvatar>
                <Avatar>
                  <img src={item.image} className={classes.image} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Link
                    to={{
                      pathname: `/${item.category}/${item.name}`,
                      state: {
                        params: {
                          id: item.id,
                          name: item.name,
                          category: item.category,
                          price: item.price,
                          tag: item.tag,
                          feed: item.feed,
                          image: item.image,
                        },
                      },
                    }}
                    style={{ textDecoration: "none", color: "#ff0000" }}
                  >
                    {item.name}
                  </Link>
                }
                secondary={
                  cartProps ? (
                    <span>
                      {item.quantity} x &#8358;{item.price}
                    </span>
                  ) : (
                    <span>&#8358;{item.price}</span>
                  )
                }
                classes={{
                  primary: classes.listPrimary,
                }}
              />
              <ListItemSecondaryAction>
                {cartProps ? (
                  <Tooltip title="Remove from cart">
                    <IconButton
                      edge="end"
                      aria-label="remove"
                      value={item.id}
                      onClick={removeFromBasket}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Add from cart">
                    <IconButton
                      aria-label="add to cart"
                      onClick={addToBasket}
                      value={[
                        item.id,
                        item.name,
                        item.category,
                        item.price,
                        item.tag,
                        item.image,
                        item.feed,
                      ]}
                    >
                      <AddShoppingCartIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
        {cartProps ? (
          <div style={{ textAlign: "center", padding: "10px" }}>
            <h3>Total: &#8358;{getBasketTotal(basket)}</h3>

            <CheckOutButton buttonStyle={style} />
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ float: "right" }}
              >
                View Cart
              </Button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </List>
    </Card>
  );
};

export default ProductList;
