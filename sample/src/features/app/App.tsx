/* eslint-disable no-undef */
import React, { useCallback, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import COLORS, { theme } from '../../global/colors';
import '../../global/types';
import StorageService from '../../global/StorageService';
import IntroContainer from './IntroContainer';

const GIMBAL_API_KEY_IOS = 'YOUR_IOS_API_KEY';
const GIMBAL_API_KEY_DROID = 'YOUR_ANDROID_API_KEY';

interface AppProps {
  shouldInitializeWithIntro: boolean;
  shouldInitializeWithAdapterStarted: boolean;
}

const appStyle: React.CSSProperties = {
  backgroundColor: COLORS.dark_blue,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  textAlign: 'center',
};

const containerStyle: React.CSSProperties = {
  alignItems: 'center',
  color: COLORS.orange,
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'BrandonText',
  fontSize: 16,
  fontWeight: 500,
  justifyContent: 'center',
  padding: 5,
};

const headerStyle: React.CSSProperties = {
  color: COLORS.orange,
  fontFamily: 'BrandonText',
  fontSize: 32,
  fontWeight: 700,
  maxWidth: '60vh',
  paddingTop: '10vh',
  textAlign: 'center',
};

export default function App({
  shouldInitializeWithIntro,
  shouldInitializeWithAdapterStarted,
}: AppProps): React.ReactElement {
  const [shouldShowIntro, setShouldShowIntro] = useState(shouldInitializeWithIntro);
  const [isAdapterStarted, setIsAdapterStarted] = useState(shouldInitializeWithAdapterStarted);

  function apiKey(): string {
    if (device.platform === 'iOS') {
      return GIMBAL_API_KEY_IOS;
    }
    return GIMBAL_API_KEY_DROID;
  }

  const toggleGimbal = () => {
    console.log(`setting adapter isOn to ${!isAdapterStarted}`);
    const newValueIsAdapterStarted = !isAdapterStarted;
    StorageService.setIsAdapterStarted(newValueIsAdapterStarted);
    setIsAdapterStarted(!isAdapterStarted);
  };

  const onIntroShown = useCallback(() => {
    setShouldShowIntro(false);
    StorageService.setShouldShowIntro(false);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={appStyle}>
        <p style={headerStyle}>Gimbal Airship Cordova Sample App</p>
        { shouldShowIntro
          ? (
            <IntroContainer onPageFinish={onIntroShown} />
          )
          : (
            <div style={containerStyle}>
              <p>
                api key in use:
                {'\n'}
                { apiKey() }
              </p>
              <FormGroup>
                <FormControlLabel
                  control={
                    (
                      <Switch
                        checked={isAdapterStarted}
                        onChange={toggleGimbal}
                      />
                    )
                  }
                  label={isAdapterStarted ? 'disable adapter?' : 'enable adapter?'}
                />
              </FormGroup>
            </div>
          )}
      </div>
    </ThemeProvider>
  );
}
