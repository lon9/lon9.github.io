import React from 'react'

export function SkeletonBox({
  className = '',
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`animate-pulse rounded ${className}`}
      style={{ backgroundColor: '#141414', ...style }}
    />
  )
}

export function HeroSkeleton() {
  return (
    <div
      className="flex flex-col md:flex-row gap-6 items-start p-8 rounded-2xl"
      style={{
        border: '1px solid rgba(255,255,255,0.06)',
        backgroundColor: '#0d0d0d',
      }}
    >
      <SkeletonBox className="w-32 h-32 rounded-full shrink-0" />
      <div className="flex-1 space-y-3">
        <SkeletonBox className="h-8 w-48" />
        <SkeletonBox className="h-5 w-64" />
        <SkeletonBox className="h-4 w-full max-w-md" />
        <SkeletonBox className="h-4 w-40" />
      </div>
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonBox key={i} className="h-24 rounded-xl" />
      ))}
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div
      className="rounded-xl p-6 space-y-4"
      style={{
        border: '1px solid rgba(255,255,255,0.06)',
        backgroundColor: '#0d0d0d',
      }}
    >
      <SkeletonBox className="h-6 w-40" />
      <div className="flex gap-6">
        <SkeletonBox className="w-48 h-48 rounded-full" />
        <div className="flex-1 space-y-3 pt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonBox
              key={i}
              className="h-5"
              style={{ width: `${80 - i * 10}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function RepoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonBox key={i} className="h-36 rounded-xl" />
      ))}
    </div>
  )
}
