import React from "react";
import InputMask from "react-input-mask";
const FilterInputs = ({ name, dataInput, onChangeData }) => {
  if (name === "date") {
    return (
      <>
        <InputMask
          mask="99-99"
          id="dateMin"
          name="dateMin"
          value={dataInput.dateMin}
          placeholder="dd-mm"
          onChange={(e) => onChangeData(e.target.name, e.target.value)}
        />

        <div className="mobile_date">to</div>
        <InputMask
          mask="99-99"
          id="dateMax"
          name="dateMax"
          value={dataInput.dateMax}
          placeholder="dd-mm"
          onChange={(e) => onChangeData(e.target.name, e.target.value)}
        />
      </>
    );
  }
  return (
    <input
      name={name}
      type="text"
      value={dataInput[name]}
      onChange={(e) => onChangeData(e.target.name, e.target.value)}
    />
  );
};

export default FilterInputs;
