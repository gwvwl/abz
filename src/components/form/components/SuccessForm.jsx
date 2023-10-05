import React from "react";
import { formTr } from "../../../utils/translate";
import success_img from "../../../style/img/success-image.png";
import { useDispatch, useSelector } from "react-redux";
import { setSubmit } from "../../../store/slices/orderSlice";
const SuccessForm = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.user.lang);

  return (
    <div className="success">
      <div className="success_text">{formTr.success[lang]}</div>
      <img className="success_img" src={success_img} alt="success submit" />
      <button
        className="form__submit buttonAndLink"
        onClick={() => dispatch(setSubmit(false))}
      >
        {formTr.return[lang]}
      </button>
    </div>
  );
};

export default SuccessForm;
