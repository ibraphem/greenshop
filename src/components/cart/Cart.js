import React from "react";
import { Grid, Paper, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import Tooltip from "@material-ui/core/Tooltip";
import { getBasketTotal } from "../../Reducer";
import { useStateValue } from "../../StateProvider";
import "./cart.css";
import Qty from "./Qty";
import CheckOutButton from "../checkout/CheckOutButton";

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "auto",
  },
  table: {
    width: "100%",
  },
  cancel: {
    color: "#FF0000",
  },
  card: {
    margin: "20px",
    width: "80%",
    marginLeft: "10%",
    marginRight: "10%",
  },
}));

const Cart = () => {
  const classes = useStyles();
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = (e) => {
    let id = e.currentTarget.value;
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} className="ProductPage">
        <img
          src="https://www.crushpixel.com/big-static15/preview4/wide-horizontal-healthy-eating-background-2129980.jpg"
          alt="product page ad"
          className="cart_banner"
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <h1
          style={{
            textAlign: "center",
            color: "#255d28",
            fontFamily: "algerian",
            fontWeight: "900px",
            fontSize: "3rem",
            padding: 0,
          }}
        >
          SHOPPING CART
        </h1>
      </Grid>
      <Card className={classes.card}>
        {basket?.length > 0 ? (
          <Grid item xs={12} sm={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h2 style={{ color: "#255d28" }}>IMAGE</h2>
                    </TableCell>
                    <TableCell align="center">
                      <h2 style={{ color: "#255d28" }}>NAME</h2>
                    </TableCell>
                    <TableCell align="center">
                      <h2 style={{ color: "#255d28" }}>PRICE</h2>
                    </TableCell>
                    <TableCell align="center">
                      <h2 style={{ color: "#255d28" }}>QTY</h2>
                    </TableCell>
                    <TableCell align="center">
                      <h2 style={{ color: "#255d28" }}>SUBTOTAL</h2>
                    </TableCell>
                    <TableCell align="center">&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {basket.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row" align="center">
                        <img src={item.image} className="cart_image" />
                      </TableCell>
                      <TableCell align="center">
                        <h3>{item.name}</h3>
                      </TableCell>
                      <TableCell align="right">
                        <h3>&#8358;{item.price}</h3>
                      </TableCell>
                      <TableCell align="center">
                        <Qty quantity={item.quantity} id={item.id} />
                      </TableCell>
                      <TableCell align="center">
                        <h3>&#8358;{item.quantity * parseInt(item.price)}</h3>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Remove from cart">
                          <IconButton
                            edge="end"
                            aria-label="remove"
                            value={item.id}
                            onClick={removeFromBasket}
                          >
                            <CancelIcon className={classes.cancel} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell rowSpan={3} />
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>
                      <h1>TOTAL</h1>
                    </TableCell>
                    <TableCell align="right">
                      <h1>&#8358;{getBasketTotal(basket)}</h1>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={3}>
                      <CheckOutButton />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : (
          <Grid item xs={12} sm={12}>
            <h1
              style={{
                textAlign: "center",
              }}
            >
              Your cart is empty
            </h1>
          </Grid>
        )}
      </Card>
    </Grid>
  );
};

export default Cart;
