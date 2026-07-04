/* ApiContext — handles API connection, roles, and skills data */
import { createContext, useContext, useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

const ApiContext = createContext(null);

export function ApiProvider({ children }) {
  const [roles, setRoles] = useState([]);
  const [skills, setSkills] = useState({});
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const [rolesRes, skillsRes] = await Promise.all([
          fetch(`${API_BASE}/roles`),
          fetch(`${API_BASE}/skills`),
        ]);

        if (!rolesRes.ok || !skillsRes.ok) {
          throw new Error("Failed to sync core roles or skills databases.");
        }

        const rolesData = await rolesRes.json();
        const skillsData = await skillsRes.json();

        if (isMounted) {
          setRoles(rolesData);
          setSkills(skillsData);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setLoadError(
            "Couldn't connect to the Pathloom server. Make sure the local API is running at 127.0.0.1:8000."
          );
        }
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

  const connectionStatus = loadError
    ? "offline"
    : roles.length > 0 && Object.keys(skills).length > 0
    ? "online"
    : "connecting";

  const connectionLabel =
    connectionStatus === "offline" ? "Server offline" :
    connectionStatus === "connecting" ? "Connecting…" : "Connected";

  const getRoleName = (roleId) => {
    const role = roles.find((r) => String(r.role_id) === String(roleId));
    return role ? role.role_name : `Role #${roleId}`;
  };

  return (
    <ApiContext.Provider value={{
      API_BASE,
      roles,
      skills,
      loadError,
      connectionStatus,
      connectionLabel,
      getRoleName,
    }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw new Error("useApi must be used within an ApiProvider");
  return context;
}
