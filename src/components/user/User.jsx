import React from "react";
import { useSelector } from "react-redux";
import FormCreateOrder from "../form/FormCreateOrder";
import Header from "../header/Header";
import SuccessForm from "../form/components/SuccessForm";

const User = () => {
  const submit = useSelector((state) => state.order.submit);
  return (
    <>
      <Header />
      {!submit ? <FormCreateOrder /> : <SuccessForm />}
    </>
  );
};

export default User;
