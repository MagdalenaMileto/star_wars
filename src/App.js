import './App.sass';
import React from 'react';
import {
  BrowserRouter, Route, Switch, useHistory,
} from 'react-router-dom';
import { PlanetsPage } from './components/pages/PlanetsPage';
import { PlanetPage } from './components/pages/PlanetPage';
import { getPlanet, getPlanets, getResidentDetails } from './api/actions';
import { ResidentPage } from './components/pages/ResidentPage';
import { routes } from './routes';

function RedirectToPlanets() {
  const history = useHistory();
  history.replace(routes.planets.route);
  // noinspection JSConstructorReturnsPrimitive
  return null;
}

export function App() {
  return (
    <>
      <div className="header">
        Star Wars API
      </div>
      <div className="main-content">
        <BrowserRouter>
          <Switch>
            <Route exact path={routes.planets.route}>
              <PlanetsPage getPlanets={getPlanets} />
            </Route>
            <Route exact path={routes.residents.route}>
              <PlanetPage getPlanet={getPlanet} />
            </Route>
            <Route path={routes.resident.route}>
              <ResidentPage getResidentDetails={getResidentDetails} />
            </Route>
            <Route path="*" component={RedirectToPlanets} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}
