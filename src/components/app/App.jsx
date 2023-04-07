import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../header/Header";
import Users from "../users/Users";
import FormSingUp from "../form/FormSingUp";
import SuccessForm from "../form/components/SuccessForm";

import "./app.css";

const App = () => {
  const [refUsers, setRefUsers] = useState();
  const submit = useSelector((state) => state.employee.submit);

  return (
    <>
      <Header />
      <Users setRefUsers={setRefUsers} />
      {submit ? <FormSingUp refUsers={refUsers} /> : <SuccessForm />}
    </>
  );
};
export default App;
