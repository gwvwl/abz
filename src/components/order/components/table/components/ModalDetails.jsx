import React from "react";
import { useSelector } from "react-redux";
import UseModal from "./UseModal";

const ModalDetails = ({ modalState, onClose }) => {
  const type = useSelector((state) => state.user.data.type);

  return (
    <UseModal
      visible={modalState.visible}
      title="Datails :"
      content={
        modalState.item && (
          <div className="modal_details_content">
            <p>Type: {modalState.item.type},</p>
            {type !== "user" && <p>Phone: {modalState.item.phone},</p>}
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
