/**
 * Created by cantgetnosleep on 10/10/16.
 */
import React from 'react';

const RequiredMarker = ({required}) => {
  if (required) {
    return (
      <span className="requiredControl icon-asterisk"></span>
    );
  }
  else {
    return null;
  }
};

export default RequiredMarker;