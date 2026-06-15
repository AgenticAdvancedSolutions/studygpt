import { useState } from 'react';
import { useRouter } from 'next/router';
export default function HomePage() {
  const [specText, setSpecText] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  async function handleCreateQuiz(e) {
    e.preventDefault(); setError('');
    let spec;
    try { spec = JSON.parse(specText); } catch (err) { setError('Invalid JSON: ' + err.message); return; }
    const res = await fetch('/api/quiz', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(spec) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) { setError(data.error || 'Failed to create quiz'); return; }
    router.push(`/quiz/${data.id}`);
  }
  return <main style={{maxWidth: 720, margin: '0 auto', padding: '2rem', fontFamily: 'system-ui, sans-serif'}}>
    <h1>StudyGPT</h1>
    <p>Reusable quiz/exam renderer demo.</p>
    <p><a href="/quiz.html?type=quiz">Open sample quiz</a> · <a href="/quiz.html?type=exam">Open sample exam</a></p>
    <form onSubmit={handleCreateQuiz}>
      <textarea value={specText} onChange={e => setSpecText(e.target.value)} rows={12} style={{width:'100%'}} placeholder='Paste quiz/exam JSON spec here' />
      {error && <p style={{color:'red'}}>{error}</p>}
      <button type="submit">Create Quiz Link</button>
    </form>
  </main>;
}
