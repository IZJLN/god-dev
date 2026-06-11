export const dynamic = 'force-dynamic';

import { supabase } from '@/lib/supabase';
import EventDetailPage, { EventContent } from '../_shared/EventDetailPage';

export default async function IBMEvent() {
  const { data } = await supabase
    .from('evenements')
    .select('content')
    .eq('slug', 'ibm')
    .single();

  if (!data) return <div>Événement introuvable</div>;
  return <EventDetailPage data={data.content as EventContent} />;
}
