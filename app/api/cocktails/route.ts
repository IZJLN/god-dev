import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('cocktails')
    .select('*')
    .order('id', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({
    cocktails: data?.filter(c => c.category === 'cocktails') ?? [],
    mocktails: data?.filter(c => c.category === 'mocktails') ?? [],
    classiques: data?.filter(c => c.category === 'classiques') ?? [],
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { category, cocktail } = body

  const { data, error } = await supabase
    .from('cocktails')
    .insert({ ...cocktail, category })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
