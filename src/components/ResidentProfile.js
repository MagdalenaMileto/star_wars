import React from 'react';
import PropTypes from 'prop-types';

export function ResidentProfile({ resident }) {
  /* eslint-disable camelcase */
  const {
    name,
    height,
    gender,
    mass,
    hair_color,
    skin_color,
    eye_color,
  } = resident;

  const initials = name
    .split(' ')
    .map((namePiece) => namePiece[0])
    .join('');

  function withUpperCaseStart(attribute) {
    return attribute.charAt(0).toUpperCase() + attribute.slice(1);
  }

  return (
    <div className="profile">
      <div style={{ borderRight: 'solid gray 1px' }}>
        <div className="avatar">{initials}
        </div>
      </div>
      <div style={{ paddingLeft: '1rem' }}>
        <h3>{name}</h3>
        <div className="resident-information">
          <div>Gender: {withUpperCaseStart(gender)}</div>
          <div>Height: {height} cm</div>
          <div>Weigh: {mass} kg</div>
          <div>Hair: {withUpperCaseStart(hair_color)}</div>
          <div>Skin: {withUpperCaseStart(skin_color)}</div>
          <div>Eyes: {withUpperCaseStart(eye_color)}</div>
        </div>
      </div>
    </div>
  );
  /* eslint-enable */
}

const residentPropTypes = {
  name: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  mass: PropTypes.string.isRequired,
  hair_color: PropTypes.string.isRequired,
  skin_color: PropTypes.string.isRequired,
  eye_color: PropTypes.string.isRequired,
};

ResidentProfile.propTypes = {
  resident: PropTypes.shape(residentPropTypes).isRequired,
};
