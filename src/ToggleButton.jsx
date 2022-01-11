import PropTypes from 'prop-types';
import { useState } from 'react';

import './ToggleButton.css';

const ToggleButton = ({ initialState, onChange }) => {
  const [isActive, setIsActive] = useState(initialState);

  const toggle = () => {
    setIsActive((prevIsActive) => !prevIsActive);
    onChange(!isActive);
  };

  return (
    <div
      className={isActive ? 'toggle-button active' : 'toggle-button'}
      onClick={toggle}
    >
      <div className="thingy" />
    </div>
  );
};

ToggleButton.propType = {
  initialState: PropTypes.bool,
  onChange: PropTypes.func,
};

ToggleButton.defaultProps = {
  initialState: false,
  onChange: () => {},
};

export default ToggleButton;
