'use client'

interface FilterChipProps {
  label: string
  active: boolean
  onClick: () => void
}

export function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'Work Sans', sans-serif",
        fontSize: '15px',
        fontWeight: 500,
        borderRadius: '9999px',
        padding: '8px 20px',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        border: '1.5px solid #000000',
        backgroundColor: active ? '#000000' : 'transparent',
        color: active ? '#ffffff' : '#000000',
        transition: 'background-color 0.15s ease, color 0.15s ease',
      }}
    >
      {label}
    </button>
  )
}
