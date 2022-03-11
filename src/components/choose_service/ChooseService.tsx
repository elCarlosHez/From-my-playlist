import { ServicesList } from "../../types/ServicesList";
import { ServiceButton } from "../service_button/ServiceButton";
import { useAppContext } from "../../contexts/AppContext";
import { ServicesListArray } from "../../consts/ServiceListArray";
import { ServiceBGColors } from "../../utils/ServiceBGColors";

export const ChooseService = () => {
  const { setService, setPlaylist } = useAppContext().fetchService;

  const selectAService = (service: ServicesList): void => {
    setService(service);
    setPlaylist(null);
  };

  return (
    <ul className="p-0 flex flex-col mt-24 overflow-y-auto">
      {ServicesListArray.map((service) => {
        return (
          <li
            key={`${service}-item`}
            className={`btn-service ${ServiceBGColors(service)}`}
          >
            <ServiceButton
              service={service}
              onPress={() => selectAService(service)}
            />
          </li>
        );
      })}
    </ul>
  );
};
