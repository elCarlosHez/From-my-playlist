import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { Steps } from "../../contexts/StepContext";

export const NextPage = (): JSX.Element | null => {
  const { playlist } = useAppContext().fetchService;
  const { stepService } = useAppContext();
  //const navigate = useNavigate();

  const nextPage = () => {
    stepService.setStep(Steps.destiny);
    //navigate('/select-destiny');
  }

  return playlist ? <a className="btn-primary text-center my-3 block" onClick={nextPage}>Continuar</a> : null;
};
