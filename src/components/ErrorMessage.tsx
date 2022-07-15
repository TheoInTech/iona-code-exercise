import "styles/ErrorMessage.scss";
import Alert from "react-bootstrap/Alert";

function ErrorMessage() {
  return (
    <div className="error">
      <Alert variant="danger">
        Apologies but we could not load new cats for you at this time! Miau!
      </Alert>
    </div>
  );
}

export default ErrorMessage;
