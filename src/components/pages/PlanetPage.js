import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { atPlanet, Breadcrumbs } from '../Breadcrumbs';
import { ResidentDetail } from '../ResidentOverview';

export function PlanetPage({ getPlanet }) {
  const [planet, setPlanet] = useState(null);
  const { planetId } = useParams();

  useEffect(() => {
    getPlanet(planetId).then(setPlanet);
  }, [getPlanet, planetId]);

  return (
    planet && (
    <div>
      <Breadcrumbs crumbs={atPlanet(planet.name, planet.id)} />
      <h3>Residents of {planet?.name}</h3>
      <div className="resident-grid">
        {planet.residents.length !== 0
          ? planet.residents.map((resident) => (
            <ResidentDetail key={resident.name} resident={resident} />
          ))
          : <div>Theres no residents for this planet</div>}
      </div>
    </div>
    )
  );
}

PlanetPage.propTypes = {
  getPlanet: PropTypes.func.isRequired,
};
