import React from "react";
import UseModal from "./UseModal";

const ModalDelete = ({ modalDeleteState, onCloseDelete, getDeleteModal }) => {
  return (
    <UseModal
      visible={modalDeleteState.visible}
      title="Confirm deletion"
      content={
        modalDeleteState.item && (
          <div className="modal_del_content">
            <p>Date : {modalDeleteState.item.date},</p>
            <p>Full name : {modalDeleteState.item.name},</p>
            <p>Type : {modalDeleteState.item.type},</p>
            <p>Phone : {modalDeleteState.item.phone},</p>
            <p>Customs : {modalDeleteState.item.customs} .</p>
          </div>
        )
      }
      footer={
        <>
          <button onClick={onCloseDelete}>Exit</button>
          <button onClick={getDeleteModal}>Confirm</button>
        </>
      }
      onClose={onCloseDelete}
    />
  );
};

export default ModalDelete;
