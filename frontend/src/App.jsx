import { useEffect, useState } from "react";

function App() {
  const [roles, setRoles] = useState([]);
  const [skills, setSkills] = useState({});
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/roles")
      .then((response) => response.json())
      .then((data) => {
        setRoles(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/skills")
      .then((response) => response.json())
      .then((data) => {
        setSkills(data);
      });
  }, []);

  const toggleSkill = (skillId) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(
        selectedSkills.filter((id) => id !== skillId)
      );
    } else {
      setSelectedSkills([
        ...selectedSkills,
        skillId,
      ]);
    }
  };

  const analyzeCareer = async () => {
    if (!selectedRole) {
      alert("Please select a career");
      return;
    }

    if (selectedSkills.length === 0) {
      alert("Please select at least one skill");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/analyze?role=${selectedRole}&skills_input=${selectedSkills.join(",")}`
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
        maxWidth: "800px",
        margin: "40px auto",
        fontFamily: "Arial",
        padding: "20px",
      }}
    >
      <h1>🚀 Pathloom</h1>

      <h3>AI Career Intelligence Platform</h3>

      <hr />

      <h3>Select Career</h3>

      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
        }}
      >
        <option value="">
          Choose a Career
        </option>

        {roles.map((role) => (
          <option
            key={role.role_id}
            value={role.role_id}
          >
            {role.role_name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <h3>Select Skills</h3>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          maxHeight: "250px",
          overflowY: "auto",
          width: "350px",
        }}
      >
        {Object.entries(skills).map(
          ([skillId, skillName]) => (
            <div key={skillId}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skillId)}
                  onChange={() =>
                    toggleSkill(skillId)
                  }
                />

                {" "}
                {skillName}
              </label>
            </div>
          )
        )}
      </div>

      <br />

      <strong>Selected Skill IDs:</strong>

      <p>{selectedSkills.join(", ")}</p>

      <button
        onClick={analyzeCareer}
        style={{
          padding: "12px 25px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Analyze Career
      </button>

      {result && (
        <div
          style={{
            marginTop: "40px",
            borderTop: "2px solid #ccc",
            paddingTop: "20px",
          }}
        >
          <h2>
            Readiness Score: {result.readiness_score}%
          </h2>

          <h3>Missing Skills</h3>

          <ul>
            {result.missing_skills.map(
              (skill, index) => (
                <li key={index}>{skill}</li>
              )
            )}
          </ul>

          <h3>Learning Roadmap</h3>

          <ul>
            {result.roadmap.map(
              (step, index) => (
                <li key={index}>{step}</li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;