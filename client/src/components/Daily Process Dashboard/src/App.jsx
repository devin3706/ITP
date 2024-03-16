//import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom"

//functions
import {getTest} from "./functions/test";

function App() {
  const [data, setData] = useState("Hello World!");

  useEffect(() => {
    getTest()
      .then((res) => {
        setData(res.message);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Router>
        <Route exact path = "/" />
        <Route exact path = "/AdminCreate" />
        <Route exact path = "/AdminLogin" />
      </Router>
      <h1> {data} </h1>
      <h2>Helloo33o</h2>
    </div>
  );
}

export default App;