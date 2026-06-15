const fs = require('fs').promises;
const path = require('path');
const dataFile = path.join(process.cwd(), 'data', 'quizzes.json');
async function readData() {
  try { return JSON.parse(await fs.readFile(dataFile, 'utf-8') || '{}'); }
  catch { return {}; }
}
async function writeData(data) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), 'utf-8');
}
async function saveQuiz(spec) {
  const data = await readData();
  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  data[id] = spec;
  await writeData(data);
  return id;
}
async function getQuiz(id) {
  const data = await readData();
  return data[id] || null;
}
module.exports = { saveQuiz, getQuiz };
