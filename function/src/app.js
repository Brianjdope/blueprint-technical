import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [result, setResult] = useState("");

  const createRepo = async () => {
    try {
      const res = await fetch(
        `https://abc123.execute-api.us-east-1.amazonaws.com/prod/create?name=${encodeURIComponent(
          name
        )}`,
        { method: "POST" }
      );

      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>GitHub Repo Creator</h1>
      <p>Enter a repository name and click the button to create it:</p>
      <input
        type="text"
        value={name}
        placeholder="my-new-repo"
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "1rem", padding: "0.5rem" }}
      />
      <button onClick={createRepo} style={{ padding: "0.5rem 1rem" }}>
        Create Repo
      </button>
      <pre style={{ marginTop: "2rem", background: "#eee", padding: "1rem" }}>
        {result}
      </pre>
    </div>
  );
}

export default App;
