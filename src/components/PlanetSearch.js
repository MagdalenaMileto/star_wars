import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { debounce } from '../helpers/Helpers';

export function PlanetSearch({ planets }) {
  const [term, setTerm] = useState('');
  const [criteria, setCriteria] = useState(() => () => true);

  const [currentPage, setCurrentPage] = useState(0);

  const setCriteriaDebounced = useMemo(
    () => debounce(setCriteria, 200),
    [setCriteria],
  );

  useEffect(() => {
    setCriteriaDebounced(() => (planet) => planet.name.toLowerCase().includes(term.toLowerCase()));
  }, [term]);
  const matchingPlanets = planets.filter(criteria);

  const [pageSize, setPageSize] = useState(10);

  function pageSizeChanged(event) {
    setPageSize(parseInt(event.target.value, 10));
  }

  useEffect(() => {
    setCurrentPage(0);
  }, [term, pageSize]);

  const totalPages = Math.ceil(matchingPlanets.length / pageSize);
  const paginatedPlanets = matchingPlanets
    .slice(currentPage * pageSize, currentPage * pageSize + pageSize);

  function onCurrentPageChange(event) {
    const functions = [
      Math.trunc,
      (value) => Math.max(value, 0),
      (value) => Math.min(value, 5),
    ];

    const finalValue = functions.reduce((acc, func) => func(acc), event.target.value);
    setCurrentPage(finalValue);
  }

  const lastPage = Math.max(totalPages - 1, 0);

  return (
    <>
      <div className="search">
        <input
          placeholder="Enter a planet to search"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
        />
      </div>

      {paginatedPlanets.length !== 0 && (
        <div className="pagination">
          <div>
            Page <input
              type="number"
              value={currentPage}
              onChange={onCurrentPageChange}
              min={0}
              max={lastPage}
              step={1}
            /> / {lastPage}
          </div>
          <div>
            Page size:
            <select value={pageSize} onChange={pageSizeChanged}>
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      )}

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Diameter</th>
              <th>Climate</th>
              <th>Terrain</th>
            </tr>
          </thead>
          <tbody>{
                        paginatedPlanets.map((planet) => (
                          <tr key={planet.name}>
                            <td>
                              <Link
                                className="links"
                                to={`/planets/${planet.id}/residents`}
                              >{planet.name}
                              </Link>
                            </td>
                            <td>{planet.diameter} km</td>
                            <td>{planet.climate}</td>
                            <td>{planet.terrain}</td>
                          </tr>
                        ))
                    }
          </tbody>
        </table>
      </div>
    </>
  );
}

const PlanetPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  diameter: PropTypes.string.isRequired,
  climate: PropTypes.string.isRequired,
  terrain: PropTypes.string.isRequired,
});

PlanetSearch.propTypes = {
  planets: PropTypes.arrayOf(PlanetPropTypes).isRequired,
};
