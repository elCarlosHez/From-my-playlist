import { ServicesList } from "../../types/ServicesList";
import { ServiceButton } from "../service_button/ServiceButton";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect, useState } from "react";
import { Modal } from "../modal/Modal";
import { ServiceBGColors } from "../../utils/ServiceBGColors";
import { ChooseService } from "../choose_service/ChooseService";

enum RequestServiceStates {
  closed,
  choosing,
  selected,
}

export const RequestService = () => {
  const [state, setState] = useState<RequestServiceStates>(
    RequestServiceStates.closed
  );
  const { service } = useAppContext().fetchService;

  useEffect(() => {
    if (!service) return;
    setState(RequestServiceStates.selected);
  }, [service]);

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
        return (
          <div
            className={`btn-service ${ServiceBGColors(
              service as ServicesList
            )}`}
          >
            <ServiceButton
              service={service as ServicesList}
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
