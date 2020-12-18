import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useStateValue } from "../../StateProvider";

const Qty = ({ quantity, id }) => {
  const [count, setCount] = useState(quantity);
  const [{ basket }, dispatch] = useStateValue();

  const updateBasket = (e) => {
    console.log(e.target.value);
    dispatch({
      type: "UPDATE_BASKET",
      item: {
        id: id,
        quantity: e.target.value,
      },
    });
  };

  console.log(id);

  return (
    <TextField
      type="number"
      variant="outlined"
      value={quantity}
      minValue="1"
      onChange={updateBasket}
      style={{ width: "90px" }}
      InputProps={{ inputProps: { min: 1 } }}
    />
  );
};

export default Qty;
