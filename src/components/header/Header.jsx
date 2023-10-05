import { useState } from "react";
import LangDropIcon from "./LangDropIcon";
import { formTr } from "../../utils/translate";
import { useSelector, useDispatch } from "react-redux";
import { setLang } from "../../store/slices/userSlice";
import { NavLink } from "react-router-dom";
import logo from "../../style/img/logo.png";
import "./header.css";

const Header = () => {
  const languageSlug = useSelector((state) => state.user.lang);
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleLanguageChange = (lang) => {
    dispatch(setLang(lang));
  };

  return (
    <header className="header">
      <div className="header__nav">
        <div className="header__nav__logo">
          <img src={logo} alt="logo" />

          {/* <span className="buttonAndLink ">Basegone</span> */}
        </div>
        <div className="header__nav__account">
          <LangDropIcon
            toggleDropdown={toggleDropdown}
            isOpen={isOpen}
            selectedItem={languageSlug}
            handleLanguageChange={handleLanguageChange}
          />
          <NavLink to="/signin" className="buttonAndLink">
            {formTr.sign[languageSlug]}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
