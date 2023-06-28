/* eslint-disable no-undef */
import React from 'react';
import { ThemeProvider } from '@emotion/react';
import COLORS, { theme } from '../../global/colors';
import '../../global/types';
import SingleButtonPage from '../../components/SingleButtonPage/SingleButtonPage';

const appStyle: React.CSSProperties = {
  backgroundColor: COLORS.dark_blue,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  textAlign: 'center',
};

const headerStyle: React.CSSProperties = {
  color: COLORS.orange,
  fontFamily: 'BrandonText',
  fontWeight: 700,
  maxWidth: '60vh',
  paddingTop: '10vh',
  textAlign: 'center',
};

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
    <ThemeProvider theme={theme}>
      <div style={appStyle}>
        <p style={headerStyle}>Gimbal Airship Cordova Sample App</p>
        <SingleButtonPage pageText="testing" buttonText="buttonText" buttonCallback={() => console.log('It works!')} />
      </div>
    </ThemeProvider>
  );
}
