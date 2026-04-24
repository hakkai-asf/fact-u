import { universities, getUniversity } from '@/lib/universities';
import { notFound } from 'next/navigation';
import UniversityClient from './UniversityClient';

export async function generateStaticParams() {
  return universities.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const u = getUniversity(params.slug);
  if (!u) return {};
  return {
    title: `${u.name} — UAAP Universe`,
    description: u.description,
  };
}

export default function UniversityPage({ params }: { params: { slug: string } }) {
  const u = getUniversity(params.slug);
  if (!u) notFound();
  return <UniversityClient university={u} />;
}
