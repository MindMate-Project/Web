import React from "react";
import "./UpdatedSuccessfully.css";

const SuccessModal = ({ isOpen, onContinue }) => {
  if (!isOpen) return null;

  return (
    <div className="success-overlay">
      <div className="success-modal">

        <div className="success-circle">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g fill="none" fillRule="evenodd">
                <circle cx="16" cy="16" fill="#63BD76" r="16"></circle>
                <path
                  d="M12.136 15.966l3.482 3.493 9.13-9.191L26 11.538 15.618 22l-4.735-4.763zm2.11-.31L19.864 10l1.253 1.27-5.617 5.66zm-2.276 4.83l-1.236 1.246L6 16.97l1.251-1.27z"
                  fill="#ffffff"
                  fillRule="nonzero"
                ></path>
              </g>
            </g>
          </svg>
        </div>

        <p>Updated successfully</p>

        <button className="continue-btn" onClick={onContinue}>
          Continue
        </button>

      </div>
    </div>
  );
};

export default SuccessModal;