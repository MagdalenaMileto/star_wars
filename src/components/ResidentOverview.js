import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export function ResidentDetail({ resident }) {
  const history = useHistory();

  function onClick() {
    history.push(`residents/${resident.id}`);
  }

  const initials = resident.name
    .split(' ')
    .map((name) => name[0])
    .join('');

  return (
    <div
      role="listitem"
      className="resident-card"
      onClick={onClick}
    >
      <div className="avatar">{initials}</div>
      <span>{resident.name}</span>
    </div>
  );
}

ResidentDetail.propTypes = {
  resident: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
