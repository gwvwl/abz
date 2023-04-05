import React from "react";
import success_img from "../../../style/img/success-image.png";
const SuccessForm = () => {
  return (
    <div className="success">
      <div className="success_text">User successfully registered</div>
      <img className="success_img" src={success_img} alt="success submit" />
    </div>
  );
};

export default SuccessForm;
