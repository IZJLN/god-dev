import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

type RouteContext = { params: Promise<{ slug: string }> }

export async function GET(_req: Request, context: RouteContext) {
  const { slug } = await context.params

  const { data, error } = await supabase
    .from('evenements')
    .select('content')
    .eq('slug', slug)
    .single()

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(data.content)
}

export async function PUT(request: Request, context: RouteContext) {
  const { slug } = await context.params
  const body = await request.json()

  const { error } = await supabase
    .from('evenements')
    .update({ content: body })
    .eq('slug', slug)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
