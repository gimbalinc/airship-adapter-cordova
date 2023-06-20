/* eslint-disable no-undef */
import React from 'react';
import './App.css';
import COLORS from '../../global/colors';
import '../../global/types';

export default function App(): React.ReactElement {
  function toggleGimbal(isOn: boolean) {
    if (isOn) {
      GimbalAirshipAdapter.start(
        'b759f6fa-3e27-4a02-9ad8-4630847d8a8a',
        () => console.log('=================== TESTEST start success ========================='),
        () => console.log('=================== TESTEST start failure ========================='),
      );
    } else {
      GimbalAirshipAdapter.stop(
        () => console.log('=================== TESTEST stop success ========================='),
        () => console.log('=================== TESTEST stop failure ========================='),
      );
    }
  }

  toggleGimbal(true);

  return (
    <div className="App">
      <header className="App-header">
        <p style={{ color: COLORS.orange, fontFamily: 'BrandonText', fontWeight: 300 }}>
          Gimbal Airship Adapter Sample App
        </p>
      </header>
    </div>
  );
}
