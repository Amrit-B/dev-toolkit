import { useState, useEffect } from 'react';
import { usePersistentState } from './hooks/usePersistentState'; 

import Welcome from './components/Welcome';
import JsonFormatter from './components/JsonFormatter';
import JWTDecoder from './components/JWTDecoder';
import HashGenerator from './components/HashGenerator';
import ColorConverter from './components/ColorConverter';
import Base64Encoder from './components/Base64Encoder';
import UrlEncoder from './components/UrlEncoder';
import TimestampConverter from './components/TimestampConverter';
import TextInspector from './components/TextInspector';
import RegexTester from './components/RegexTester';
import Sidebar from './components/Sidebar';

const tools = [
  { id: 'json', name: 'JSON Formatter', component: JsonFormatter },
  { id: 'jwt', name: 'JWT Decoder', component: JWTDecoder },
  { id: 'hash', name: 'Hash Generator', component: HashGenerator },
  { id: 'color', name: 'Color Converter', component: ColorConverter },
  { id: 'base64', name: 'Base64 Encoder', component: Base64Encoder },
  { id: 'url', name: 'URL Encoder', component: UrlEncoder },
  { id: 'timestamp', name: 'Timestamp Converter', component: TimestampConverter },
  { id: 'text', name: 'Text Inspector', component: TextInspector },
  { id: 'regex', name: 'Regex Tester', component: RegexTester },
];

function App() {
  const [activeToolId, setActiveToolId] = usePersistentState('activeToolId', 'welcome');
  const [theme, setTheme] = usePersistentState('theme', 'dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const ActiveToolComponent = tools.find(tool => tool.id === activeToolId)?.component;
  const activeToolName = tools.find(tool => tool.id === activeToolId)?.name || 'Welcome';

  return (
    <div className="relative min-h-screen md:flex bg-slate-50 dark:bg-gray-900">
      {/* Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 z-20 bg-black/50 transition-opacity duration-300 md:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)}></div>
      
      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-5/6 max-w-xs transform transition-transform duration-300 md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar tools={tools} activeToolId={activeToolId} setActiveToolId={setActiveToolId} theme={theme} toggleTheme={toggleTheme} closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64">
          <Sidebar tools={tools} activeToolId={activeToolId} setActiveToolId={setActiveToolId} theme={theme} toggleTheme={toggleTheme} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 dark:border-gray-700 bg-slate-100 dark:bg-gray-800">
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <h2 className="text-lg font-semibold">{activeToolName}</h2>
              <div></div> {/* Spacer */}
          </header>

          <div className="flex-1 p-4 md:p-8 overflow-y-auto">
              {activeToolId === 'welcome' ? <Welcome /> : (ActiveToolComponent && <ActiveToolComponent theme={theme} />)}
          </div>
      </main>
    </div>
  );
}

export default App;
