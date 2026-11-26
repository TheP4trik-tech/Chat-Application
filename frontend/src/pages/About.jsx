import { useRef } from 'react'
import { Link } from 'react-router'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Badge, Box, Button, Container, Group, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import {
  IconArrowRight,
  IconBoltFilled,
  IconDeviceMobile,
  IconLockFilled,
  IconMessageCircle2Filled,
  IconMoonStars,
  IconSearch,
  IconSend2,
  IconSparklesFilled,
  IconUserPlus,
  IconUsers,
} from '@tabler/icons-react'
import PublicNavbar from '../components/PublicNavbar.jsx'
import ChatMockup from '../components/ChatMockup.jsx'
import BackToTopButton from '../components/BackToTopButton.jsx'
import AuroraBackground from '../components/AuroraBackground.jsx'
import Tilt from '../components/Tilt.jsx'
import { heroGradient } from '../theme.js'
import { textGradient } from '../utils/textGradient.js'
import styles from './About.module.css'

function RevealWords({ text, delay = 0, gradient }) {
  const prefersReducedMotion = useReducedMotion()
  const gradientStyle = gradient ? textGradient(gradient.from, gradient.to, gradient.deg) : {}

  if (prefersReducedMotion) {
    return <span style={gradientStyle}>{text}</span>
  }

  return (
    <>
      {text.split(' ').map((word, index) => (
        <span key={index} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
          <motion.span
            style={{ display: 'inline-block', ...gradientStyle }}
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: delay + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </>
  )
}

function Magnetic({ children, strength = 0.3 }) {
  const prefersReducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 12, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 150, damping: 12, mass: 0.2 })

  if (prefersReducedMotion) return children

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  )
}

function FloatingBadge({ icon: Icon, text, style, delay = 0 }) {
  return (
    <Box visibleFrom="sm" style={{ position: 'absolute', zIndex: 2, ...style }}>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      >
        <Paper withBorder radius="xl" px="sm" py={6} shadow="sm" style={{ background: 'var(--mantine-color-body)' }}>
          <Group gap={6} wrap="nowrap">
            <ThemeIcon size={20} radius="xl" variant="light" color="teal">
              <Icon size={12} />
            </ThemeIcon>
            <Text size="xs" fw={600}>
              {text}
            </Text>
          </Group>
        </Paper>
      </motion.div>
    </Box>
  )
}

function BentoCard({ icon: Icon, title, description, gradient, span }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(20,184,166,0.14), transparent 70%)`

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.div className={span} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <Paper
        withBorder
        radius="lg"
        p="xl"
        onMouseMove={handleMouseMove}
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          background: 'var(--mantine-color-default)',
          borderColor: 'var(--mantine-color-default-border)',
        }}
      >
        <motion.div style={{ position: 'absolute', inset: 0, background: spotlight, pointerEvents: 'none' }} />
        <Stack gap="sm" justify="space-between" style={{ position: 'relative', height: '100%' }}>
          <ThemeIcon size={46} radius="md" variant="gradient" gradient={gradient}>
            <Icon size={24} />
          </ThemeIcon>
          <div>
            <Title order={3} fw={600} size="h4" mb={6}>
              {title}
            </Title>
            <Text c="dimmed" size="sm" lh={1.6}>
              {description}
            </Text>
          </div>
        </Stack>
      </Paper>
    </motion.div>
  )
}

function Step({ number, icon: Icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Stack gap="xs" style={{ position: 'relative' }}>
        <Text
          fw={800}
          style={{
            position: 'absolute',
            top: -28,
            left: -4,
            fontSize: 72,
            lineHeight: 1,
            color: 'var(--mantine-color-default-border)',
            userSelect: 'none',
            zIndex: 0,
          }}
        >
          {number}
        </Text>
        <ThemeIcon size={44} radius="xl" variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 45 }} style={{ position: 'relative', zIndex: 1 }}>
          <Icon size={22} />
        </ThemeIcon>
        <Title order={3} fw={600} size="h4" style={{ position: 'relative', zIndex: 1 }}>
          {title}
        </Title>
        <Text c="dimmed" size="sm" lh={1.6} style={{ position: 'relative', zIndex: 1 }}>
          {description}
        </Text>
      </Stack>
    </motion.div>
  )
}

const bentoFeatures = [
  {
    icon: IconBoltFilled,
    gradient: { from: 'teal', to: 'blue', deg: 45 },
    title: 'Real-time feel',
    span: styles.bentoWide,
    description:
      "Messages land the moment you hit send — no refresh, no spinner, no waiting around. Conversations should flow, not load.",
  },
  {
    icon: IconLockFilled,
    gradient: { from: 'blue', to: 'teal', deg: 135 },
    title: 'Secure by default',
    span: styles.bentoTall,
    description:
      "Every chat is scoped to exactly two people and backed by JWT-based auth under the hood, so there's no guessing who can read what.",
  },
  {
    icon: IconSparklesFilled,
    gradient: { from: 'teal', to: 'blue', deg: 225 },
    title: 'Simple & fast',
    span: styles.bentoNormal,
    description: 'No algorithmic feed, no read-receipt theatrics. Just you and the person you are talking to.',
  },
  {
    icon: IconMoonStars,
    gradient: { from: 'blue', to: 'teal', deg: 315 },
    title: 'Easy on the eyes',
    span: styles.bentoNormal,
    description: 'Full dark mode support that follows your system, so late-night chats stay comfortable.',
  },
]

const steps = [
  {
    icon: IconUserPlus,
    title: 'Create your account',
    description: 'Sign up in seconds — just an email and a password. No forms, no fuss.',
  },
  {
    icon: IconSearch,
    title: 'Find someone to talk to',
    description: 'Search the people you already know and open a conversation instantly.',
  },
  {
    icon: IconSend2,
    title: 'Just start chatting',
    description: 'No noise, no feed, no distractions — only the conversation that matters.',
  },
]

const marqueeItems = [
  { icon: IconBoltFilled, text: 'Instant delivery' },
  { icon: IconLockFilled, text: 'JWT-secured' },
  { icon: IconUsers, text: 'One-on-one, always' },
  { icon: IconMoonStars, text: 'Dark mode included' },
  { icon: IconSparklesFilled, text: 'Zero clutter' },
  { icon: IconDeviceMobile, text: 'Works on any device' },
]

function About() {
  const featuresRef = useRef(null)
  const scrollToFeatures = () => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })
  const { scrollYProgress } = useScroll()
  const dotLeft = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      style={{
        background: heroGradient,
        position: 'relative',
      }}
    >
      <AuroraBackground />

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: 'var(--mantine-color-default-border)',
          zIndex: 200,
        }}
      >
        <motion.div
          style={{
            scaleX: scrollYProgress,
            transformOrigin: '0% 0%',
            height: '100%',
            background: 'linear-gradient(90deg, var(--mantine-color-teal-6), var(--mantine-color-blue-6))',
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: dotLeft,
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'var(--mantine-color-blue-6)',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 0 3px rgba(76,110,245,0.25)',
          }}
        />
      </div>
      <PublicNavbar onFeaturesClick={scrollToFeatures} />

      {/* Hero */}
      <Container size="lg" py={{ base: 60, md: 100 }} style={{ position: 'relative' }}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 50, md: 70 }} verticalSpacing={50}>
          <Stack gap="md" justify="center" align={{ base: 'center', md: 'flex-start' }} ta={{ base: 'center', md: 'left' }}>
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Badge variant="light" color="teal" radius="xl" size="lg" leftSection={<IconSparklesFilled size={12} />}>
                Private messaging, made simple
              </Badge>
            </motion.div>

            <Title order={1} fw={700} fz={{ base: 34, sm: 48 }} lh={1.1}>
              <RevealWords text="Chattero is messaging," />
              <br />
              <RevealWords text="minus the noise." delay={0.3} gradient={{ from: 'teal', to: 'blue', deg: 45 }} />
            </Title>

            <Text size="lg" c="dimmed" maw={480}>
              No feeds, no read-receipt theatrics, no ads. Just fast, private, one-on-one conversations with the
              people who matter.
            </Text>

            <Group gap="md" mt="sm" justify={{ base: 'center', md: 'flex-start' }}>
              <Magnetic>
                <Button
                  component={Link}
                  to="/auth"
                  size="lg"
                  radius="xl"
                  variant="gradient"
                  gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                  rightSection={<IconArrowRight size={18} />}
                >
                  Get started free
                </Button>
              </Magnetic>
              <Button size="lg" radius="xl" variant="default" onClick={scrollToFeatures}>
                See how it works
              </Button>
            </Group>

            <Text size="sm" c="dimmed">
              ⚡ No setup headaches — just sign up and talk.
            </Text>
          </Stack>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            style={{ position: 'relative' }}
          >
            <FloatingBadge
              icon={IconLockFilled}
              text="Scoped to 2 people"
              style={{ top: -18, right: 8, rotate: -2 }}
              delay={0.9}
            />
            <FloatingBadge
              icon={IconBoltFilled}
              text="Instant delivery"
              style={{ bottom: -16, left: -10, rotate: 2 }}
              delay={1.1}
            />
            <Tilt>
              <ChatMockup />
            </Tilt>
          </motion.div>
        </SimpleGrid>
      </Container>

      {/* Pull quote */}
      <Container size="sm" py={{ base: 40, md: 70 }} style={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Text ta="center" fw={600} lh={1.5} style={{ fontSize: 'clamp(22px, 4vw, 30px)' }}>
            Because the best conversations happen{' '}
            <Text span inherit style={textGradient('teal', 'blue', 45)}>
              without an audience
            </Text>
            . Chattero keeps every chat private, simple, and just between the two of you.
          </Text>
        </motion.div>
      </Container>

      {/* Trust marquee */}
      <Box py={{ base: 30, md: 50 }} className={styles.marqueeViewport}>
        <div className={styles.marqueeTrack}>
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <Paper
              key={index}
              withBorder
              radius="xl"
              px="md"
              py={8}
              mr="sm"
              style={{ background: 'var(--mantine-color-default)', flexShrink: 0 }}
            >
              <Group gap={8} wrap="nowrap">
                <ThemeIcon size={22} radius="xl" variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 45 }}>
                  <item.icon size={12} />
                </ThemeIcon>
                <Text size="sm" fw={500} style={{ whiteSpace: 'nowrap' }}>
                  {item.text}
                </Text>
              </Group>
            </Paper>
          ))}
        </div>
      </Box>

      {/* Features */}
      <Container ref={featuresRef} size="lg" py={{ base: 50, md: 90 }} style={{ position: 'relative' }}>
        <Stack gap={8} align="center" ta="center" mb={50}>
          <Badge variant="light" color="teal" radius="xl" size="md">
            Why Chattero
          </Badge>
          <Title order={2} fw={700} fz={{ base: 28, sm: 36 }}>
            Built to get out of your way
          </Title>
          <Text c="dimmed" maw={520}>
            Every feature exists to make one conversation feel effortless — nothing more, nothing less.
          </Text>
        </Stack>

        <div className={styles.bento}>
          {bentoFeatures.map((feature) => (
            <BentoCard key={feature.title} {...feature} />
          ))}
        </div>
      </Container>

      {/* How it works */}
      <Container size="lg" py={{ base: 50, md: 90 }} style={{ position: 'relative' }}>
        <Stack gap={8} align="center" ta="center" mb={60}>
          <Badge variant="light" color="blue" radius="xl" size="md">
            How it works
          </Badge>
          <Title order={2} fw={700} fz={{ base: 28, sm: 36 }}>
            From sign up to first message in under a minute
          </Title>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
          {steps.map((step, index) => (
            <Step key={step.title} number={`0${index + 1}`} {...step} />
          ))}
        </SimpleGrid>
      </Container>

      {/* Final CTA */}
      <Container size="lg" py={{ base: 40, md: 70 }}>
        <Paper
          radius="xl"
          p={{ base: 40, md: 70 }}
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(120deg, var(--mantine-color-teal-6), var(--mantine-color-blue-6))',
          }}
        >
          <Box style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {[
              { top: '10%', left: '8%', size: 28, delay: 0 },
              { top: '65%', left: '18%', size: 20, delay: 0.5 },
              { top: '20%', left: '85%', size: 24, delay: 1 },
              { top: '75%', left: '80%', size: 18, delay: 1.5 },
            ].map((icon, index) => (
              <motion.div
                key={index}
                animate={prefersReducedMotion ? undefined : { y: [0, -14, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: icon.delay, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: icon.top, left: icon.left, opacity: 0.18 }}
              >
                <IconMessageCircle2Filled size={icon.size} color="white" />
              </motion.div>
            ))}
          </Box>

          <Stack align="center" gap="md" ta="center" style={{ position: 'relative' }}>
            <Title order={2} fw={700} fz={{ base: 26, sm: 36 }} c="white">
              Ready to start chatting?
            </Title>
            <Text c="white" opacity={0.9} maw={460}>
              Create a free account and send your first message in less than a minute.
            </Text>
            <Magnetic>
              <Button
                component={Link}
                to="/auth"
                size="lg"
                radius="xl"
                variant="white"
                color="teal"
                rightSection={<IconArrowRight size={18} />}
                mt="sm"
              >
                Create free account
              </Button>
            </Magnetic>
          </Stack>
        </Paper>
      </Container>

      {/* Footer */}
      <Container size="lg" py="xl">
        <Group justify="space-between" py="lg" style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}>
          <Group gap={8}>
            <ThemeIcon size={26} radius="xl" variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 45 }}>
              <IconMessageCircle2Filled size={14} />
            </ThemeIcon>
            <Text size="sm" fw={600}>
              Chattero
            </Text>
          </Group>
          <Text size="xs" c="dimmed">
            Built with Rails &amp; React
          </Text>
        </Group>
      </Container>

      <BackToTopButton />
    </div>
  )
}

export default About
