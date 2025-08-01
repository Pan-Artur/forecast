import { Header } from "./components/Header/Header";
import { Main } from "./pages/Main/Main";
import { Footer } from "./components/Footer/Footer";

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
