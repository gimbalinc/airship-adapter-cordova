import * as React from 'react';
import './App.css';
import COLORS from './global/colors';
import './global/types';
import './index.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p style={{ color: COLORS.orange, fontFamily: 'BrandonText', fontWeight: 300 }}>
          Hello.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
