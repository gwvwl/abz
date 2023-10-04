import flag_en from "./../../style/img/flag_en.png";
import flag_it from "./../../style/img/flag_it.png";
import "./header.css";
const data = [
  { id: 1, label: "English", img: flag_en, target: "en" },
  { id: 2, label: "Italian", img: flag_it, target: "it" },
];

const LangDropIcon = ({
  toggleDropdown,
  selectedItem,
  isOpen,
  handleLanguageChange,
}) => {
  return (
    <div className="lang_dropdown">
      <div className="lang_dropdown-header" onClick={toggleDropdown}>
        <img
          src={data.find((item) => item.target === selectedItem)?.img}
          alt=""
        />
      </div>
      <div className={`lang_dropdown-body ${isOpen && "open"}`}>
        {data.map((item) => (
          <div
            key={item.id}
            className="lang_dropdown-item"
            onClick={() => {
              handleLanguageChange(item.target);
              toggleDropdown();
            }}
            id={item.id.toString()}
          >
            <span>{item.label}</span>
            <img src={item.img} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LangDropIcon;
