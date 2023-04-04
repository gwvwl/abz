import logo from "../../style/img/Logo.png";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__nav">
        <div className="header__nav__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="header__nav__account">
          <a href="#users" className="buttonAndLink">
            Users
          </a>
          <a href="#formFocus" className="buttonAndLink">
            Sign up
          </a>
        </div>
      </div>
      <div className="header__promo-wraper">
        <div className="header__promo">
          <div className="header__promo__top">
            Test assignment for front-end developer
          </div>
          <div className="header__promo__bottom">
            What defines a good front-end developer is one that <br />
            has skilled knowledge of HTML, CSS, JS with a vast understanding of
            User design thinking as they'll be building web interfaces with
            accessibility in mind. <br />
            They should also be excited to learn, as the world of <br />
            Front-End Development keeps evolving.
          </div>
          <a href="#formFocus" className="form__submit buttonAndLink">
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
