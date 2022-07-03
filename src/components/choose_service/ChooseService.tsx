import { ServicesList } from "../../types/ServicesList";
import { ServiceButton } from "../service_button";
import { useAppContext } from "../../contexts/AppContext";
import { ServicesListArray } from "../../consts/ServiceListArray";
import { ServiceBGColors } from "../../utils/ServiceBGColors";
import { Steps } from "../../contexts/StepContext";

export const ChooseService = () => {
  const { fetchService, convertService, stepService } = useAppContext();

  const selectAService = (service: ServicesList): void => {
    if(stepService.step === Steps.start){
      fetchService.setService(service);
      fetchService.setPlaylist(null);
      return;
    }

    convertService.setService(service);
    convertService.setPlaylist(null);
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
