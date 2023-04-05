import { useState } from "react";
import Header from "../header/Header";
import Users from "../users/Users";
import FormSingUp from "../form/FormSingUp";

import "./app.css";

const App = () => {
  const [refUsers, setRefUsers] = useState();

  return (
    <>
      <Header />
      <Users setRefUsers={setRefUsers} />
      <FormSingUp refUsers={refUsers} />
    </>
  );
};
export default App;
