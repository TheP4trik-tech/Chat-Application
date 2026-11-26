export function textGradient(from, to, deg = 45) {
  return {
    backgroundImage: `linear-gradient(${deg}deg, var(--mantine-color-${from}-6), var(--mantine-color-${to}-6))`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  }
}
