import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const Container = document.getElementById('root');
const root = createRoot(Container);
root.render(<App />);