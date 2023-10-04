import React from "react";
import UseModal from "./UseModal";

const ModalDetails = ({ modalState, onClose }) => {
  return (
    <UseModal
      visible={modalState.visible}
      title="Datails :"
      content={
        modalState.item && (
          <div className="modal_del_content">
            <p> {modalState.item.details}</p>
          </div>
        )
      }
      footer={<></>}
      onClose={onClose}
    />
  );
};

export default ModalDetails;
