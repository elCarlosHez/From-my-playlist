import { useEffect, useState } from "react";
import { ServicesList } from "../../types/ServicesList";

interface IServiceButton {
  onPress: () => void;
  service: ServicesList;
}

export const ServiceButton = (props: IServiceButton): JSX.Element => {
  const { onPress, service } = props;
  const [logo, setLogo] = useState("");

  useEffect(() => {
    getLogo();
  }, []);

  const getLogo = async () => {
    const module = await import(`../../assets/brands/${service}.png`);
    const logo = module.default;
    setLogo(logo as string);
  };

  return (
    <button className="h-full w-full py-2" onClick={onPress}>
      <img className="max-h-16 m-auto" src={logo} alt={service} />
    </button>
  );
};
