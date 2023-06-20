import React from 'react';
import './ToggleSwitch.css';

export interface ToggleSwitchProps {
  isToggled: boolean,
  label: string,
  onToggle: (isOn: boolean) => void
}

export default function ToggleSwitch(props: ToggleSwitchProps) {
  const { isToggled, label, onToggle } = props;

  const [isOn, setIsOn] = React.useState(isToggled);

  const handleChange = () => {
    setIsOn(!isOn);
    onToggle(!isOn);
  };

  return (
    <div className="container">
      {`${label} `}
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          checked={isOn}
          name={label}
          id={label}
          onChange={handleChange}
        />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
}
