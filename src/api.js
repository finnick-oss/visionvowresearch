// Client for the VisionVow MongoDB backend (visionvowresearch-backend)
// Set REACT_APP_API_URL (see .env.development); when unset, MongoDB calls are skipped.
const API_URL = process.env.REACT_APP_API_URL;
const TOKEN_KEY = 'visionvow_api_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

const request = async (path, { method = 'GET', body, auth = false } = {}) => {
  if (!API_URL) throw new Error('REACT_APP_API_URL is not configured');
  const headers = { 'Content-Type': 'application/json' };
  if (auth) headers.Authorization = `Bearer ${getToken()}`;

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }
  return data;
};

const toQuery = (params) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') search.set(key, value);
  });
  return search.toString();
};

export const login = async (username, password) => {
  const { token } = await request('/api/auth/login', { method: 'POST', body: { username, password } });
  localStorage.setItem(TOKEN_KEY, token);
  return token;
};

export const fetchSurveys = (params) => request(`/api/surveys?${toQuery(params)}`, { auth: true });
export const fetchSurveyCount = () => request('/api/surveys/count', { auth: true });
export const exportSurveys = (params) => request(`/api/surveys/export?${toQuery(params)}`, { auth: true });
export const saveSurvey = async (survey) => {
  if (!API_URL) return { id: null }; // backend not configured for this build
  return request('/api/surveys', { method: 'POST', body: survey });
};
