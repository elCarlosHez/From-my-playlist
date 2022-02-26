import logo from "./assets/logo.png";
import { generateSpotifyUrl } from "./services/spotify";
import "./styles/App.css";

function App() {

  const openSpotifyUrl = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const url = generateSpotifyUrl();
    window.location.href = url;
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <img className="max-w-full mb-5" src={logo} />
      <div className="flex justify-between">
        <button className="btn btn-primary flex-1">
          Link Youtube Music Account
        </button>

        <button onClick={openSpotifyUrl} className="btn btn-secondary flex-1 ml-5">
          Link Spotify Account
        </button>
      </div>
    </div>
  );
}

export default App;
