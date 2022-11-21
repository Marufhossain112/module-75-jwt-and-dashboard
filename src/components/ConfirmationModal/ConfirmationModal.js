import React from "react";

const ConfirmationModal = ({ closeModal, successAction, successButton }) => {
  return (
    <div>
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label
              onClick={successAction}
              htmlFor="confirmation-modal"
              className="btn btn-primary"
            >
              {successButton}
            </label>
            <label
              onClick={closeModal}
              htmlFor="confirmation-modal"
              className="btn"
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
