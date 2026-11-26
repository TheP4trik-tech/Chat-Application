import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Group, Paper, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconPhoneFilled, IconVideoFilled } from '@tabler/icons-react'

const script = [
  { from: 'them', text: 'hey! did you see the chattero update? 👀' },
  { from: 'me', text: 'yeah, looks way cleaner now' },
  { from: 'them', text: 'right?? and it feels instant' },
  { from: 'me', text: 'sending you the link rn' },
  { from: 'them', text: 'perfect, on it 🚀' },
]

const TYPING_MS = 1100
const READ_MS = 1700
const RESET_MS = 2600

function TypingDots() {
  return (
    <Group gap={4}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </Group>
  )
}

function Bubble({ from, muted, children }) {
  const isMe = from === 'me'
  return (
    <Group justify={isMe ? 'flex-end' : 'flex-start'} wrap="nowrap" gap={8}>
      {!isMe && (
        <ThemeIcon
          size={26}
          radius="xl"
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 45 }}
          style={{ flexShrink: 0 }}
        >
          <Text size="10px" fw={700} c="white">
            AM
          </Text>
        </ThemeIcon>
      )}
      <Paper
        radius="xl"
        px="md"
        py={8}
        style={{
          maxWidth: '78%',
          background: isMe
            ? 'linear-gradient(135deg, var(--mantine-color-teal-6), var(--mantine-color-blue-6))'
            : 'var(--mantine-color-default-hover)',
          color: isMe ? 'white' : 'var(--mantine-color-text)',
          opacity: muted ? 0.75 : 1,
        }}
      >
        {muted ? <TypingDots /> : <Text size="sm">{children}</Text>}
      </Paper>
    </Group>
  )
}

function ChatMockup() {
  const prefersReducedMotion = useReducedMotion()
  const [step, setStep] = useState(() => (prefersReducedMotion ? script.length : 0))
  const [typingFrom, setTypingFrom] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    let cancelled = false

    function runStep(index) {
      if (cancelled) return

      if (index >= script.length) {
        timerRef.current = setTimeout(() => {
          if (cancelled) return
          setStep(0)
          setTypingFrom(null)
          runStep(0)
        }, RESET_MS)
        return
      }

      setTypingFrom(script[index].from)
      timerRef.current = setTimeout(() => {
        if (cancelled) return
        setTypingFrom(null)
        setStep(index + 1)
        timerRef.current = setTimeout(() => runStep(index + 1), READ_MS)
      }, TYPING_MS)
    }

    runStep(0)
    return () => {
      cancelled = true
      clearTimeout(timerRef.current)
    }
  }, [prefersReducedMotion])

  return (
    <Paper
      withBorder
      radius="lg"
      shadow="md"
      style={{ overflow: 'hidden', background: 'var(--mantine-color-body)' }}
    >
      <Group
        justify="space-between"
        px="md"
        py="sm"
        style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }}
      >
        <Group gap={8}>
          <ThemeIcon size={30} radius="xl" variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 45 }}>
            <Text size="xs" fw={700} c="white">
              AM
            </Text>
          </ThemeIcon>
          <div>
            <Text size="sm" fw={600}>
              Alex Morgan
            </Text>
            <Group gap={4}>
              <motion.span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--mantine-color-teal-6)',
                  display: 'inline-block',
                }}
                animate={prefersReducedMotion ? undefined : { opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <Text size="xs" c="dimmed">
                Online
              </Text>
            </Group>
          </div>
        </Group>
        <Group gap={14} c="dimmed">
          <IconPhoneFilled size={16} />
          <IconVideoFilled size={16} />
        </Group>
      </Group>

      <Stack p="md" gap="sm" justify="flex-end" style={{ minHeight: 280 }}>
        <AnimatePresence initial={false}>
          {script.slice(0, step).map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Bubble from={msg.from}>{msg.text}</Bubble>
            </motion.div>
          ))}
          {typingFrom && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Bubble from={typingFrom} muted />
            </motion.div>
          )}
        </AnimatePresence>
      </Stack>
    </Paper>
  )
}

export default ChatMockup
