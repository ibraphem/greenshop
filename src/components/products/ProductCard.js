import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../../StateProvider";

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

const ProductCard = ({ product }) => {
  const classes = useStyles();

  /*  const [quantity, setQuantity] = useState(1); */
  const [{ basket }, dispatch] = useStateValue();

  //  console.log(basket);

  const addToBasket = (e) => {
    let items = e.currentTarget.value;
    let cartProduct = items.split(",").map(String);

    /*  if (basket?.length > 0) {
      basket.filter((bask) => {
        if (bask.id.indexOf(cartProduct[0])) {
          setQuantity(quantity + 1);
        }
      });
    } */

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
  };

  return (
    <Card className={classes.card}>
      <Link
        to={{
          pathname: `/${product.category}/${product.name}`,
          state: {
            params: {
              id: product.id,
              name: product.name,
              category: product.category,
              price: product.price,
              tag: product.tag,
              feed: product.feed,
              image: product.image,
            },
          },
        }}
        style={{ textDecoration: "none", color: "#255d28" }}
      >
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              style={{
                backgroundColor: `${product.tag === "Hot" ? "red" : "#255d28"}`,
              }}
            >
              {product.tag}
            </Avatar>
          }
          title={product.name}
          classes={{
            title: classes.headerTitle,
          }}
          subheader={product.category}
        />
        <CardMedia className={classes.media} image={product.image} />
      </Link>

      <CardActions disableSpacing>
        <span className={classes.price}> &#8358;{product.price}</span>
        <Tooltip title="Add to cart">
          <IconButton
            aria-label="add to cart"
            onClick={addToBasket}
            value={[
              product.id,
              product.name,
              product.category,
              product.price,
              product.tag,
              product.image,
              product.feed,
            ]}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="view product">
          <Link
            to={{
              pathname: `/${product.category}/${product.name}`,
              state: {
                params: {
                  id: product.id,
                  name: product.name,
                  category: product.category,
                  price: product.price,
                  tag: product.tag,
                  feed: product.feed,
                  image: product.image,
                },
              },
            }}
            style={{ textDecoration: "none", color: "#255d28" }}
          >
            <IconButton aria-label="view product">
              <VisibilityIcon />
            </IconButton>
          </Link>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
