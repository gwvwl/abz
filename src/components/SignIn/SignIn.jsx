import React from "react";
import { signIn } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./SignIn.css";

const SignIn = () => {
  const dispatch = useDispatch();
  //   const errorSignIn = useSelector((state) => state.user.error);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        login: "",
        password: "",
      }}
      validationSchema={Yup.object({
        password: Yup.string().required("Enter password!"),
        login: Yup.string().required("Enter login!"),
      })}
      onSubmit={async (body) => {
        const req = await dispatch(signIn(body));
        if (req.payload === 200) navigate("/order");
      }}
    >
      <div className="wrapper_signin">
        <h1 className="head">Sign In</h1>
        {/* {errorSignIn ? <div>Wrong password or login</div> : ""} */}
        <ErrorMessage name="login" className="error user" component="div" />

        <Form className="signin">
          <Field
            className="user"
            type="text"
            placeholder="Enter login"
            name="login"
          />

          <Field
            className="pass"
            type="password"
            placeholder="Enter password"
            name="password"
          />

          <button type="submit">&#xf0da;</button>
        </Form>
        <ErrorMessage
          name="password"
          className="error password"
          component="div"
        />
      </div>
    </Formik>
  );
};

export default SignIn;
