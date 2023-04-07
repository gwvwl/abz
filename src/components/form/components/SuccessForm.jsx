import React, { useState, useEffect } from "react";
import success_img from "../../../style/img/success-image.png";
import Explosion from "./Explosion";
const SuccessForm = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  }, []);
  return (
    <div className="success">
      {visible ? (
        <Explosion />
      ) : (
        <>
          <div className="success_text">User successfully registered</div>
          <img className="success_img" src={success_img} alt="success submit" />
        </>
      )}
    </div>
  );
};

export default SuccessForm;
