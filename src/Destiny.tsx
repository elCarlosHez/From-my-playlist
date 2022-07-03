import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiveAccess } from "./components/give_access";
import { Header } from "./components/header";
import { RequestService } from "./components/request_service";
import { Steps } from "./components/steps";
import { useAppContext } from "./contexts/AppContext";
import { Steps as StepsStates } from "./contexts/StepContext";

export const Destiny = (): JSX.Element => {
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const { convertService, stepService } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(convertService.service) setShowNextButton(true);
  }, [convertService.service])

  const goToNextPage = (): void => {
    stepService.setStep(StepsStates.transfer);
    navigate('/transfer');
  }

  return (
    <>
      <Header />
      <section className="px-5">
        <h2 className="pb-10 text-2xl text-center">
          Selecciona tu servicio destino
        </h2>
        <Steps activeStep={2} />
        <RequestService />
        <GiveAccess />
        { showNextButton ? <a className="btn-primary" onClick={goToNextPage}>Transferir mi música</a> : null }
      </section>
    </>
  );
};
