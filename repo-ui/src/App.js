import React, { useState } from 'react';
import './App.css';

function App() {
  const [repoName, setRepoName] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleCreateRepo = async () => {
    try {
      const res = await fetch(
        `https://abc123xyz.execute-api.us-east-2.amazonaws.com/prod/create?repo=${repoName}`
      );
      const data = await res.json();

      if (res.ok) {
        setResponse(data.url);
        setError(null);
      } else {
        setError(data.error);
        setResponse(null);
      }
    } catch (err) {
      setError('Failed to fetch');
      setResponse(null);
    }
  };

  return (
    <div className="App">
      <h2>Create GitHub Repo</h2>
      <input
        type="text"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
        placeholder="Enter repo name"
      />
      <button onClick={handleCreateRepo}>Create Repo</button>
      {response && <p style={{ color: 'green' }}>Repo Created: <a href={response}>{response}</a></p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
