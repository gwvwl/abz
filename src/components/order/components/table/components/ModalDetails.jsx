import React from "react";
import UseModal from "./UseModal";

const ModalDetails = ({ modalState, onClose }) => {
  return (
    <UseModal
      visible={modalState.visible}
      title="Datails :"
      content={
        modalState.item && (
          <div className="modal_details_content">
            <p>Agency title: {modalState.item.agencyTitle},</p>
            <p>Phone: {modalState.item.phone},</p>
            <p>Details: {modalState.item.details} .</p>
          </div>
        )
      }
      footer={<></>}
      onClose={onClose}
    />
  );
};

export default ModalDetails;
