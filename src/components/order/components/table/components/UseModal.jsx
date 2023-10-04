import React from "react";

import "./useModalDelete.css";

const UseModal = ({
  visible,
  title = "",
  content = "",
  footer = "",
  onClose,
}) => {
  if (visible)
    return (
      <div className="modal" onClick={onClose}>
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            <span className="modal-close"></span>
          </div>
          <div className="modal-body">
            <div className="modal-content">{content}</div>
          </div>
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    );
};

export default UseModal;
