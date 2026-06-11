import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

type RouteContext = { params: Promise<{ id: string }> }

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params
  const body = await request.json()
  const { cocktail } = body

  const { data, error } = await supabase
    .from('cocktails')
    .update(cocktail)
    .eq('id', Number(id))
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params

  const { error } = await supabase
    .from('cocktails')
    .delete()
    .eq('id', Number(id))

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
