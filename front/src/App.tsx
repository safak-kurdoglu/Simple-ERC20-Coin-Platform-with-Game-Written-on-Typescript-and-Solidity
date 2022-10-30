
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./containers/Main";
import Header from "./containers/Header";
import "./App.css";
import FlappyBird from "./containers/FlappyBird";


export default function App() {

  return ( 
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/game" element={<FlappyBird />} />
          <Route>404 Not Found!</Route>
        </Routes>
      </Router>
    </div>
  ); 
}
