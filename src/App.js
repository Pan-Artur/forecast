import { Header } from "./components/Header/Header";
import { Main } from "./pages/Main/Main";
import { Footer } from "./components/Footer/Footer";
import { useState } from "react";

export const App = () => {

  const [isLoggined, setIsLoggined] = useState(false)
  if(isLoggined){
    console.log('blya ya genii')
  }
  return (
    <div className="App">
      <Header isLoggined={isLoggined} setIsLoggined={setIsLoggined}/>
      
      <Main />
      <Footer />
    </div>
  );
};
