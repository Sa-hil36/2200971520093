export const logger = (action, payload) => {
  const logs = JSON.parse(localStorage.getItem("logs") || "[]");
  logs.push({ action, payload, timestamp: new Date().toISOString() });
  localStorage.setItem("logs", JSON.stringify(logs));
};
