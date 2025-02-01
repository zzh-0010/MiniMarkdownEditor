import { createRoot } from 'react-dom/client';
import App from './App';
import './main.css'

const container = document.getElementById('root');
if (container) { // 增加类型检查，确保 container 不为 null
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error("Root element not found!");
}