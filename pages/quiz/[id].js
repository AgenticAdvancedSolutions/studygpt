import { useEffect } from 'react';
import { useRouter } from 'next/router';
export default function QuizByIdPage() {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => { if (id) router.replace(`/quiz.html?id=${id}`); }, [id, router]);
  return null;
}
