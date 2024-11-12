import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {TonConnectUIProvider} from "@tonconnect/ui-react";

const  manifestUrl = 'https://road12runner.github.io/first_contract_front_end/tonconnect-manifest.json';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <App />
    </TonConnectUIProvider>
  </StrictMode>,
)
