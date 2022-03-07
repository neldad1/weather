import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faPlus,
  faArrowRotateRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  LocMainForm,
  LocationSpan,
  LocationInput,
} from './LocationForm.styled';

const LocationForm = ({
  zipCode,
  countryCode,
  setZipCode,
  onSubmit,
  onRefresh,
}) => {
  const placeholder = `Enter zip code`;

  return (
    <LocMainForm onSubmit={onSubmit}>
      <LocationSpan>{countryCode}</LocationSpan>
      <FontAwesomeIcon icon={faLocationDot} />
      <LocationInput
        placeholder={placeholder}
        type="number"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />
      <FontAwesomeIcon
        icon={faPlus}
        size="lg"
        onClick={onSubmit}
        className="fa-icon"
      />
      <FontAwesomeIcon
        icon={faArrowRotateRight}
        size="lg"
        onClick={onRefresh}
        className="fa-icon"
      />
    </LocMainForm>
  );
};

export default LocationForm;
