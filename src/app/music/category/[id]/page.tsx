'use client';
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();

  return <h1 style={{ color: 'red' }}>Категория {params.id}</h1>;
}
