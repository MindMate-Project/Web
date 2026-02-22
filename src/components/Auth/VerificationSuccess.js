import "./VerificationStatus.css";

function VerificationStatus({
  status = "success", // success | error
  title,
  message,
  buttonText,
  onButtonClick,
  secondButtonText,
  onSecondButtonClick
}) {
  return (
    <div className="verification-page">
      <div className="verification-card">

        <div className={`icon ${status}`}>
          {status === "success" ? "✓" : "✕"}
        </div>

        <h2 className={status}>{title}</h2>

        <p className="message">{message}</p>

        <button 
          className="primary-btn"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>

        {secondButtonText && (
          <button 
            className="secondary-btn"
            onClick={onSecondButtonClick}
          >
            {secondButtonText}
          </button>
        )}

      </div>
    </div>
  );
}

export default VerificationStatus;
