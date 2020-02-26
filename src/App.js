import React from "react";
import Hero from "./components/heroes/Hero";
import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";
import Detailed from "./components/Detailed/Detailed";
import New from "./components/New/New";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/new" component={New} />
          <Route path="/" exact component={Hero} />
          <Route path="/:id" component={Detailed} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
