import './Blocks_input.scss';

function Contribution({ setPercent, percent, initial, isLoading }) {
  const onChange = (e) => {
    if (e.target.value < 10) {
      setPercent(10);
    } else if (e.target.value > 60) {
      setPercent(60);
    } else {
      setPercent(e.target.value);
    }
  };
  return (
    <div className={`block ${isLoading ? 'block_disabled' : ''}`}>
      <h5 className="block_title">Первоначальный взнос</h5>
      <div className="input_container">
        <div className="block_input block_text ">{initial.toFixed(0)}</div>
      </div>
      <input
        onChange={onChange}
        className="percent block_input block_input__modify"
        type="text"
        value={percent + ' %'}
      />
      <div className="slidecontainer">
        <input type="range" min="10" max="60" value={percent} className="slider" onChange={onChange} />
      </div>
    </div>
  );
}
export default Contribution;
