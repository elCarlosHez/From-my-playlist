import { ServicesList } from "../types/ServicesList";

export const ServiceBGColors = (service: ServicesList) => {
  switch (service) {
    case ServicesList.Spotify:
      return 'bg-green-500';
    case ServicesList.YTMusic:
      return 'bg-red-700';
    case ServicesList.Deezer:
      return 'bg-slate-50';
    default:
      return '';
  }
}
