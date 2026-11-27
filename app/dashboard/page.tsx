'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Pencil, Trash2, Plus, ChevronLeft, Eye, EyeOff,
  X, LogOut, GlassWater, CalendarDays, Handshake,
  ChevronDown, ChevronUp, Upload, Star,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

// ── Types ───────────────────────────────────────────────────────────────────────────────────

type MainSection = 'cocktails' | 'realisations' | 'partenaires'
type CocktailCategory = 'cocktails' | 'mocktails' | 'classiques'

interface CocktailItem { id: number; name: string; image: string; description: string; year: string }
interface RealisationItem { id: number; title: string; date: string; location: string; description: string; image: string; path: string; subtitle?: string; category?: string }
interface CocktailData { cocktails: CocktailItem[]; mocktails: CocktailItem[]; classiques: CocktailItem[] }
interface PartenaireItem { id: number; name: string; logo: string; description: string; website: string; featured: boolean }

interface EventCocktail { name: string; image: string; description: string; ingredients: string[] }
interface EventGalleryItem { src: string; alt: string }
interface EventStat { value: string; label: string }
interface EventContent {
  hero: { image: string; title: string; titleAccent: string; date: string; location: string; guests: string; description: string }
  story: { eyebrow: string; title: string; paragraphs: string[]; image: string; video?: string; stats: EventStat[] }
  cocktails: EventCocktail[]
  gallery: EventGalleryItem[]
}

// ── Constants ─────────────────────────────────────────────────────────────────────────────

const COCKTAIL_TABS: { key: CocktailCategory; label: string }[] = [
  { key: 'cocktails', label: 'Cocktails Maison' },
  { key: 'mocktails', label: 'Mocktails' },
  { key: 'classiques', label: 'Classiques' },
]
const EMPTY_COCKTAIL = { name: '', image: '', description: '', year: '' }
const EMPTY_REAL = { title: '', date: '', location: '', description: '', image: '', path: '', subtitle: '', category: '' }
const EMPTY_PARTENAIRE = { name: '', logo: '', description: '', website: '', featured: false }
const EMPTY_EVENT_COCKTAIL: EventCocktail = { name: '', image: '', description: '', ingredients: [] }
const EMPTY_GALLERY: EventGalleryItem = { src: '', alt: '' }

function slugFromPath(path: string): string | null {
  if (!path || !path.startsWith('/evenement/')) return null
  const parts = path.split('/')
  return parts[parts.length - 1] || null
}

function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

const DEFAULT_EVENT_CONTENT = {
  hero: { image: '', title: '', titleAccent: '', subtitle: '', date: '', location: '', guests: '', description: '' },
  story: { eyebrow: '', title: '', paragraphs: [''], image: '', video: '', stats: [{ value: '', label: '' }, { value: '', label: '' }, { value: '', label: '' }] },
  cocktails: [],
  gallery: [],
}

// ── Helpers ─────────────────────────────────────────────────────────────────────────────────

function Divider() {
  return (
    <div className="flex items-center gap-3 my-8">
      <div className="flex-1 h-px bg-[#C9A96E]/10" />
      <div className="w-1.5 h-1.5 bg-[#C9A96E]/40 rotate-45" />
      <div className="flex-1 h-px bg-[#C9A96E]/10" />
    </div>
  )
}

function AccordionSection({ label, open, onToggle, children }: {
  id: string; label: string; open: boolean; onToggle: () => void; children: React.ReactNode
}) {
  return (
    <div className="border border-white/8 rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 bg-[#0D1612] hover:bg-[#111A17] transition-colors text-left"
      >
        <span className="text-white font-medium text-sm">{label}</span>
        {open ? <ChevronUp size={16} className="text-[#C9A96E]" /> : <ChevronDown size={16} className="text-white/40" />}
      </button>
      {open && <div className="bg-[#080E0C] p-6 space-y-5">{children}</div>}
    </div>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">{children}</label>
}

function TextInput({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#0D1612] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A96E]/40 transition-colors"
    />
  )
}

function TextArea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-[#0D1612] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A96E]/40 transition-colors resize-none"
    />
  )
}

async function compressImage(file: File, maxWidth = 1800, quality = 0.82): Promise<File> {
  return new Promise((resolve) => {
    const img = new window.Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const scale = Math.min(1, maxWidth / img.width)
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(
        (blob) => resolve(blob ? new File([blob], file.name, { type: 'image/jpeg' }) : file),
        'image/jpeg',
        quality,
      )
    }
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file) }
    img.src = url
  })
}

async function uploadImage(file: File): Promise<string> {
  const compressed = await compressImage(file)
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`
  const { error } = await supabase.storage.from('images').upload(fileName, compressed, { upsert: false, contentType: 'image/jpeg' })
  if (error) throw error
  const { data } = supabase.storage.from('images').getPublicUrl(fileName)
  return data.publicUrl
}

function ImageUploadField({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file)
      onChange(url)
    } catch (err) {
      const msg = err instanceof Error
        ? err.message
        : (typeof err === 'object' && err !== null && 'message' in err)
          ? String((err as { message: unknown }).message)
          : JSON.stringify(err)
      alert(`Erreur upload : ${msg}`)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="https://... ou téléverser →"
        className="flex-1 bg-[#080E0C] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A96E]/40 transition-colors"
      />
      <label className={`cursor-pointer flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#C9A96E]/25 text-[#C9A96E]/70 hover:bg-[#C9A96E]/10 hover:border-[#C9A96E]/50 transition-all text-xs font-medium whitespace-nowrap ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
        {uploading
          ? <div className="w-3.5 h-3.5 border border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin" />
          : <Upload size={13} />
        }
        {uploading ? 'Envoi…' : 'Téléverser'}
        <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={handleFile} disabled={uploading} />
      </label>
    </div>
  )
}

function VideoUploadField({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const ext = file.name.split('.').pop() ?? 'mp4'
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage.from('images').upload(fileName, file, { upsert: false, contentType: file.type })
      if (error) throw error
      const { data } = supabase.storage.from('images').getPublicUrl(fileName)
      onChange(data.publicUrl)
    } catch (err) {
      const msg = err instanceof Error ? err.message : JSON.stringify(err)
      alert(`Erreur upload : ${msg}`)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="URL Instagram (reel/post) ou lien vidéo direct"
          className="flex-1 bg-[#080E0C] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A96E]/40 transition-colors"
        />
        <label className={`cursor-pointer flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#C9A96E]/25 text-[#C9A96E]/70 hover:bg-[#C9A96E]/10 hover:border-[#C9A96E]/50 transition-all text-xs font-medium whitespace-nowrap ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
          {uploading ? <div className="w-3.5 h-3.5 border border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin" /> : <Upload size={13} />}
          {uploading ? 'Envoi…' : 'Téléverser'}
          <input type="file" accept="video/mp4,video/quicktime,video/webm,video/mov" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      </div>
      <p className="text-white/25 text-xs">Si renseigné, la vidéo remplace la photo à droite du texte.</p>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  // Auth
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')

  // Section navigation
  const [section, setSection] = useState<MainSection>('cocktails')

  // Cocktail state
  const [cocktailData, setCocktailData] = useState<CocktailData | null>(null)
  const [cocktailTab, setCocktailTab] = useState<CocktailCategory>('cocktails')
  const [cocktailModal, setCocktailModal] = useState(false)
  const [editingCocktail, setEditingCocktail] = useState<CocktailItem | null>(null)
  const [cocktailForm, setCocktailForm] = useState(EMPTY_COCKTAIL)

  // Partenaire state
  const [partenaires, setPartenaires] = useState<PartenaireItem[]>([])
  const [partenaireModal, setPartenaireModal] = useState(false)
  const [editingPartenaire, setEditingPartenaire] = useState<PartenaireItem | null>(null)
  const [partenaireForm, setPartenaireForm] = useState(EMPTY_PARTENAIRE)

  // Réalisation state
  const [reals, setReals] = useState<RealisationItem[]>([])
  const [realModal, setRealModal] = useState(false)
  const [editingReal, setEditingReal] = useState<RealisationItem | null>(null)
  const [realForm, setRealForm] = useState(EMPTY_REAL)

  // Content editor state
  const [contentEditorSlug, setContentEditorSlug] = useState<string | null>(null)
  const [contentEditorTitle, setContentEditorTitle] = useState('')
  const [contentData, setContentData] = useState<EventContent | null>(null)
  const [contentSaving, setContentSaving] = useState(false)
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set(['hero']))

  // Global loading / saving
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)

  // ── Auth ────────────────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('god_admin') === 'true') {
      setAuthenticated(true)
    }
  }, [])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === 'GOD2024') {
      localStorage.setItem('god_admin', 'true')
      setAuthenticated(true)
      setAuthError('')
    } else {
      setAuthError('Mot de passe incorrect.')
      setPassword('')
    }
  }

  function handleLogout() {
    localStorage.removeItem('god_admin')
    setAuthenticated(false)
    setPassword('')
  }

  // ── Data fetching ─────────────────────────────────────────────────────────────────────────

  const fetchCocktails = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('cocktails')
        .select('*')
        .order('id', { ascending: true })
      if (error) throw error
      setFetchError(null)
      setCocktailData({
        cocktails: data?.filter(c => c.category === 'cocktails') ?? [],
        mocktails: data?.filter(c => c.category === 'mocktails') ?? [],
        classiques: data?.filter(c => c.category === 'classiques') ?? [],
      })
    } catch (err) {
      const msg = err instanceof Error
        ? err.message
        : (typeof err === 'object' && err !== null && 'message' in err)
          ? String((err as { message: unknown }).message)
          : JSON.stringify(err)
      console.error('Failed to fetch cocktails:', err)
      setFetchError(msg)
    }
  }, [])

  const fetchReals = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('realisations')
        .select('*')
        .order('id', { ascending: true })
      if (error) throw error
      setReals(data ?? [])
    } catch { console.error('Failed to fetch realisations') }
  }, [])

  const fetchPartenaires = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('partenaires')
        .select('*')
        .order('created_at', { ascending: true })
      if (error) throw error
      setPartenaires(data ?? [])
    } catch { console.error('Failed to fetch partenaires') }
  }, [])

  useEffect(() => {
    if (!authenticated) return
    setLoading(true)
    Promise.all([fetchCocktails(), fetchReals(), fetchPartenaires()]).finally(() => setLoading(false))
  }, [authenticated, fetchCocktails, fetchReals, fetchPartenaires])

  // ── Cocktail CRUD ─────────────────────────────────────────────────────────────────────────

  function openAddCocktail() { setEditingCocktail(null); setCocktailForm(EMPTY_COCKTAIL); setCocktailModal(true) }
  function openEditCocktail(item: CocktailItem) {
    setEditingCocktail(item)
    setCocktailForm({ name: item.name, image: item.image, description: item.description, year: item.year })
    setCocktailModal(true)
  }
  function closeCocktailModal() { setCocktailModal(false); setEditingCocktail(null); setCocktailForm(EMPTY_COCKTAIL) }

  async function saveCocktail(e: React.FormEvent) {
    e.preventDefault()
    if (!cocktailForm.image) { alert('Veuillez ajouter une image.'); return }
    setSaving(true)
    try {
      if (editingCocktail) {
        const { error } = await supabase
          .from('cocktails')
          .update(cocktailForm)
          .eq('id', editingCocktail.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('cocktails')
          .insert({ ...cocktailForm, category: cocktailTab })
        if (error) throw error
      }
      await fetchCocktails(); closeCocktailModal()
    } catch { console.error('Failed to save cocktail') } finally { setSaving(false) }
  }

  async function deleteCocktail(item: CocktailItem) {
    if (!window.confirm(`Supprimer « ${item.name} » ? Cette action est irréversible.`)) return
    setDeleteId(item.id)
    try {
      const { error } = await supabase
        .from('cocktails')
        .delete()
        .eq('id', item.id)
      if (error) throw error
      await fetchCocktails()
    } catch { console.error('Failed to delete cocktail') } finally { setDeleteId(null) }
  }

  // ── Partenaire CRUD ──────────────────────────────────────────────────────────────────────

  function openAddPartenaire() { setEditingPartenaire(null); setPartenaireForm(EMPTY_PARTENAIRE); setPartenaireModal(true) }
  function openEditPartenaire(item: PartenaireItem) {
    setEditingPartenaire(item)
    setPartenaireForm({ name: item.name, logo: item.logo, description: item.description, website: item.website, featured: item.featured })
    setPartenaireModal(true)
  }
  function closePartenaireModal() { setPartenaireModal(false); setEditingPartenaire(null); setPartenaireForm(EMPTY_PARTENAIRE) }

  async function savePartenaire(e: React.FormEvent) {
    e.preventDefault()
    if (!partenaireForm.logo) { alert('Veuillez ajouter un logo.'); return }
    setSaving(true)
    try {
      if (editingPartenaire) {
        const { error } = await supabase
          .from('partenaires')
          .update(partenaireForm)
          .eq('id', editingPartenaire.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('partenaires')
          .insert(partenaireForm)
        if (error) throw error
      }
      await fetchPartenaires(); closePartenaireModal()
    } catch { console.error('Failed to save partenaire') } finally { setSaving(false) }
  }

  async function deletePartenaire(item: PartenaireItem) {
    if (!window.confirm(`Supprimer « ${item.name} » ? Cette action est irréversible.`)) return
    setDeleteId(item.id)
    try {
      const { error } = await supabase
        .from('partenaires')
        .delete()
        .eq('id', item.id)
      if (error) throw error
      await fetchPartenaires()
    } catch { console.error('Failed to delete partenaire') } finally { setDeleteId(null) }
  }

  async function toggleFeatured(item: PartenaireItem) {
    if (!item.featured && partenaires.filter(p => p.featured).length >= 4) {
      alert('Maximum 4 partenaires peuvent être mis en avant sur la page d\'accueil.')
      return
    }
    try {
      const { error } = await supabase
        .from('partenaires')
        .update({ featured: !item.featured })
        .eq('id', item.id)
      if (error) throw error
      await fetchPartenaires()
    } catch { console.error('Failed to toggle featured') }
  }

  // ── Réalisation CRUD ──────────────────────────────────────────────────────────────────────

  function openAddReal() { setEditingReal(null); setRealForm(EMPTY_REAL); setRealModal(true) }
  function closeRealModal() { setRealModal(false); setEditingReal(null); setRealForm(EMPTY_REAL) }

  async function saveReal(e: React.FormEvent) {
    e.preventDefault()
    if (!realForm.image) { alert('Veuillez ajouter une image.'); return }
    setSaving(true)
    try {
      if (editingReal) {
        const { error } = await supabase
          .from('realisations')
          .update(realForm)
          .eq('id', editingReal.id)
        if (error) throw error
      } else {
        const slug = slugFromTitle(realForm.title)
        const path = `/evenement/${slug}`
        const formWithPath = { ...realForm, path }

        const { error } = await supabase
          .from('realisations')
          .insert(formWithPath)
        if (error) throw error

        // Crée automatiquement l'entrée dans evenements si elle n'existe pas
        const { data: existing } = await supabase
          .from('evenements')
          .select('slug')
          .eq('slug', slug)
          .single()

        if (!existing) {
          await supabase.from('evenements').insert({
            slug,
            content: {
              ...DEFAULT_EVENT_CONTENT,
              hero: {
                ...DEFAULT_EVENT_CONTENT.hero,
                title: realForm.title,
                subtitle: realForm.subtitle,
                date: realForm.date,
                location: realForm.location,
                image: realForm.image,
                description: realForm.description,
              },
              story: {
                ...DEFAULT_EVENT_CONTENT.story,
                title: realForm.title,
              },
            },
          })
        }
      }
      await fetchReals(); closeRealModal()
    } catch (err) {
      console.error('Failed to save realisation', err)
    } finally { setSaving(false) }
  }

  async function deleteReal(item: RealisationItem) {
    if (!window.confirm(`Supprimer « ${item.title} » ? Cette action est irréversible.`)) return
    setDeleteId(item.id)
    try {
      const { error } = await supabase
        .from('realisations')
        .delete()
        .eq('id', item.id)
      if (error) throw error
      await fetchReals()
    } catch { console.error('Failed to delete realisation') } finally { setDeleteId(null) }
  }

  // ── Content editor ────────────────────────────────────────────────────────────────────────

  async function openContentEditor(item: RealisationItem) {
    const slug = slugFromPath(item.path)
    if (!slug) return
    try {
      let { data } = await supabase
        .from('evenements')
        .select('content')
        .eq('slug', slug)
        .single()

      if (!data) {
        const defaultContent = {
          ...DEFAULT_EVENT_CONTENT,
          hero: { ...DEFAULT_EVENT_CONTENT.hero, title: item.title, subtitle: item.subtitle ?? '', date: item.date, location: item.location, image: item.image, description: item.description },
          story: { ...DEFAULT_EVENT_CONTENT.story, title: item.title },
        }
        await supabase.from('evenements').insert({ slug, content: defaultContent })
        data = { content: defaultContent }
      }

      setEditingReal(item)
      setRealForm({ title: item.title, date: item.date, location: item.location, description: item.description, image: item.image, path: item.path, subtitle: item.subtitle ?? '', category: item.category ?? '' })
      setContentData(data.content as EventContent)
      setContentEditorSlug(slug)
      setContentEditorTitle(item.title)
      setOpenAccordions(new Set(['fiche', 'hero']))
    } catch { alert('Erreur lors du chargement du contenu.') }
  }

  function closeContentEditor() {
    setContentEditorSlug(null)
    setContentData(null)
    setContentEditorTitle('')
    setEditingReal(null)
    setRealForm(EMPTY_REAL)
  }

  async function saveContent() {
    if (!contentEditorSlug || !contentData) return
    setContentSaving(true)
    try {
      const { error: e1 } = await supabase.from('evenements').update({ content: contentData }).eq('slug', contentEditorSlug)
      if (e1) throw e1
      if (editingReal) {
        const { error: e2 } = await supabase.from('realisations').update({ title: realForm.title, date: realForm.date, location: realForm.location, description: realForm.description, image: realForm.image, subtitle: realForm.subtitle, category: realForm.category || null }).eq('id', editingReal.id)
        if (e2) throw e2
      }
      await fetchReals()
      alert('Modifications enregistrées !')
    } catch (err) {
      const msg = err instanceof Error ? err.message : (typeof err === 'object' && err !== null && 'message' in err) ? String((err as { message: unknown }).message) : JSON.stringify(err)
      alert(`Erreur lors de la sauvegarde : ${msg}`)
    } finally { setContentSaving(false) }
  }

  function toggleAccordion(id: string) {
    setOpenAccordions(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  // helpers to mutate nested content state
  function setHero(patch: Partial<EventContent['hero']>) {
    setContentData(d => d ? { ...d, hero: { ...d.hero, ...patch } } : d)
  }
  function setStory(patch: Partial<EventContent['story']>) {
    setContentData(d => d ? { ...d, story: { ...d.story, ...patch } } : d)
  }
  function setParagraph(i: number, val: string) {
    setContentData(d => {
      if (!d) return d
      const paragraphs = [...d.story.paragraphs]
      paragraphs[i] = val
      return { ...d, story: { ...d.story, paragraphs } }
    })
  }
  function setStat(i: number, patch: Partial<EventStat>) {
    setContentData(d => {
      if (!d) return d
      const stats = d.story.stats.map((s, idx) => idx === i ? { ...s, ...patch } : s)
      return { ...d, story: { ...d.story, stats } }
    })
  }
  function setEventCocktail(i: number, patch: Partial<EventCocktail>) {
    setContentData(d => {
      if (!d) return d
      const cocktails = d.cocktails.map((c, idx) => idx === i ? { ...c, ...patch } : c)
      return { ...d, cocktails }
    })
  }
  function addEventCocktail() {
    setContentData(d => d ? { ...d, cocktails: [...d.cocktails, { ...EMPTY_EVENT_COCKTAIL }] } : d)
  }
  function removeEventCocktail(i: number) {
    setContentData(d => d ? { ...d, cocktails: d.cocktails.filter((_, idx) => idx !== i) } : d)
  }
  function setGalleryItem(i: number, patch: Partial<EventGalleryItem>) {
    setContentData(d => {
      if (!d) return d
      const gallery = d.gallery.map((g, idx) => idx === i ? { ...g, ...patch } : g)
      return { ...d, gallery }
    })
  }
  function addGalleryItem() {
    setContentData(d => d ? { ...d, gallery: [...d.gallery, { ...EMPTY_GALLERY }] } : d)
  }
  function removeGalleryItem(i: number) {
    setContentData(d => d ? { ...d, gallery: d.gallery.filter((_, idx) => idx !== i) } : d)
  }

  // ── Password screen ─────────────────────────────────────────────────────────────────────

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#080E0C] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#C9A96E]/30 bg-[#0D1612] mb-4">
              <span className="text-[#C9A96E] text-2xl font-serif font-bold">G</span>
            </div>
            <h1 className="text-3xl font-serif text-white tracking-wide">Good Old Drinks</h1>
            <p className="text-[#C9A96E]/60 text-sm mt-1 tracking-widest uppercase">Administration</p>
          </div>
          <form onSubmit={handleLogin} className="bg-[#0D1612] border border-[#C9A96E]/20 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-white text-xl font-semibold mb-6 text-center">Accès sécurisé</h2>
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                autoFocus
                className="w-full bg-[#080E0C] border border-[#C9A96E]/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C9A96E]/60 transition-colors pr-12"
              />
              <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#C9A96E] transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {authError && <p className="text-red-400 text-sm mb-4 text-center">{authError}</p>}
            <button type="submit" className="w-full bg-[#C9A96E] hover:bg-[#b8935a] text-[#080E0C] font-semibold py-3 rounded-xl transition-colors duration-200 tracking-wide">
              Connexion
            </button>
            <div className="mt-6 text-center">
              <Link href="/" className="text-white/30 hover:text-[#C9A96E] text-sm transition-colors inline-flex items-center gap-1">
                <ChevronLeft size={14} /> Retour au site
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // ── Content editor view ─────────────────────────────────────────────────────────────────

  if (contentEditorSlug && contentData) {
    return (
      <div className="min-h-screen bg-[#080E0C] text-white">
        {/* Header */}
        <header className="border-b border-[#C9A96E]/15 bg-[#080E0C]/95 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={closeContentEditor} className="flex items-center gap-1.5 text-white/40 hover:text-[#C9A96E] transition-colors text-sm">
                <ChevronLeft size={16} />Réalisations
              </button>
              <span className="text-white/15">|</span>
              <span className="text-white/70 text-sm truncate max-w-xs">{contentEditorTitle}</span>
            </div>
            <button
              onClick={saveContent}
              disabled={contentSaving}
              className="flex items-center gap-2 bg-[#C9A96E] hover:bg-[#b8935a] disabled:opacity-60 text-[#080E0C] font-semibold px-5 py-2 rounded-xl transition-all text-sm shadow-lg shadow-[#C9A96E]/20"
            >
              {contentSaving ? <div className="w-4 h-4 border-2 border-[#080E0C]/25 border-t-[#080E0C] rounded-full animate-spin" /> : null}
              Enregistrer
            </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-10 space-y-4">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-8">Modification du contenu de la page</p>

          {/* ── FICHE ── */}
          {editingReal && (
            <AccordionSection id="fiche" label="📋  Fiche — Carte de la réalisation" open={openAccordions.has('fiche')} onToggle={() => toggleAccordion('fiche')}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Titre</FieldLabel>
                  <TextInput value={realForm.title} onChange={v => setRealForm(f => ({ ...f, title: v }))} placeholder="Soirée Gruissan" />
                </div>
                <div>
                  <FieldLabel>Sous-titre <span className="normal-case text-white/20">(optionnel)</span></FieldLabel>
                  <TextInput value={realForm.subtitle ?? ''} onChange={v => setRealForm(f => ({ ...f, subtitle: v }))} placeholder="Villa de Luxe · 80 invités" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Date</FieldLabel>
                  <TextInput value={realForm.date} onChange={v => setRealForm(f => ({ ...f, date: v }))} placeholder="Août 2024" />
                </div>
                <div>
                  <FieldLabel>Lieu</FieldLabel>
                  <TextInput value={realForm.location} onChange={v => setRealForm(f => ({ ...f, location: v }))} placeholder="Gruissan, Occitanie" />
                </div>
              </div>
              <div>
                <FieldLabel>Image principale</FieldLabel>
                <ImageUploadField value={realForm.image} onChange={v => setRealForm(f => ({ ...f, image: v }))} />
                {realForm.image && (
                  <div className="relative h-24 mt-3 rounded-xl overflow-hidden border border-white/8">
                    <Image src={realForm.image} alt="Aperçu" fill className="object-cover" unoptimized />
                  </div>
                )}
              </div>
              <div>
                <FieldLabel>Catégorie</FieldLabel>
                <select value={realForm.category ?? ''} onChange={e => setRealForm(f => ({ ...f, category: e.target.value }))} className="w-full bg-[#0D1612] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A96E]/40 transition-colors appearance-none cursor-pointer">
                  <option value="">— Aucune —</option>
                  <option value="mariage">Mariage</option>
                  <option value="soiree-privee">Soirée privée</option>
                  <option value="atelier">Atelier</option>
                </select>
              </div>
              <div>
                <FieldLabel>Description</FieldLabel>
                <TextArea value={realForm.description} onChange={v => setRealForm(f => ({ ...f, description: v }))} rows={3} placeholder="Un moment unique pour..." />
              </div>
            </AccordionSection>
          )}

          {/* ── HERO ── */}
          <AccordionSection id="hero" label="🖼️  Héro — Image & titres" open={openAccordions.has('hero')} onToggle={() => toggleAccordion('hero')}>
            <div>
              <FieldLabel>Image de fond</FieldLabel>
              <ImageUploadField value={contentData.hero.image} onChange={v => setHero({ image: v })} />
              {contentData.hero.image && (
                <div className="relative h-28 mt-3 rounded-xl overflow-hidden border border-white/8">
                  <Image src={contentData.hero.image} alt="Aperçu" fill className="object-cover" unoptimized />
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel>Titre principal</FieldLabel>
                <TextInput value={contentData.hero.title} onChange={v => setHero({ title: v })} placeholder="Soirée Privée" />
              </div>
              <div>
                <FieldLabel>Titre accent (or)</FieldLabel>
                <TextInput value={contentData.hero.titleAccent} onChange={v => setHero({ titleAccent: v })} placeholder="Gruissan" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <FieldLabel>Date</FieldLabel>
                <TextInput value={contentData.hero.date} onChange={v => setHero({ date: v })} placeholder="13 Aût 2024" />
              </div>
              <div>
                <FieldLabel>Lieu</FieldLabel>
                <TextInput value={contentData.hero.location} onChange={v => setHero({ location: v })} placeholder="Gruissan, Occitanie" />
              </div>
              <div>
                <FieldLabel>Invités</FieldLabel>
                <TextInput value={contentData.hero.guests} onChange={v => setHero({ guests: v })} placeholder="80 invités" />
              </div>
            </div>
            <div>
              <FieldLabel>Description courte</FieldLabel>
              <TextArea value={contentData.hero.description} onChange={v => setHero({ description: v })} placeholder="Une soirée magique..." rows={2} />
            </div>
          </AccordionSection>

          {/* ── STORY ── */}
          <AccordionSection id="story" label="📖  Histoire — Textes & chiffres clés" open={openAccordions.has('story')} onToggle={() => toggleAccordion('story')}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel>Eyebrow (petit texte doré)</FieldLabel>
                <TextInput value={contentData.story.eyebrow} onChange={v => setStory({ eyebrow: v })} placeholder="Soirée privée en bord de mer" />
              </div>
              <div>
                <FieldLabel>Titre de section</FieldLabel>
                <TextInput value={contentData.story.title} onChange={v => setStory({ title: v })} placeholder="L'histoire de la soirée" />
              </div>
            </div>
            {contentData.story.paragraphs.map((p, i) => (
              <div key={i}>
                <FieldLabel>Paragraphe {i + 1}</FieldLabel>
                <TextArea value={p} onChange={v => setParagraph(i, v)} rows={3} placeholder={`Paragraphe ${i + 1}...`} />
              </div>
            ))}
            <div>
              <FieldLabel>Image principale</FieldLabel>
              <ImageUploadField value={contentData.story.image} onChange={v => setStory({ image: v })} />
              {contentData.story.image && (
                <div className="relative h-24 mt-3 rounded-xl overflow-hidden border border-white/8">
                  <Image src={contentData.story.image} alt="Aperçu" fill className="object-cover" unoptimized />
                </div>
              )}
            </div>
            <div>
              <FieldLabel>Vidéo <span className="normal-case text-white/20">(optionnel — remplace la photo)</span></FieldLabel>
              <VideoUploadField value={contentData.story.video ?? ''} onChange={v => setStory({ video: v })} />
            </div>
            <div>
              <FieldLabel>Chiffres clés (3 stats)</FieldLabel>
              <div className="grid grid-cols-3 gap-3">
                {contentData.story.stats.map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <TextInput value={stat.value} onChange={v => setStat(i, { value: v })} placeholder="80" />
                    <TextInput value={stat.label} onChange={v => setStat(i, { label: v })} placeholder="Invités" />
                  </div>
                ))}
              </div>
            </div>
          </AccordionSection>

          {/* ── COCKTAILS ── */}
          <AccordionSection id="cocktails" label="🍸  Cocktails signature" open={openAccordions.has('cocktails')} onToggle={() => toggleAccordion('cocktails')}>
            <div className="space-y-6">
              {contentData.cocktails.map((c, i) => (
                <div key={i} className="border border-white/8 rounded-xl p-4 space-y-4 relative">
                  <button
                    onClick={() => removeEventCocktail(i)}
                    className="absolute top-3 right-3 text-red-400/60 hover:text-red-400 transition-colors"
                    title="Supprimer ce cocktail"
                  >
                    <X size={14} />
                  </button>
                  <p className="text-[#C9A96E] text-xs uppercase tracking-widest">Cocktail {i + 1}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FieldLabel>Nom</FieldLabel>
                      <TextInput value={c.name} onChange={v => setEventCocktail(i, { name: v })} placeholder="Méditerranée" />
                    </div>
                    <div>
                      <FieldLabel>Image</FieldLabel>
                      <ImageUploadField value={c.image} onChange={v => setEventCocktail(i, { image: v })} />
                    </div>
                  </div>
                  {c.image && (
                    <div className="relative h-20 rounded-xl overflow-hidden border border-white/8">
                      <Image src={c.image} alt={c.name} fill className="object-cover" unoptimized />
                    </div>
                  )}
                  <div>
                    <FieldLabel>Description</FieldLabel>
                    <TextArea value={c.description} onChange={v => setEventCocktail(i, { description: v })} rows={2} placeholder="Un cocktail..." />
                  </div>
                  <div>
                    <FieldLabel>Ingrédients (un par ligne)</FieldLabel>
                    <TextArea
                      value={c.ingredients.join('\n')}
                      onChange={v => setEventCocktail(i, { ingredients: v.split('\n') })}
                      rows={3}
                      placeholder={"Gin\nCitron vert\nThym frais"}
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={addEventCocktail}
                className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-[#C9A96E]/25 rounded-xl text-[#C9A96E]/60 hover:text-[#C9A96E] hover:border-[#C9A96E]/50 transition-all text-sm"
              >
                <Plus size={15} />Ajouter un cocktail
              </button>
            </div>
          </AccordionSection>

          {/* ── GALLERY ── */}
          <AccordionSection id="gallery" label="🖼️  Galerie photos" open={openAccordions.has('gallery')} onToggle={() => toggleAccordion('gallery')}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contentData.gallery.map((g, i) => (
                  <div key={i} className="border border-white/8 rounded-xl p-4 space-y-3 relative">
                    <button
                      onClick={() => removeGalleryItem(i)}
                      className="absolute top-3 right-3 text-red-400/60 hover:text-red-400 transition-colors"
                    >
                      <X size={14} />
                    </button>
                    <p className="text-white/30 text-xs">Photo {i + 1}</p>
                    <ImageUploadField value={g.src} onChange={v => setGalleryItem(i, { src: v })} />
                    <TextInput value={g.alt} onChange={v => setGalleryItem(i, { alt: v })} placeholder="Description alt" />
                    {g.src && (
                      <div className="relative aspect-square rounded-lg overflow-hidden border border-white/8">
                        <Image src={g.src} alt={g.alt || ''} fill className="object-cover" unoptimized />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addGalleryItem}
                className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-[#C9A96E]/25 rounded-xl text-[#C9A96E]/60 hover:text-[#C9A96E] hover:border-[#C9A96E]/50 transition-all text-sm"
              >
                <Plus size={15} />Ajouter une photo
              </button>
            </div>
          </AccordionSection>

          {/* Save button bottom */}
          <div className="pt-4 pb-16">
            <button
              onClick={saveContent}
              disabled={contentSaving}
              className="w-full py-4 bg-[#C9A96E] hover:bg-[#b8935a] disabled:opacity-60 text-[#080E0C] font-semibold rounded-xl transition-all text-sm shadow-lg shadow-[#C9A96E]/20 flex items-center justify-center gap-2"
            >
              {contentSaving ? <div className="w-4 h-4 border-2 border-[#080E0C]/25 border-t-[#080E0C] rounded-full animate-spin" /> : null}
              Enregistrer toutes les modifications
            </button>
          </div>
        </main>
      </div>
    )
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────────────────────

  const cocktailItems = cocktailData ? cocktailData[cocktailTab] : []

  return (
    <div className="min-h-screen bg-[#080E0C] text-white">

      {/* ── Header ── */}
      <header className="border-b border-[#C9A96E]/15 bg-[#080E0C]/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1.5 text-white/40 hover:text-[#C9A96E] transition-colors text-sm">
              <ChevronLeft size={16} /><span>Site</span>
            </Link>
            <span className="text-white/15">|</span>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full border border-[#C9A96E]/40 bg-[#0D1612] flex items-center justify-center">
                <span className="text-[#C9A96E] text-xs font-bold font-serif">G</span>
              </div>
              <span className="text-white font-semibold text-sm tracking-wide">Good Old Drinks</span>
              <span className="text-[#C9A96E]/50 text-xs uppercase tracking-widest">Dashboard</span>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-white/40 hover:text-red-400 transition-colors text-sm">
            <LogOut size={15} /><span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>

        {/* Section nav */}
        <div className="max-w-7xl mx-auto px-6 flex gap-0 border-t border-[#C9A96E]/8">
          {([
            { key: 'cocktails' as MainSection, label: 'Cocktails', icon: GlassWater },
            { key: 'realisations' as MainSection, label: 'Réalisations', icon: CalendarDays },
            { key: 'partenaires' as MainSection, label: 'Partenaires', icon: Handshake },
          ]).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSection(key)}
              className={[
                'flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-all duration-200',
                section === key
                  ? 'border-[#C9A96E] text-[#C9A96E]'
                  : 'border-transparent text-white/40 hover:text-white/70',
              ].join(' ')}
            >
              <Icon size={14} />{label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">

        {fetchError && (
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/8 px-5 py-4">
            <span className="mt-0.5 text-red-400 text-base leading-none">⚠</span>
            <div>
              <p className="text-red-400 text-sm font-medium">Erreur de connexion à la base de données</p>
              <p className="text-red-400/60 text-xs mt-1 font-mono break-all">{fetchError}</p>
              <button
                onClick={() => { setFetchError(null); fetchCocktails() }}
                className="mt-2 text-xs text-red-400 hover:text-red-300 underline underline-offset-2"
              >
                Réessayer
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-40">
            <div className="w-10 h-10 border-2 border-[#C9A96E]/20 border-t-[#C9A96E] rounded-full animate-spin" />
          </div>
        ) : section === 'cocktails' ? (

          /* ══════════════ COCKTAILS SECTION ══════════════ */
          <>
            <div className="mb-10">
              <h1 className="text-4xl font-serif font-light tracking-wide">
                Gestion des <span className="text-[#C9A96E]">Cocktails</span>
              </h1>
              <p className="text-white/40 mt-2 text-sm">Gérez votre carte de cocktails, mocktails et classiques.</p>
            </div>

            {cocktailData && (
              <div className="grid grid-cols-3 gap-4 mb-10">
                {COCKTAIL_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setCocktailTab(tab.key)}
                    className={[
                      'relative rounded-xl border p-5 text-left transition-all duration-200',
                      cocktailTab === tab.key
                        ? 'border-[#C9A96E]/40 bg-[#C9A96E]/5'
                        : 'border-white/8 bg-[#0D1612] hover:border-[#C9A96E]/20',
                    ].join(' ')}
                  >
                    <p className={cocktailTab === tab.key ? 'text-4xl font-serif font-light mb-1 text-[#C9A96E]' : 'text-4xl font-serif font-light mb-1 text-white/60'}>
                      {cocktailData[tab.key].length}
                    </p>
                    <p className={cocktailTab === tab.key ? 'text-xs uppercase tracking-widest text-[#C9A96E]/70' : 'text-xs uppercase tracking-widest text-white/30'}>
                      {tab.label}
                    </p>
                    {cocktailTab === tab.key && (
                      <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-gradient-to-r from-transparent via-[#C9A96E]/60 to-transparent" />
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-end justify-between mb-8 border-b border-white/8">
              <div className="flex gap-8">
                {COCKTAIL_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setCocktailTab(tab.key)}
                    className={[
                      'pb-3 text-sm font-medium transition-all duration-200 relative whitespace-nowrap',
                      cocktailTab === tab.key ? 'text-[#C9A96E]' : 'text-white/40 hover:text-white/70',
                    ].join(' ')}
                  >
                    {tab.label}
                    {cocktailTab === tab.key && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A96E] rounded-full" />
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={openAddCocktail}
                className="mb-3 flex items-center gap-2 bg-[#C9A96E] hover:bg-[#b8935a] text-[#080E0C] font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-[#C9A96E]/20"
              >
                <Plus size={16} />Ajouter un cocktail
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cocktailItems.map((item) => (
                <div key={item.id} className="group bg-[#0D1612] border border-white/8 rounded-2xl overflow-hidden hover:border-[#C9A96E]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#C9A96E]/5 hover:-translate-y-0.5">
                  <div className="relative h-44 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1612] via-[#0D1612]/20 to-transparent" />
                    <span className="absolute top-3 right-3 bg-[#080E0C]/75 backdrop-blur-sm text-[#C9A96E] text-xs px-2.5 py-1 rounded-full border border-[#C9A96E]/20">{item.year}</span>
                    <h3 className="absolute bottom-3 left-4 text-white text-lg font-serif drop-shadow-lg">{item.name}</h3>
                  </div>
                  <div className="p-4">
                    <p className="text-white/45 text-xs leading-relaxed line-clamp-2 min-h-[2.5rem]">{item.description}</p>
                    <div className="flex items-center gap-2.5 mt-4">
                      <button onClick={() => openEditCocktail(item)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-amber-500/20 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/35 transition-all duration-200 text-xs font-medium">
                        <Pencil size={13} />Modifier
                      </button>
                      <button onClick={() => deleteCocktail(item)} disabled={deleteId === item.id} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/35 transition-all duration-200 text-xs font-medium disabled:opacity-50">
                        {deleteId === item.id ? <div className="w-3.5 h-3.5 border border-red-400/30 border-t-red-400 rounded-full animate-spin" /> : <Trash2 size={13} />}
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {cocktailItems.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-28 text-center">
                  <div className="w-16 h-16 rounded-full border border-[#C9A96E]/15 bg-[#0D1612] flex items-center justify-center mb-5">
                    <Plus size={24} className="text-[#C9A96E]/30" />
                  </div>
                  <p className="text-white/35 text-sm">Aucun cocktail dans cette catégorie.</p>
                  <button onClick={openAddCocktail} className="mt-3 text-[#C9A96E] hover:text-[#C9A96E]/60 text-sm transition-colors underline underline-offset-4">Ajouter le premier</button>
                </div>
              )}
            </div>
          </>

        ) : section === 'partenaires' ? (

          /* ══════════════ PARTENAIRES SECTION ══════════════ */
          <>
            <div className="mb-10 flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-4xl font-serif font-light tracking-wide">
                  Nos <span className="text-[#C9A96E]">Partenaires</span>
                </h1>
                <p className="text-white/40 mt-2 text-sm">Gérez les partenaires affichés sur la page <a href="/partenaires" target="_blank" className="text-[#C9A96E]/60 hover:text-[#C9A96E] underline underline-offset-2 transition-colors">/partenaires</a>.</p>
              </div>
              <button
                onClick={openAddPartenaire}
                className="flex items-center gap-2 bg-[#C9A96E] hover:bg-[#b8935a] text-[#080E0C] font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-[#C9A96E]/20 self-center"
              >
                <Plus size={16} />Ajouter un partenaire
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <div className="inline-flex items-center gap-4 rounded-xl border border-[#C9A96E]/20 bg-[#C9A96E]/5 px-6 py-4">
                <p className="text-4xl font-serif font-light text-[#C9A96E]">{partenaires.length}</p>
                <p className="text-xs uppercase tracking-widest text-[#C9A96E]/70">Partenaire{partenaires.length > 1 ? 's' : ''} publié{partenaires.length > 1 ? 's' : ''}</p>
              </div>
              <div className="inline-flex items-center gap-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-6 py-4">
                <p className="text-4xl font-serif font-light text-yellow-400">{partenaires.filter(p => p.featured).length}<span className="text-xl text-yellow-400/50">/4</span></p>
                <p className="text-xs uppercase tracking-widest text-yellow-400/70">En vitrine<br/>sur l'accueil</p>
              </div>
            </div>

            <Divider />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {partenaires.map((item) => (
                <div key={item.id} className={`group bg-[#0D1612] border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${item.featured ? 'border-yellow-500/40 hover:border-yellow-500/60 shadow-yellow-500/5' : 'border-white/8 hover:border-[#C9A96E]/25 hover:shadow-[#C9A96E]/5'}`}>
                  {/* Logo preview */}
                  <div className="relative h-32 bg-[#080E0C] flex items-center justify-center p-6 overflow-hidden">
                    <Image src={item.logo} alt={item.name} fill className="object-contain p-6 brightness-0 invert opacity-70 group-hover:opacity-95 transition-opacity duration-300" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" unoptimized />
                    {item.featured && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-yellow-500/15 border border-yellow-500/30 rounded-full px-2 py-0.5">
                        <Star size={9} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-yellow-400 text-[0.6rem] uppercase tracking-wider">Vitrine</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-serif text-base mb-1 line-clamp-1">{item.name}</h3>
                    {item.website && (
                      <p className="text-[#C9A96E]/50 text-xs mb-2 truncate">🔗 {item.website}</p>
                    )}
                    <p className="text-white/40 text-xs leading-relaxed line-clamp-2 min-h-[2.5rem]">{item.description}</p>
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() => toggleFeatured(item)}
                        title={item.featured ? 'Retirer de la vitrine' : 'Afficher sur l\'accueil'}
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border transition-all duration-200 text-xs font-medium ${item.featured ? 'border-yellow-500/40 text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20' : 'border-white/10 text-white/35 hover:text-yellow-400 hover:border-yellow-500/30 hover:bg-yellow-500/5'}`}
                      >
                        <Star size={13} className={item.featured ? 'fill-yellow-400' : ''} />
                      </button>
                      <button onClick={() => openEditPartenaire(item)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-amber-500/20 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/35 transition-all duration-200 text-xs font-medium">
                        <Pencil size={13} />Modifier
                      </button>
                      <button onClick={() => deletePartenaire(item)} disabled={deleteId === item.id} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/35 transition-all duration-200 text-xs font-medium disabled:opacity-50">
                        {deleteId === item.id ? <div className="w-3.5 h-3.5 border border-red-400/30 border-t-red-400 rounded-full animate-spin" /> : <Trash2 size={13} />}
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {partenaires.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-28 text-center">
                  <div className="w-16 h-16 rounded-full border border-[#C9A96E]/15 bg-[#0D1612] flex items-center justify-center mb-5">
                    <Handshake size={24} className="text-[#C9A96E]/30" />
                  </div>
                  <p className="text-white/35 text-sm">Aucun partenaire publié.</p>
                  <button onClick={openAddPartenaire} className="mt-3 text-[#C9A96E] hover:text-[#C9A96E]/60 text-sm transition-colors underline underline-offset-4">Ajouter le premier</button>
                </div>
              )}
            </div>
          </>

        ) : (

          /* ══════════════ RÉALISATIONS SECTION ══════════════ */
          <>
            <div className="mb-10 flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-4xl font-serif font-light tracking-wide">
                  Nos <span className="text-[#C9A96E]">Réalisations</span>
                </h1>
                <p className="text-white/40 mt-2 text-sm">Gérez les cartes et le contenu de chaque réalisation.</p>
              </div>
              <button
                onClick={openAddReal}
                className="flex items-center gap-2 bg-[#C9A96E] hover:bg-[#b8935a] text-[#080E0C] font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-[#C9A96E]/20 self-center"
              >
                <Plus size={16} />Ajouter une réalisation
              </button>
            </div>

            <div className="inline-flex items-center gap-4 rounded-xl border border-[#C9A96E]/20 bg-[#C9A96E]/5 px-6 py-4 mb-10">
              <p className="text-4xl font-serif font-light text-[#C9A96E]">{reals.length}</p>
              <p className="text-xs uppercase tracking-widest text-[#C9A96E]/70">Réalisation{reals.length > 1 ? 's' : ''} publiée{reals.length > 1 ? 's' : ''}</p>
            </div>

            <Divider />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reals.map((item) => {
                return (
                  <div key={item.id} className="group bg-[#0D1612] border border-white/8 rounded-2xl overflow-hidden hover:border-[#C9A96E]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#C9A96E]/5 hover:-translate-y-0.5">
                    <div className="relative h-44 overflow-hidden">
                      <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" unoptimized />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1612] via-[#0D1612]/20 to-transparent" />
                      <span className="absolute top-3 left-3 bg-[#080E0C]/75 backdrop-blur-sm text-[#C9A96E] text-xs px-2.5 py-1 rounded-full border border-[#C9A96E]/20">{item.date}</span>
                      {item.path && item.path !== '#' && (
                        <Link href={item.path} target="_blank" className="absolute top-3 right-3 bg-[#C9A96E]/15 backdrop-blur-sm text-[#C9A96E]/80 hover:text-[#C9A96E] text-xs px-2.5 py-1 rounded-full border border-[#C9A96E]/20 transition-colors">
                          Voir →
                        </Link>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-serif text-base mb-1 line-clamp-1">{item.title}</h3>
                      <p className="text-[#C9A96E]/60 text-xs mb-2">📍 {item.location}</p>
                      <p className="text-white/40 text-xs leading-relaxed line-clamp-2 min-h-[2.5rem]">{item.description}</p>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 mt-4">
                        <button onClick={() => openContentEditor(item)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-amber-500/20 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/35 transition-all duration-200 text-xs font-medium">
                          <Pencil size={13} />Modifier
                        </button>
                        <button onClick={() => deleteReal(item)} disabled={deleteId === item.id} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/35 transition-all duration-200 text-xs font-medium disabled:opacity-50">
                          {deleteId === item.id ? <div className="w-3.5 h-3.5 border border-red-400/30 border-t-red-400 rounded-full animate-spin" /> : <Trash2 size={13} />}
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
              {reals.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-28 text-center">
                  <div className="w-16 h-16 rounded-full border border-[#C9A96E]/15 bg-[#0D1612] flex items-center justify-center mb-5">
                    <Plus size={24} className="text-[#C9A96E]/30" />
                  </div>
                  <p className="text-white/35 text-sm">Aucune réalisation publiée.</p>
                  <button onClick={openAddReal} className="mt-3 text-[#C9A96E] hover:text-[#C9A96E]/60 text-sm transition-colors underline underline-offset-4">Ajouter la première</button>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* ════════════════ COCKTAIL MODAL ════════════════ */}
      {cocktailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md" onClick={(e) => { if (e.target === e.currentTarget) closeCocktailModal() }}>
          <div className="w-full max-w-lg bg-[#0D1612] border border-[#C9A96E]/25 rounded-2xl shadow-2xl shadow-black/80">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#C9A96E]/12">
              <div>
                <h2 className="text-white text-lg font-semibold">{editingCocktail ? 'Modifier le cocktail' : 'Ajouter un cocktail'}</h2>
                <p className="text-[#C9A96E]/45 text-xs mt-0.5 uppercase tracking-widest">{COCKTAIL_TABS.find(t => t.key === cocktailTab)?.label}</p>
              </div>
              <button onClick={closeCocktailModal} className="text-white/30 hover:text-white/80 transition-colors p-2 rounded-xl hover:bg-white/5"><X size={18} /></button>
            </div>
            <form onSubmit={saveCocktail} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Nom *</label>
                  <input type="text" value={cocktailForm.name} onChange={e => setCocktailForm(f => ({ ...f, name: e.target.value }))} required placeholder="Ex : Green Flag" className="w-full bg-[#080E0C] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A96E]/40 transition-colors" />
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Année *</label>
                  <input type="text" value={cocktailForm.year} onChange={e => setCocktailForm(f => ({ ...f, year: e.target.value }))} required placeholder="Est. 2024" className="w-full bg-[#080E0C] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A96E]/40 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Image *</label>
                <ImageUploadField value={cocktailForm.image} onChange={v => setCocktailForm(f => ({ ...f, image: v }))} />
              </div>
              {cocktailForm.image && (
                <div className="relative h-32 rounded-xl overflow-hidden border border-white/8">
                  <Image src={cocktailForm.image} alt="Aperçu" fill className="object-cover" unoptimized />
                </div>
              )}
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Ingrédients *</label>
                <textarea value={cocktailForm.description} onChange={e => setCocktailForm(f => ({ ...f, description: e.target.value }))} required rows={3} placeholder="Gin, citron vert, sirop maison..." className="w-full bg-[#080E0C] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A96E]/40 transition-colors resize-none" />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={closeCocktailModal} className="flex-1 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all duration-200 text-sm font-medium">Annuler</button>
                <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-[#C9A96E] hover:bg-[#b8935a] text-[#080E0C] font-semibold transition-all duration-200 text-sm disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-[#C9A96E]/20">
                  {saving ? <div className="w-4 h-4 border-2 border-[#080E0C]/25 border-t-[#080E0C] rounded-full animate-spin" /> : (editingCocktail ? 'Enregistrer' : 'Ajouter')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════════ PARTENAIRE MODAL ════════════════ */}
      {partenaireModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md" onClick={(e) => { if (e.target === e.currentTarget) closePartenaireModal() }}>
          <div className="w-full max-w-lg bg-[#0D1612] border border-[#C9A96E]/25 rounded-2xl shadow-2xl shadow-black/80 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#C9A96E]/12 sticky top-0 bg-[#0D1612] z-10">
              <div>
                <h2 className="text-white text-lg font-semibold">{editingPartenaire ? 'Modifier le partenaire' : 'Ajouter un partenaire'}</h2>
                <p className="text-[#C9A96E]/45 text-xs mt-0.5 uppercase tracking-widest">Partenaires</p>
              </div>
              <button onClick={closePartenaireModal} className="text-white/30 hover:text-white/80 transition-colors p-2 rounded-xl hover:bg-white/5"><X size={18} /></button>
            </div>
            <form onSubmit={savePartenaire} className="p-6 space-y-5">
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Nom *</label>
                <input type="text" value={partenaireForm.name} onChange={e => setPartenaireForm(f => ({ ...f, name: e.target.value }))} required placeholder="Ex : Groupe BMC" className="w-full bg-[#080E0C] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A96E]/40 transition-colors" />
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Logo *</label>
                <ImageUploadField value={partenaireForm.logo} onChange={v => setPartenaireForm(f => ({ ...f, logo: v }))} />
                {partenaireForm.logo && (
                  <div className="relative h-20 mt-3 rounded-xl overflow-hidden border border-white/8 bg-[#080E0C] flex items-center justify-center p-4">
                    <Image src={partenaireForm.logo} alt="Aperçu logo" fill className="object-contain p-4 brightness-0 invert opacity-80" unoptimized />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Description <span className="normal-case text-white/20">(optionnel)</span></label>
                <textarea value={partenaireForm.description} onChange={e => setPartenaireForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="Description du partenaire..." className="w-full bg-[#080E0C] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A96E]/40 transition-colors resize-none" />
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Site web <span className="normal-case text-white/20">(optionnel)</span></label>
                <input type="url" value={partenaireForm.website} onChange={e => setPartenaireForm(f => ({ ...f, website: e.target.value }))} placeholder="https://exemple.com" className="w-full bg-[#080E0C] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A96E]/40 transition-colors" />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={closePartenaireModal} className="flex-1 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all duration-200 text-sm font-medium">Annuler</button>
                <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-[#C9A96E] hover:bg-[#b8935a] text-[#080E0C] font-semibold transition-all duration-200 text-sm disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-[#C9A96E]/20">
                  {saving ? <div className="w-4 h-4 border-2 border-[#080E0C]/25 border-t-[#080E0C] rounded-full animate-spin" /> : (editingPartenaire ? 'Enregistrer' : 'Ajouter')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════════ RÉALISATION MODAL ════════════════ */}
      {realModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md" onClick={(e) => { if (e.target === e.currentTarget) closeRealModal() }}>
          <div className="w-full max-w-lg bg-[#0D1612] border border-[#C9A96E]/25 rounded-2xl shadow-2xl shadow-black/80 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#C9A96E]/12 sticky top-0 bg-[#0D1612] z-10">
              <div>
                <h2 className="text-white text-lg font-semibold">{editingReal ? 'Modifier la réalisation' : 'Ajouter une réalisation'}</h2>
                <p className="text-[#C9A96E]/45 text-xs mt-0.5 uppercase tracking-widest">Nos Dernières Réalisations</p>
              </div>
              <button onClick={closeRealModal} className="text-white/30 hover:text-white/80 transition-colors p-2 rounded-xl hover:bg-white/5"><X size={18} /></button>
            </div>
            <form onSubmit={saveReal} className="p-6 space-y-5">
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Titre *</label>
                <input type="text" value={realForm.title} onChange={e => setRealForm(f => ({ ...f, title: e.target.value }))} required placeholder="Ex : Mariage de Sophie & Thomas" className="w-full bg-[#080E0C] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A96E]/40 transition-colors" />
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Catégorie</label>
                <select value={realForm.category} onChange={e => setRealForm(f => ({ ...f, category: e.target.value }))} className="w-full bg-[#080E0C] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A96E]/40 transition-colors appearance-none cursor-pointer">
                  <option value="">— Aucune —</option>
                  <option value="mariage">Mariage</option>
                  <option value="soiree-privee">Soirée privée</option>
                  <option value="atelier">Atelier</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Date *</label>
                  <input type="text" value={realForm.date} onChange={e => setRealForm(f => ({ ...f, date: e.target.value }))} required placeholder="15 Juin 2025" className="w-full bg-[#080E0C] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A96E]/40 transition-colors" />
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Lieu *</label>
                  <input type="text" value={realForm.location} onChange={e => setRealForm(f => ({ ...f, location: e.target.value }))} required placeholder="Montpellier" className="w-full bg-[#080E0C] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A96E]/40 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Image *</label>
                <ImageUploadField value={realForm.image} onChange={v => setRealForm(f => ({ ...f, image: v }))} />
              </div>
              {realForm.image && (
                <div className="relative h-32 rounded-xl overflow-hidden border border-white/8">
                  <Image src={realForm.image} alt="Aperçu" fill className="object-cover" unoptimized />
                </div>
              )}
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Sous-titre <span className="normal-case text-white/20">(optionnel)</span></label>
                <input type="text" value={realForm.subtitle} onChange={e => setRealForm(f => ({ ...f, subtitle: e.target.value }))} placeholder="Ex: Villa de Luxe · 80 invités" className="w-full bg-[#080E0C] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A96E]/40 transition-colors" />
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Description *</label>
                <textarea value={realForm.description} onChange={e => setRealForm(f => ({ ...f, description: e.target.value }))} required rows={3} placeholder="Un moment unique pour..." className="w-full bg-[#080E0C] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A96E]/40 transition-colors resize-none" />
              </div>
              {editingReal && realForm.path && (
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Lien vers la page</label>
                  <div className="w-full bg-[#080E0C] border border-white/5 rounded-xl px-4 py-2.5 text-white/40 text-sm font-mono">{realForm.path}</div>
                </div>
              )}
              {!editingReal && (
                <p className="text-white/25 text-xs">La page dédiée sera créée automatiquement à partir du titre.</p>
              )}
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={closeRealModal} className="flex-1 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all duration-200 text-sm font-medium">Annuler</button>
                <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-[#C9A96E] hover:bg-[#b8935a] text-[#080E0C] font-semibold transition-all duration-200 text-sm disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-[#C9A96E]/20">
                  {saving ? <div className="w-4 h-4 border-2 border-[#080E0C]/25 border-t-[#080E0C] rounded-full animate-spin" /> : (editingReal ? 'Enregistrer' : 'Ajouter')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
