import { ImageResponse } from 'next/og'
import { profile } from '@/data/profile'

export const alt = `${profile.name} — ${profile.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#141414',
          padding: '64px 72px',
          position: 'relative',
        }}
      >
        {/* Accent wash */}
        <div
          style={{
            position: 'absolute',
            top: -220,
            left: -160,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background:
              'radial-gradient(circle, rgba(37,99,235,0.42), rgba(37,99,235,0) 68%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -260,
            right: -140,
            width: 680,
            height: 680,
            borderRadius: 9999,
            background:
              'radial-gradient(circle, rgba(125,226,255,0.24), rgba(125,226,255,0) 68%)',
          }}
        />

        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: '#1f1f1f',
              border: '1px solid rgba(153,153,153,0.28)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            RM
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#5da9ff',
            }}
          >
            {profile.role}
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>I build systems</span>
            <span style={{ color: '#8ec8ff' }}>that think &amp; scale.</span>
          </div>
          <div style={{ fontSize: 27, color: '#999999', maxWidth: 900 }}>
            A decade shipping data-driven products across frontend, backend, ML,
            and cloud.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(153,153,153,0.2)',
            paddingTop: 26,
          }}
        >
          <div style={{ fontSize: 26, color: '#e8e8e8', fontWeight: 600 }}>
            {profile.name}
          </div>
          <div style={{ display: 'flex', gap: 28, fontSize: 21, color: '#777777' }}>
            <span>{profile.location}</span>
            <span style={{ color: '#5da9ff' }}>github.com/reymac93</span>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
