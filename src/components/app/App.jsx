import User from "../user/User";
import SignIn from "../SignIn/SignIn";
import Order from "../order/Order";
import { Route, Routes, Navigate } from "react-router-dom";
import "./app.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/order" element={<Order />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
};
export default App;
