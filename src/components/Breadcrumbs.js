import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { routes } from '../routes';

export function Breadcrumbs({ crumbs }) {
  return (
    <div>
      {crumbs.map(({ name, url }, i) => {
        const isLast = i === crumbs.length - 1;
        if (isLast) {
          return <span key={url}>{name}</span>;
        }
        return (
          <span key={url}>
            <Link className="links" to={url}>{name}</Link>{' > '}
          </span>
        );
      })}
    </div>
  );
}

Breadcrumbs.propTypes = {
  crumbs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
};

export const atPlanets = [{ name: routes.planets.label(), url: routes.planets.link() }];

export function atPlanet(planetName, planetId) {
  return [
    ...atPlanets,
    { name: `Planet ${planetName}`, url: routes.residents.link(planetId) },
  ];
}

export function atResident(resident) {
  const {
    homeworld: { name: planetName, id: planetId },
    name: residentName,
    id: residentId,
  } = resident;

  return [
    ...atPlanet(planetName, planetId),
    {
      name: routes.resident.label(residentName),
      url: routes.resident.link(planetId, residentId),
    },
  ];
}
