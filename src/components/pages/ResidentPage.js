import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { atResident, Breadcrumbs } from '../Breadcrumbs';
import { ResidentProfile } from '../ResidentProfile';

export function ResidentPage({ getResidentDetails }) {
  const [resident, setResident] = useState(null);
  const { residentId } = useParams();

  useEffect(() => {
    getResidentDetails(residentId).then((residentDetails) => {
      setResident(residentDetails);
    });
  }, [getResidentDetails]);

  return (
    <>
      {resident && (
        <Breadcrumbs crumbs={atResident(resident)} />
      )}
      {resident && <ResidentProfile resident={resident} />}
    </>
  );
}

ResidentPage.propTypes = {
  getResidentDetails: PropTypes.func.isRequired,
};
