/* eslint no-undef: 0 */
import React, { ReactElement, useState } from 'react';
import SingleButtonPage from '../../components/SingleButtonPage/SingleButtonPage';

interface IntroContainerProps {
  onPageFinish: () => void;
}

const PAGE_MAX_INDEX = 2;

export default function IntroContainer({ onPageFinish }: IntroContainerProps): React.ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0);

  function onClick() {
    console.log('testest onClick');
    if (currentIndex === PAGE_MAX_INDEX) {
      onPageFinish();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function pageForIndex(index: number): ReactElement {
    switch (index) {
      case 0:
        return (
          <SingleButtonPage
            pageText="Notification permission is necessary in order to receive Airship push events; if you need this functionality, please grant the permission once the prompt appears."
            buttonText="OK"
            buttonCallback={() => {
              UAirship.setUserNotificationsEnabled(true, () => {
                onClick();
              });
            }}
          />
        );
      case 1:
        return (
          <SingleButtonPage
            pageText="Location permission is necessary in order to detect place entry and departure; if you need this functionality, please grant the permission once the prompt appears."
            buttonText="OK"
            buttonCallback={() => {
              navigator.geolocation.getCurrentPosition(() => {
                onClick();
              }, (error) => {
                console.log(`cordova-geolocation-plugin error: ${error}`);
              });
            }}
          />
        );
      case 2:
        return (
          <SingleButtonPage
            pageText="Location 'always' permission is necessary to detect place events from the background: if you need this functionality, please grant 'location always' permission from your device Settings page."
            buttonText="OK"
            buttonCallback={() => {
              onClick();
            }}
          />
        );
      default:
        return null;
    }
  }

  return (
    <>
      {pageForIndex(currentIndex)}
    </>
  );
}
