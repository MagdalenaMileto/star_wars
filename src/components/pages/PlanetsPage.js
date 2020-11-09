import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { atPlanets, Breadcrumbs } from '../Breadcrumbs';
import { PlanetSearch } from '../PlanetSearch';

export function PlanetsPage({ getPlanets }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    getPlanets().then((planetsList) => {
      setPlanets(planetsList);
    });
  }, [getPlanets]);

  return (
    <>
      <Breadcrumbs crumbs={atPlanets} />
      <div className="subtitle">This is our galaxy</div>
      <PlanetSearch planets={planets} />
    </>
  );
}

PlanetsPage.propTypes = {
  getPlanets: PropTypes.func.isRequired,
};
