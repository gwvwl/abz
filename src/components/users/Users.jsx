import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./users.css";

import {
  getEmployeeList,
  addEmployeeList,
} from "../../store/slices/employeeSlice";

const Users = () => {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee.employee);
  const show = useSelector((state) => state.employee.show);
  const offset = employee.length;

  const showHandle = () => dispatch(addEmployeeList(offset));
  useEffect(() => {
    if (!employee.length) {
      dispatch(getEmployeeList(offset));
    }
  }, [employee]);

  return (
    <div className="main-wraper" id="users">
      <h2>Working with GET request</h2>
      <div className="employee__card">
        {employee.map((item) => {
          return (
            <div className="employee__card__item" key={item.id}>
              <img src={item.photo} alt="photo" />
              <span className="employee-name">{item.name}</span>
              <ul className="employee-promo">
                <li className="employee-promo__position">{item.position}</li>
                <li className="employee-promo__mail">{item.email}</li>
                <li className="employee-promo__number">{item.phone}</li>
              </ul>
            </div>
          );
        })}
      </div>
      {show && (
        <button className="form__submit buttonAndLink" onClick={showHandle}>
          Show more
        </button>
      )}
    </div>
  );
};

export default Users;
