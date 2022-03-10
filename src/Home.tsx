import { Link } from "react-router-dom";
import { Header } from "./components/header/Header";

export const Home = () => (
  <>
    <Header />
    <main className="flex justify-center mb-10 px-5">
      <Link to="/start" className="btn-big-primary">Comenzar</Link>
    </main>
    <section className="px-5">
      <h2 className="mb-5">¿Por qué nosotros?</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, nisi
        dolorum obcaecati quas nihil sunt inventore non esse laborum reiciendis
        facere nam iure. Qui blanditiis, vitae consequatur quae facere autem?
      </p>
    </section>
  </>
);
