'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, X } from 'lucide-react'
import { FilterChip } from '@/components/ui/filter-chip'
import { RecipeCard } from '@/components/recipes/recipe-card'

const RECIPES = [
  {
    id: '1',
    title: 'Salmon, Avo & Grains Bowl',
    serves: 2,
    timeMinutes: 30,
    calories: 400,
    tags: ['Healthy', 'Protein', 'Light Meal'],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
  },
  {
    id: '2',
    title: 'Chicken Stir Fry',
    serves: 2,
    timeMinutes: 25,
    calories: 520,
    tags: ['Quick', 'Protein'],
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
  },
  {
    id: '3',
    title: 'Shakshuka',
    serves: 4,
    timeMinutes: 20,
    calories: 380,
    tags: ['Vegetarian', 'Breakfast'],
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
  },
  {
    id: '4',
    title: 'Beef Tacos',
    serves: 4,
    timeMinutes: 40,
    calories: 610,
    tags: ['Dinner', 'Meat'],
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
  },
]

const FILTER_CHIPS = ['All', 'Lunch', 'Dinner', 'Vegetarian', 'Quick', 'Healthy']

export default function LibraryPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRecipes = RECIPES.filter((recipe) => {
    const matchesFilter = activeFilter === 'All' || recipe.tags.includes(activeFilter)
    const matchesSearch = !searchQuery || recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div
      style={{
        fontFamily: "'Work Sans', sans-serif",
        backgroundColor: 'rgba(242, 240, 235, 0.5)',
        minHeight: '100%',
      }}
    >
      {/* Search header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px 0px 20px',
        }}
      >
        {searchOpen ? (
          <input
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes..."
            style={{
              flex: 1,
              fontSize: '28px',
              fontWeight: 400,
              fontFamily: "'Work Sans', sans-serif",
              color: '#000000',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              padding: 0,
            }}
          />
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            style={{
              flex: 1,
              textAlign: 'left',
              fontSize: '28px',
              fontWeight: 400,
              fontFamily: "'Work Sans', sans-serif",
              color: 'rgba(0,0,0,0.5)',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'text',
            }}
          >
            Search recipes...
          </button>
        )}

        {searchOpen ? (
          <button
            onClick={() => { setSearchOpen(false); setSearchQuery('') }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              marginLeft: '12px',
              padding: 0,
            }}
          >
            <X size={24} />
          </button>
        ) : (
          <Link
            href="/library/add"
            style={{
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              marginLeft: '12px',
            }}
          >
            <Plus size={24} />
          </Link>
        )}
      </div>

      {/* Filter chips */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          padding: '16px 20px 0',
          overflowX: 'auto',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        } as React.CSSProperties}
      >
        {FILTER_CHIPS.map((chip) => (
          <FilterChip
            key={chip}
            label={chip}
            active={activeFilter === chip}
            onClick={() => setActiveFilter(chip)}
          />
        ))}
      </div>

      {/* Recipe cards */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          paddingTop: '16px',
          paddingBottom: '80px',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}

        {filteredRecipes.length === 0 && (
          <p
            style={{
              fontFamily: "'Work Sans', sans-serif",
              fontSize: '16px',
              color: 'rgba(0,0,0,0.4)',
              textAlign: 'center',
              marginTop: '40px',
            }}
          >
            No recipes found.
          </p>
        )}
      </div>
    </div>
  )
}
