import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [result, setResult] = useState("");

  const createRepo = async () => {
    const res = await fetch(
      `YOUR_API_URL/create?name=${encodeURIComponent(name)}`,
      { method: "POST" }
    );
    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Repo Creator</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={createRepo}>Create Repo</button>
      <pre>{result}</pre>
    </div>
  );
}

export default App;
