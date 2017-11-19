import React from 'react';

const ProgressBar = ({ visible }) => {
  return (
    <div className={visible ? "progress" : "progress hidden"} >
      <div className="indeterminate"></div>
    </div >
  );
}

export default ProgressBar;