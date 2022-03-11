import { Link } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

export const NextPage = (): JSX.Element | null => {
  const { playlist } = useAppContext().fetchService;

  return playlist ? <Link className="btn-primary text-center my-3 block" to="/">Continuar</Link> : null;
};
