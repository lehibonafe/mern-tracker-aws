import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import AppNavbar from "./components/AppNavbar";
import MemberPage from "./pages/MemberPage";
import MemberUpdatePage from "./pages/MemberUpdatePage";
import TaskPage from "./pages/TaskPage";
import TaskUpdatePage from "./pages/TaskUpdatePage";
import TeamPage from "./pages/TeamPage";
import TeamUpdatePage from "./pages/TeamUpdatePage";

const client = new ApolloClient({ uri: process.env.REACT_APP_API_URL });
const divRoot = document.getElementById("root");
const pageComponent = (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <AppNavbar />
      <Switch>
        <Route exact path="/members" component={MemberPage} />
        <Route exact path="/member/update/:id" component={MemberUpdatePage} />
        <Route exact path="/teams" component={TeamPage} />
        <Route exact path="/team/update/:id" component={TeamUpdatePage} />
        <Route exact path="/tasks" component={TaskPage} />
        <Route exact path="/task/update/:id" component={TaskUpdatePage} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(pageComponent, divRoot);
