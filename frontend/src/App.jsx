import { useState } from "react";

function App() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState(null);

  const analyzeCareer = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/analyze?role=${role}&skills_input=${skills}`
      );

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Could not connect to Pathloom API");
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        fontFamily: "Arial",
      }}
    >
      <h1>Pathloom</h1>

      <h3>AI Career Intelligence Platform</h3>

      <label>
        <strong>Role ID</strong>
      </label>

      <br />
      <br />

      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Example: 2"
      />

      <br />
      <br />

      <label>
        <strong>Skills</strong>
      </label>

      <br />
      <br />

      <input
        type="text"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        placeholder="Example: 1,2,13"
      />

      <br />
      <br />

      <button onClick={analyzeCareer}>
        Analyze
      </button>

      {result && (
        <div style={{ marginTop: "40px" }}>
          <h2>
            Readiness Score: {result.readiness_score}%
          </h2>

          <h3>Missing Skills</h3>

          <ul>
            {result.missing_skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          <h3>Roadmap</h3>

          <ul>
            {result.roadmap.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;