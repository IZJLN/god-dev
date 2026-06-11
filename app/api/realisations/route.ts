import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('realisations')
    .select('*')
    .order('id', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ realisations: data ?? [] })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { realisation } = body

  const { data, error } = await supabase
    .from('realisations')
    .insert(realisation)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
