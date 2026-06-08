'use client'

import Link from 'next/link'

interface RecipeCardProps {
  id: string
  title: string
  serves: number
  timeMinutes: number
  calories: number
  tags: string[]
  imageUrl?: string
}

export function RecipeCard({ id, title, serves, timeMinutes, calories, tags, imageUrl }: RecipeCardProps) {
  return (
    <Link href={`/library/${id}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div
        style={{
          position: 'relative',
          height: '380px',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#888888',
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}

        {/* Progressive blur — bottom 50%, fades from 100px at base to 0px at top */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)',
            backdropFilter: 'blur(100px)',
            WebkitBackdropFilter: 'blur(100px)',
            maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
          } as React.CSSProperties}
        />

        {/* Text content */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '20px',
          }}
        >
          <h2
            style={{
              fontFamily: "'Work Sans', sans-serif",
              fontSize: '26px',
              fontWeight: 600,
              color: '#ffffff',
              margin: 0,
              marginBottom: '6px',
              lineHeight: 1.2,
            }}
          >
            {title}
          </h2>

          <p
            style={{
              fontFamily: "'Work Sans', sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: '#ffffff',
              opacity: 0.9,
              margin: 0,
            }}
          >
            Serves {serves}&nbsp;&nbsp;|&nbsp;&nbsp;{timeMinutes}mins&nbsp;&nbsp;|&nbsp;&nbsp;{calories} Cal
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '10px',
            }}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#ffffff',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  borderRadius: '9999px',
                  padding: '4px 12px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
