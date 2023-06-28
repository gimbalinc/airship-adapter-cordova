import React from 'react';
import { Button } from '@mui/material';
import colors from '../../global/colors';

type SingleButtonPageProps = {
  pageText: string;
  buttonText: string;
  buttonCallback: () => void;
};

const containerStyle: React.CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 5,
};

const descriptionStyle: React.CSSProperties = {
  flexGrow: 1,
  fontFamily: 'BrandonText',
  fontSize: 16,
  fontWeight: 500,
  color: colors.orange,
  maxWidth: '10vh',
  textAlign: 'center',
};

const buttonStyle: React.CSSProperties = {
  maxWidth: '20vh',
};

function SingleButtonPage({
  pageText,
  buttonText,
  buttonCallback,
}: SingleButtonPageProps) {
  return (
    <div style={containerStyle}>
      <p style={descriptionStyle}>{pageText}</p>
      <Button style={buttonStyle} color="primary" variant="contained" onClick={buttonCallback}>{buttonText}</Button>
    </div>
  );
}

export default SingleButtonPage;
