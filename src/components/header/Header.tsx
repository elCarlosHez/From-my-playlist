import logo from "../../assets/logo.png";

export const Header = () => {
  return (
    <header className="flex justify-center items-center flex-col">
      <h1>
        <img className="max-w-full" alt="From my music" src={logo} />
      </h1>
    </header>
  );
};
