import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('SP Fast Services application error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', textAlign: 'center', background: '#050b18', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h1 style={{ color: '#facc15', fontSize: '28px', marginBottom: '16px' }}>SP FAST SERVICES</h1>
          <p style={{ color: '#cbd5e1', marginBottom: '24px' }}>Something went wrong while loading the page.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#eab308',
              color: '#050b18',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
