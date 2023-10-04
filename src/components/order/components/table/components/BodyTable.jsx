import React from "react";

import img_details from "../../../../../style/img/details_icon.png";
import img_delete from "../../../../../style/img/delete.png";

const BodyTable = ({ setModalDetele, setModalDetails, data, columns }) => {
  const showModal = (item, func) => {
    func(() => {
      return {
        visible: true,
        item: item,
      };
    });
  };

  return data.length > 0 ? (
    data.map((item, index) => (
      <tr key={index}>
        {typeof item === "object" &&
          columns.map(({ accessor }, ind) => {
            if (accessor === "details") {
              return (
                <td
                  key={index + ind}
                  onClick={() => showModal(item, setModalDetails)}
                  style={{ cursor: "pointer" }}
                >
                  <img className="table-icon" src={img_details} alt="details" />
                </td>
              );
            }
            if (accessor === "delete") {
              return (
                <td
                  key={index + ind}
                  onClick={() => showModal(item, setModalDetele)}
                  style={{ cursor: "pointer" }}
                >
                  <img className="table-icon" src={img_delete} alt="delete" />
                </td>
              );
            }
            return <td key={index + ind}>{item[accessor]}</td>;
          })}
      </tr>
    ))
  ) : (
    <span className="none_data">None data</span>
  );
};

export default BodyTable;
