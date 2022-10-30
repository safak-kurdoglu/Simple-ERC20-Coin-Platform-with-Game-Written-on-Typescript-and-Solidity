import { useEffect } from "react";
import { EthProvider } from "../contract/contexts/EthContext";
import ShilaCoin from "./ShilaCoin";


const Main = () => {

  useEffect(() => {
    document.getElementById("game-container").style.display = "none";
  }, []);

  return (
    <div>
      <div className="ui container main-container">
        <div className="main-div main-coin">
          <EthProvider>
            <ShilaCoin />
          </EthProvider>
        </div>
      </div>
    </div>
  );
};

export default Main;