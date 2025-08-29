import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home.jsx";

// Add error boundary for better debugging in production
const root = ReactDOM.createRoot(document.getElementById("root")!);

// Add some error handling for production debugging
try {
  root.render(
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Error rendering app:', error);
  // Fallback content for debugging
  root.render(
    <div style={{ padding: '20px', color: 'white', backgroundColor: '#1a1a1a' }}>
      <h1>Loading Error</h1>
      <p>There was an error loading the application. Check the console for details.</p>
      <pre>{String(error)}</pre>
    </div>
  );
}
