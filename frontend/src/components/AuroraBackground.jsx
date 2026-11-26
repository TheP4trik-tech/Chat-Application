import { motion, useReducedMotion } from 'framer-motion'

// Dedicated clipping layer: keeps the aurora blobs from causing horizontal
// scroll without putting overflow:hidden on the page root, which would
// break PublicNavbar's position:sticky (it would stick to this div's
// scrollport instead of the viewport).
function AuroraBackground() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <motion.div
        animate={prefersReducedMotion ? undefined : { x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(18,184,134,0.55), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        animate={prefersReducedMotion ? undefined : { x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: 440,
          height: 440,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76,110,245,0.5), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        animate={prefersReducedMotion ? undefined : { x: [0, 25, 0], y: [0, 25, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '30%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(190,100,245,0.35), transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
    </div>
  )
}

export default AuroraBackground
