import React from "react";
import success_img from "../../../style/img/success-image.png";
import { useDispatch } from "react-redux";
import { setSubmit } from "../../../store/slices/orderSlice";
const SuccessForm = () => {
  const dispatch = useDispatch();
  return (
    <div className="success">
      <div className="success_text">Order successfully registered</div>
      <img className="success_img" src={success_img} alt="success submit" />
      <button
        className="form__submit buttonAndLink"
        onClick={() => dispatch(setSubmit(false))}
      >
        Return
      </button>
    </div>
  );
};

export default SuccessForm;
