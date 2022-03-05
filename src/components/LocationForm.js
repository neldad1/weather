import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faPlus,
  faArrowRotateRight,
} from '@fortawesome/free-solid-svg-icons';
import { Form, Span, ZipInput } from './LocationForm.styled';

const LocationForm = ({ zipCode, countryCode, setZipCode, onSubmit }) => {
  const placeholder = `Enter zip code`;

  return (
    <Form onSubmit={onSubmit}>
      <Span>{countryCode}</Span>
      <FontAwesomeIcon icon={faLocationDot} />
      <ZipInput
        placeholder={placeholder}
        type="number"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />
      <FontAwesomeIcon icon={faPlus} size="lg" onClick={onSubmit} />
      <FontAwesomeIcon icon={faArrowRotateRight} size="lg" />
    </Form>
  );
};

export default LocationForm;
