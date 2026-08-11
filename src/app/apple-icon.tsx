import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #252525 0%, #141414 100%)',
          color: '#ffffff',
          fontSize: 82,
          fontWeight: 700,
          letterSpacing: -3,
          position: 'relative',
        }}
      >
        RM
        <div
          style={{
            position: 'absolute',
            top: 30,
            right: 30,
            width: 16,
            height: 16,
            borderRadius: 9999,
            background: '#5da9ff',
          }}
        />
      </div>
    ),
    size,
  )
}
