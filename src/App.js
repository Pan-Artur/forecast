import { Header } from "./components/Header/Header";
import { Main } from "./pages/Main/Main";
import { Footer } from "./components/Footer/Footer";
import { useEffect, useState } from "react";

export const App = () => {
  const [isLoggined, setIsLoggined] = useState(false);
  
  useEffect(() => {
    const localStorageState = JSON.parse(localStorage.getItem('isLoggedIn'))

    setIsLoggined(localStorageState)
  }, [])
  
  return (
    <div className="App">
      <Header isLoggined={isLoggined} setIsLoggined={setIsLoggined}/>
      
      <Main isLoggined={isLoggined} />
      <Footer />
    </div>
  );
};
