import { saveQuiz, getQuiz } from '../../utils/storage';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const spec = req.body;
      if (!spec || typeof spec !== 'object' || !spec.type || !spec.title || !Array.isArray(spec.questions)) {
        return res.status(400).json({ error: 'Invalid quiz/exam specification.' });
      }
      const id = await saveQuiz(spec);
      return res.status(201).json({ id, url: `/quiz/${id}` });
    } catch (error) {
      return res.status(500).json({ error: 'Unable to create quiz specification.' });
    }
  }
  if (req.method === 'GET') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'Missing quiz ID.' });
    const spec = await getQuiz(id);
    if (!spec) return res.status(404).json({ error: 'Quiz not found.' });
    return res.status(200).json(spec);
  }
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
