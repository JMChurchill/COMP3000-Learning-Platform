import React from "react";

const ToggleSwitch = ({
  checked,
  onChange,
  name = "add a name",
  yes = "yes",
  no = "no",
}) => {
  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        checked={checked}
        name={name}
        id={name}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label className="toggle-switch-label" htmlFor={name}>
        <span className="toggle-switch-inner" data-yes={yes} data-no={no} />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
};

export default ToggleSwitch;
