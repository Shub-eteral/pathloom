/* useProfileExport — profile import/export functionality */
import { useState } from 'react';
import { useProfile } from '../contexts/ProfileContext';

export default function useProfileExport() {
  const { getProfileData, restoreProfile } = useProfile();
  const [importAlert, setImportAlert] = useState(null);

  const exportProfile = () => {
    const profile = getProfileData();
    const blob = new Blob([JSON.stringify(profile, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pathloom_profile.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importProfile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const profile = JSON.parse(e.target.result);
        restoreProfile(profile);
        setImportAlert({ type: "success", message: "Profile imported successfully." });
      } catch {
        setImportAlert({ type: "error", message: "Invalid profile file." });
      }
    };
    reader.readAsText(file);
  };

  return { exportProfile, importProfile, importAlert, setImportAlert };
}
