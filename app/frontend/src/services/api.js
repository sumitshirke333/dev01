// frontend/src/api.js
export const getGlossary = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/glossary`);
  return res.json();
};
