import React from 'react';
import './Blocks_input.scss';

function BlockTermCost({ maxValue, minValue, title, subTitle, value, setValue, isLoading }) {
  const onChange = (e) => {
    if (e.target.value < minValue) {
      setValue(minValue);
    } else if (e.target.value > maxValue) {
      setValue(maxValue);
    } else {
      setValue(e.target.value);
    }
  };
  return (
    <div className={`block ${isLoading ? 'block_disabled' : ''}`}>
      <h5 className="block_title">{title}</h5>
      <div className="input_container">
        <input onChange={onChange} className="block_input block_text" type="text" value={value} />
        <div className="percent percent_ending">{subTitle}</div>
        <div className="slidecontainer">
          <input type="range" min={minValue} max={maxValue} value={value} className="slider" onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
export default BlockTermCost;
