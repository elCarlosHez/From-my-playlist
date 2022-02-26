import { useEffect } from "react";
import logo from "./assets/logo.png";
import { useSearchParams } from "react-router-dom";
import "./styles/App.css";

const SpotifyView = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Fix url query
    const url: URL = new URL(window.location.href.replace('#', '?'));
    const params: URLSearchParams = url.searchParams;
    setSearchParams(params);
  }, []);

  useEffect(() => {
    
  }, [searchParams]);

  return (
    <div className="flex justify-center items-center flex-col">
      <img className="max-w-full mb-5" src={logo} />
      <div className="flex justify-between">
        <button className="btn btn-primary flex-1">
          Link Youtube Music Account
        </button>

        <button className="btn btn-secondary flex-1 ml-5">
          Link Spotify Account
        </button>
      </div>
    </div>
  );
}

export default SpotifyView;
