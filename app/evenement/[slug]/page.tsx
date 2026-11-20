export const dynamic = 'force-dynamic';

import { supabase } from '@/lib/supabase';
import EventDetailPage, { EventContent } from '../_shared/EventDetailPage';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EvenementPage({ params }: Props) {
  const { slug } = await params;

  const { data } = await supabase
    .from('evenements')
    .select('content')
    .eq('slug', slug)
    .single();

  if (!data) return notFound();
  return <EventDetailPage data={data.content as EventContent} />;
}
