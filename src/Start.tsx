import { GiveAccess } from "./components/give_access";
import { Header } from "./components/header";
import { NextPage } from "./components/next_page";
import { RequestPlaylist } from "./components/request_playlist";
import { RequestService } from "./components/request_service";
import { Steps } from "./components/steps";

export const Start = () => {
  return (
    <>
      <Header />
      <section className="px-5">
        <h2 className="pb-10 text-2xl text-center">Selecciona a tu proveedor</h2>
        <Steps activeStep={1} />
        <RequestService />
        <GiveAccess />
        <RequestPlaylist />
        <NextPage />  
      </section>
    </>
  );
};
