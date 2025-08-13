import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Comparision from './components/Comparision';

function Home() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh',
      maxHeight: '100vh',
      width: '100vw',
      maxWidth: '100vw',
      background: 'linear-gradient(120deg, #232526 0%, #414345 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      boxSizing: 'border-box',
      paddingTop: 72,
      overflow: 'auto',
    }}>
      <div style={{
        background: 'linear-gradient(120deg, #fffde4 0%, #e3f0ff 100%)',
        borderRadius: 18,
        boxShadow: '0 6px 32px #2325261a',
        maxWidth: 540,
        minWidth: 320,
        width: '92%',
        maxHeight: 'calc(100vh - 140px)',
        overflowY: 'auto',
        padding: '54px 32px',
        textAlign: 'center',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h1 style={{ color: '#232526', fontWeight: 800, fontSize: 38, marginBottom: 16, letterSpacing: 1, fontFamily: 'Segoe UI,Roboto,Arial,sans-serif' }}>
          <span style={{ color: '#ffd600' }}>File</span> Comparator
        </h1>
        <p style={{ color: '#222', fontSize: 19, marginBottom: 36, fontWeight: 400, lineHeight: 1.5 }}>
          Effortlessly compare two or more XML or INI files and instantly see the differences in a clear, interactive table.<br />
          <span style={{ color: '#1976d2', fontWeight: 500 }}>Perfect for developers, testers, and anyone working with configuration data.</span>
        </p>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 24 }}>
          <button
            onClick={() => navigate('/compare/xml')}
            style={{
              background: 'linear-gradient(90deg, #ffd600 0%, #fffde4 100%)',
              color: '#232526',
              border: 'none',
              borderRadius: 8,
              fontSize: 20,
              padding: '14px 32px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 12px #ffd60040',
              letterSpacing: 1,
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseOver={e => {
              e.target.style.background = 'linear-gradient(90deg, #ffe066 0%, #fffde4 100%)';
              e.target.style.color = '#1976d2';
            }}
            onMouseOut={e => {
              e.target.style.background = 'linear-gradient(90deg, #ffd600 0%, #fffde4 100%)';
              e.target.style.color = '#232526';
            }}
          >
            Compare XML Files
          </button>
          <button
            onClick={() => navigate('/compare/ini')}
            style={{
              background: 'linear-gradient(90deg, #42a5f5 0%, #e3f0ff 100%)',
              color: '#232526',
              border: 'none',
              borderRadius: 8,
              fontSize: 20,
              padding: '14px 32px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 12px #42a5f540',
              letterSpacing: 1,
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseOver={e => {
              e.target.style.background = 'linear-gradient(90deg, #90caf9 0%, #e3f0ff 100%)';
              e.target.style.color = '#1976d2';
            }}
            onMouseOut={e => {
              e.target.style.background = 'linear-gradient(90deg, #42a5f5 0%, #e3f0ff 100%)';
              e.target.style.color = '#232526';
            }}
          >
            Compare INI Files
          </button>
        </div>
      </div>
      <div style={{ marginTop: 40, color: '#eee', fontSize: 15, fontFamily: 'Segoe UI,Roboto,Arial,sans-serif', letterSpacing: 1 }}>
        &copy; {new Date().getFullYear()} File Comparator | Built with React
      </div>
    </div>
  );
}

function Header() {
  return (
    <header style={{
      width: '100%',
      background: 'linear-gradient(90deg, #232526 0%, #414345 100%)',
      color: '#fff',
      boxShadow: '0 4px 16px #23252630',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 10,
      minHeight: 72,
      fontFamily: 'Segoe UI,Roboto,Arial,sans-serif',
    }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 1200,
        margin: '0 auto',
        height: 72,
        padding: '0 32px',
      }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 26, letterSpacing: 1, fontFamily: 'inherit' }}>
          <span style={{ color: '#ffd600' }}>XML</span> File Comparator
        </Link>
        <div>
          <Link to="/compare" style={{
            color: '#ffd600',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: 19,
            marginLeft: 32,
            fontFamily: 'inherit',
            padding: '8px 20px',
            borderRadius: 6,
            transition: 'background 0.2s',
            background: 'rgba(255,214,0,0.08)'
          }}
          onMouseOver={e => e.target.style.background = 'rgba(255,214,0,0.18)'}
          onMouseOut={e => e.target.style.background = 'rgba(255,214,0,0.08)'}
          >
            Compare
          </Link>
        </div>
      </nav>
    </header>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <div style={{ paddingTop: 60, minHeight: '100vh', background: 'linear-gradient(120deg, #e3f0ff 0%, #fafcff 100%)' }}>
        <Routes>
          <Route path="/compare/xml" element={<Comparision fileType="xml" />} />
          <Route path="/compare/ini" element={<Comparision fileType="ini" />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
