/* useCareerAnalysis — career analysis API calls and state management */
import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';
import { useProfile } from '../contexts/ProfileContext';

export default function useCareerAnalysis() {
  const { API_BASE, getRoleName } = useApi();
  const { selectedRole, selectedSkills } = useProfile();

  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analyzeError, setAnalyzeError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [recommendError, setRecommendError] = useState(null);
  const [comparisonData, setComparisonData] = useState([]);
  const [bestCareer, setBestCareer] = useState(null);
  const [careerInfo, setCareerInfo] = useState({});
  const [explanations, setExplanations] = useState({});
  const [insights, setInsights] = useState({});

  const analyzeCareer = async () => {
    setAnalyzeError(null);
    if (!selectedRole) {
      setAnalyzeError("Select a target role to continue.");
      return;
    }
    if (selectedSkills.length === 0) {
      setAnalyzeError("Add at least one skill before analyzing.");
      return;
    }

    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        role: selectedRole,
        skills_input: selectedSkills.join(","),
      });
      const response = await fetch(`${API_BASE}/analyze?${params.toString()}`);
      if (!response.ok) throw new Error(`Server returned status code: ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setAnalyzeError("Couldn't reach the Pathloom server. Make sure the local API is running at 127.0.0.1:8000.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadCareerInfo = async (roleId) => {
    try {
      const response = await fetch(`${API_BASE}/career-info/${roleId}`);
      if (!response.ok) throw new Error(`Server returned status code: ${response.status}`);
      const data = await response.json();
      setCareerInfo((prev) => ({ ...prev, [roleId]: data }));
    } catch (error) {
      console.error(error);
    }
  };

  const loadExplanation = async (roleId) => {
    try {
      const response = await fetch(
        `${API_BASE}/explain?role_id=${roleId}&skills_input=${selectedSkills.join(",")}`
      );
      if (!response.ok) throw new Error(`Server returned status code: ${response.status}`);
      const data = await response.json();
      setExplanations((prev) => ({ ...prev, [roleId]: data }));
    } catch (error) {
      console.error(error);
      setRecommendError((prev) => prev || "Could not load explanation details.");
    }
  };

  const loadInsight = async (roleId) => {
    try {
      const response = await fetch(
        `${API_BASE}/insight?role_id=${roleId}&skills_input=${selectedSkills.join(",")}`
      );
      if (!response.ok) throw new Error(`Server returned status code: ${response.status}`);
      const data = await response.json();
      setInsights((prev) => ({ ...prev, [roleId]: data.insight }));
    } catch (error) {
      console.error(error);
      setRecommendError((prev) => prev || "Could not load insight details.");
    }
  };

  const compareTopRoles = async (recommendationsList) => {
    try {
      const roleIds = recommendationsList.slice(0, 3).map((r) => r.role_id).join(",");
      const response = await fetch(
        `${API_BASE}/compare?role_ids=${roleIds}&skills_input=${selectedSkills.join(",")}`
      );
      if (!response.ok) throw new Error(`Server returned status code: ${response.status}`);
      const data = await response.json();
      setComparisonData(data);
      if (data.length > 0) setBestCareer(data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getRecommendations = async () => {
    setRecommendError(null);
    if (selectedSkills.length === 0) {
      setRecommendError("Add at least one skill before finding alternative roles.");
      return;
    }
    if (isLoadingRecommendations) return;

    setIsLoadingRecommendations(true);
    try {
      const response = await fetch(
        `${API_BASE}/recommend?skills_input=${selectedSkills.join(",")}`
      );
      if (!response.ok) throw new Error(`Server returned status code: ${response.status}`);
      const data = await response.json();
      setRecommendations(data);
      compareTopRoles(data);
      data.forEach((item) => {
        loadCareerInfo(item.role_id);
        loadExplanation(item.role_id);
        loadInsight(item.role_id);
      });
    } catch (error) {
      console.error(error);
      setRecommendError("Couldn't load alternative roles. Check your connection and try again.");
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const clearResults = () => {
    setResult(null);
    setAnalyzeError(null);
    setRecommendError(null);
    setRecommendations([]);
    setComparisonData([]);
    setBestCareer(null);
    setCareerInfo({});
    setExplanations({});
    setInsights({});
  };

  const bestMatch = recommendations.length > 0
    ? [...recommendations].sort((a, b) => b.score - a.score)[0]
    : null;
  const otherRecommendations = bestMatch
    ? recommendations.filter((item) => item !== bestMatch)
    : recommendations;

  return {
    result, isLoading, analyzeError,
    recommendations, isLoadingRecommendations, recommendError,
    comparisonData, bestCareer,
    careerInfo, explanations, insights,
    analyzeCareer, getRecommendations, clearResults,
    bestMatch, otherRecommendations,
  };
}
