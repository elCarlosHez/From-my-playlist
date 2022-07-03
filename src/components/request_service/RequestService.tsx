import { ServicesList } from "../../types/ServicesList";
import { ServiceButton } from "../service_button/ServiceButton";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect, useState } from "react";
import { Modal } from "../modal/Modal";
import { ServiceBGColors } from "../../utils/ServiceBGColors";
import { ChooseService } from "../choose_service/ChooseService";
import { Steps } from "../../contexts/StepContext";

enum RequestServiceStates {
  closed,
  choosing,
  selected,
}

export const RequestService = () => {
  const [state, setState] = useState<RequestServiceStates>(
    RequestServiceStates.closed
  );
  const { fetchService, convertService, stepService } = useAppContext();

  useEffect(() => {
    if (!fetchService.service || stepService.step !== Steps.start) return;
    setState(RequestServiceStates.selected);
  }, [fetchService.service, stepService.step]);

  useEffect(() => {
    if (!convertService.service || stepService.step !== Steps.destiny) return;
    setState(RequestServiceStates.selected);
  }, [convertService.service, stepService.step]);

  const closeWindow = () => {
    setState(RequestServiceStates.closed);
  };

  const openWindow = () => {
    setState(RequestServiceStates.choosing);
  };

  const renderComponent = (): JSX.Element => {
    switch (state) {
      case RequestServiceStates.choosing:
        return (
          <Modal onClose={closeWindow}>
            <ChooseService />
          </Modal>
        );

      case RequestServiceStates.selected:
        if (stepService.step === Steps.start) {
          return (
            <div
              className={`btn-service ${ServiceBGColors(
                fetchService.service as ServicesList
              )}`}
            >
              <ServiceButton
                service={fetchService.service as ServicesList}
                onPress={openWindow}
              />
            </div>
          );
        }
        return (
          <div
            className={`btn-service ${ServiceBGColors(
              convertService.service as ServicesList
            )}`}
          >
            <ServiceButton
              service={convertService.service as ServicesList}
              onPress={openWindow}
            />
          </div>
        );
      case RequestServiceStates.closed:
      default:
        return (
          <button className="btn-big-primary" onClick={openWindow}>
            Selecciona un provedor
          </button>
        );
    }
  };

  return <div className="mt-10">{renderComponent()}</div>;
};
