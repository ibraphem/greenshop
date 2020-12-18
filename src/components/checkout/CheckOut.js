import React from "react";
import CheckOutButton from "./CheckOutButton";
import { usePaystackPayment } from "react-paystack";

const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log("closed");
};

const CheckOut = () => {
  const config = {
    reference: new Date().getTime(),
    email: "user@example.com",
    amount: 20000,
    publicKey: "pk_test_0771d7e4094956f3747fad03b45bbc61875d5d59",
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <CheckOutButton
      onClick={() => {
        initializePayment(onSuccess, onClose);
      }}
    />
  );
};

export default CheckOut;
