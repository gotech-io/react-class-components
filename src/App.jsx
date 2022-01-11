import React, { useState } from 'react';
import ToggleButton from './ToggleButton';
import IntervalCounter from './IntervalCounter';
import ClassIntervalCounter from './ClassIntervalCounter';

import './App.css';

const App = () => {
  const [shouldRun, setShouldRun] = useState(false);

  return (
    <div className="App">
      <h1>Class Components vs. Functional Components</h1>
      <ToggleButton
        initialState={shouldRun}
        onChange={(newState) => setShouldRun(newState)}
      />
      <IntervalCounter shouldRun={shouldRun} />
      <hr />
      <ClassIntervalCounter shouldRun={shouldRun} />
    </div>
  );
};

export default App;
