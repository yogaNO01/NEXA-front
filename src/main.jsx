import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { I18nProvider, LocalizedContent } from './i18n.jsx';
import './styles.css';
import './source-design.css';

createRoot(document.getElementById('root')).render(<StrictMode><I18nProvider><LocalizedContent><App /></LocalizedContent></I18nProvider></StrictMode>);
