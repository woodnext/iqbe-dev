import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { IsMobileProvider } from './contexts/isMobile'
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <IsMobileProvider>
        <App />
      </IsMobileProvider>
    </MantineProvider>
  </React.StrictMode>,
);
