'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import type { LanguageStat } from '@/lib/types'

interface LanguageSectionProps {
  stats: LanguageStat[]
}

export default function LanguageSection({ stats }: LanguageSectionProps) {
  const top = stats.slice(0, 10)

  if (top.length === 0) return null

  return (
    <section>
      <h2
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          color: '#00c8ff',
          letterSpacing: '0.15em',
          fontSize: '0.7rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
          textShadow: '0 0 10px rgba(0, 200, 255, 0.4)',
        }}
      >
        // Languages
        <span
          style={{
            display: 'block',
            marginTop: '6px',
            width: '2rem',
            height: '1px',
            backgroundColor: '#00c8ff',
            boxShadow: '0 0 6px rgba(0, 200, 255, 0.6)',
          }}
        />
      </h2>
      <div
        style={{
          borderRadius: '2px',
          padding: '1.5rem',
          border: '1px solid rgba(0, 200, 255, 0.12)',
          backgroundColor: '#0a0a1e',
        }}
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-64 h-64 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={top}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {top.map((lang) => (
                    <Cell key={lang.name} fill={lang.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null
                    const d = payload[0].payload as LanguageStat
                    return (
                      <div
                        style={{
                          borderRadius: '2px',
                          padding: '8px 12px',
                          fontSize: '0.8rem',
                          backgroundColor: '#0d0d24',
                          border: '1px solid rgba(0, 200, 255, 0.2)',
                          color: '#a0b8cc',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        <span style={{ color: d.color, fontWeight: 600 }}>
                          {d.name}
                        </span>
                        <div style={{ color: '#304050', fontSize: '0.7rem' }}>
                          {d.count} repos · {d.rate}%
                        </div>
                      </div>
                    )
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 w-full space-y-2">
            {top.map((lang) => (
              <div key={lang.name} className="flex items-center gap-3">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: lang.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className="text-sm font-mono truncate"
                      style={{ color: '#a0b8cc' }}
                    >
                      {lang.name}
                    </span>
                    <span
                      className="text-xs font-mono ml-2"
                      style={{ color: '#2a3a4a' }}
                    >
                      {lang.rate}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: '3px',
                      overflow: 'hidden',
                      backgroundColor: '#0d0d24',
                      borderRadius: '1px',
                    }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${lang.rate}%`,
                        backgroundColor: lang.color,
                      }}
                    />
                  </div>
                </div>
                <span
                  className="text-xs font-mono w-6 text-right shrink-0"
                  style={{ color: '#484848' }}
                >
                  {lang.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
