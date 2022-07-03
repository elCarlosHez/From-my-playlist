import { Header } from "./components/header";
import { Steps } from "./components/steps";
import { TransferPlaylist } from "./components/transfer_playlist/TransferPlaylist";

export const Transfer = (): JSX.Element => {

  return (
    <>
      <Header />
      <section className="px-5">
        <h2 className="pb-10 text-2xl text-center">
          Estamos transfiriendo tu música.
        </h2>
        <Steps activeStep={3} />
        <TransferPlaylist />
      </section>
    </>
  );
};
