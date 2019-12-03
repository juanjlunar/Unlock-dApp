import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from "./redux/store";
import { Switch, Redirect, Route } from "react-router";
import HomeView from './components/HomeView';



// store
const store = configureStore();

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                  <Switch>
                      <Route path="/" component={HomeView} exact />
                  </Switch>
            </Router>
        </Provider>
    );
};

export default App;

