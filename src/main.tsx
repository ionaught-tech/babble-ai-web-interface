import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = document.createElement("div");

let rendered = false;

const babbleAI = {
  show() {
    if (!rendered)
      ReactDOM.createRoot(root as HTMLElement).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      )
    rendered = true;
    document.body.append(root)
  },
  hide() {
    try {
      document.body.removeChild(root)
    } catch {

    }
  },
}


babbleAI.show();


declare global {
  interface Window { babbleAI: typeof babbleAI }
}

window.babbleAI = babbleAI;