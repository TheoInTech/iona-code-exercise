import "styles/Loader.scss";
import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <div className="loader-wrapper" id="loading">
      <Spinner animation="grow" variant="primary" className="loader" />
    </div>
  );
}

export default Loader;
