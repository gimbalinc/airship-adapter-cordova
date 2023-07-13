import {
  keyShouldShowIntro, keyIsAdapterStarted, valueFalse, valueTrue,
} from './constants';

export default {
  setShouldShowIntro(wasShown: boolean) {
    const storage = window.localStorage;
    const newValue = wasShown ? valueTrue : valueFalse;
    storage.setItem(keyShouldShowIntro, newValue);
  },

  shouldShowIntro(): boolean {
    const storage = window.localStorage;
    const storedShouldShowIntro = storage.getItem(keyShouldShowIntro);
    if (storedShouldShowIntro === null) {
      storage.setItem(keyShouldShowIntro, valueTrue);
      return true;
    }
    return storage.getItem(keyShouldShowIntro) === valueTrue;
  },

  setIsAdapterStarted(isStarted: boolean) {
    const storage = window.localStorage;
    const newValue = isStarted ? valueTrue : valueFalse;
    storage.setItem(keyIsAdapterStarted, newValue);
  },

  isAdapterStarted(): boolean {
    const storage = window.localStorage;
    return storage.getItem(keyIsAdapterStarted) === valueTrue;
  },
};
