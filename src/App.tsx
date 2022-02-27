import { Link } from "react-router-dom";
import logo from "./assets/logo.png";
import { generateSpotifyUrl } from "./services/Spotify";
import "./styles/App.css";
import { openAuthenticationPopup } from "./utils/openAuthenticationPopup";

function App() {

  return (
    <div className="flex justify-center items-center flex-col">
      <img className="max-w-full mb-5" src={logo} />
      <div className="flex justify-between">
        <button className="btn btn-primary flex-1">
          Link Youtube Music Account
        </button>

        <Link to="/spotify" className="btn btn-secondary flex-1 ml-5">
          Link Spotify Account
        </Link>
      </div>
    </div>
  );
}

export default App;
