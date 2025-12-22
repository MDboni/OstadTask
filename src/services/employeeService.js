const KEY = "employees";

export const getEmployees = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const saveEmployees = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};
