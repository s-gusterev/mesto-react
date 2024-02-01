import logo from "../images/logo.svg";
import "../index.css";

const Header = () => {
  return (
    <header className="header root__header">
      <a href="./index.html" className="logo header__logo">
        <img src={logo} alt="Логотип" className="logo__img" />
      </a>
    </header>
  );
};

export default Header;
