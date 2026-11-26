import { useReducedMotion, useSpring, motion } from 'framer-motion'

function Tilt({ children, max = 6 }) {
  const prefersReducedMotion = useReducedMotion()
  const rotateX = useSpring(0, { stiffness: 150, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 })

  if (prefersReducedMotion) return children

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * max)
    rotateX.set((0.5 - (e.clientY - rect.top) / rect.height) * max)
  }
  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  )
}

export default Tilt
