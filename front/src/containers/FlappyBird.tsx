import "./game/script";
import { useEffect } from "react";


const FlappyBird = () => {

  useEffect(() => {
    document.getElementById("game-container").style.display = "block";
  }, []);

  return <></>;
};
  
export default FlappyBird;