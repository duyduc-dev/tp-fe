import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/App.tsx';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container!);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
