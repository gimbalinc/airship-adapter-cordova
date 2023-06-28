import { createTheme } from '@mui/material/styles';
import { Colors } from './types';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#F96655',
    },
    secondary: {
      main: '#25313B',
    },
  },
});

export const COLORS: Colors = {
  dark_blue: 'rgb(37,49,59)',
  orange: 'rgb(249,102,85)',
  white: 'rgb(255,255,255)',
};

export default COLORS;
