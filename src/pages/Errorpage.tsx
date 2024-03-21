import "./style/Errorpage.css"; // Import the CSS file for styling

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h2 className="error-heading">Oops! Something went wrong.</h2>
      <p className="error-message">
        We apologize for the inconvenience. Please try again later.
      </p>
      {/* You can add more content or styling here */}
    </div>
  );
};

export default ErrorPage;
