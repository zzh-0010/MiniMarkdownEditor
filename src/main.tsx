import { createRoot } from 'react-dom/client';
import App from './App';
import './main.css'
import Modal from 'react-modal';


const container = document.getElementById('root');

if (container) {
  container.className = 'full-height';
}

if (container) { 
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error("Root element not found!");
}

if(container){
  Modal.setAppElement(container);
}