import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Alert,
  Anchor,
  Box,
  Button,
  Center,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Tabs,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { IconAlertCircleFilled, IconBrandGithub, IconMessageCircle2Filled } from '@tabler/icons-react'
import NewtonsCradleLoader from '../components/NewtonsCradleLoader.jsx'
import PublicNavbar from '../components/PublicNavbar.jsx'
import AuroraBackground from '../components/AuroraBackground.jsx'
import { heroGradient } from '../theme.js'
import { textGradient } from '../utils/textGradient.js'

function AuthPage() {
  const prefersReducedMotion = useReducedMotion()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState(null) // null = no error to show
  const [isSubmitting, setIsSubmitting] = useState(false) // preventing double submits
  const authRequest = async (url, method, userInput, e) => {
      e.preventDefault()
      setError(null)
      setIsSubmitting(true)
      try {
          const response = await fetch(url, {
              method: method,
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  user: userInput,
              })
          })
          const token = response.headers.get('Authorization')
          const data = await response.json()
          if (response.ok) {
              localStorage.setItem('token', token)
              const user = data.user
              localStorage.setItem('user', JSON.stringify({id: user.id, first_name: user.first_name, last_name: user.last_name}))
              window.location.href = '/users'
          } else {
              setError(data.errors?.join(', ') || 'Login failed.')
          }
      }
      catch (error){
          setError('Could not reach the server with error:' + error)
      }
      finally {
          setIsSubmitting(false)

      }
  }

  return (
    <div
      style={{
        background: heroGradient,
        minHeight: '100svh',
        position: 'relative',
      }}
    >
      <AuroraBackground />
      <PublicNavbar showLoginButton={false} />
      <Center style={{ minHeight: 'calc(100svh - 84px)', position: 'relative' }}>
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Stack align="center" gap="md">
            <Paper withBorder shadow="md" radius="lg" p="xl" w={400} style={{ overflow: 'hidden' }}>
              <Box
                style={{
                  height: 4,
                  margin: '-1.5rem -1.5rem 1.5rem',
                  background: 'linear-gradient(90deg, var(--mantine-color-teal-6), var(--mantine-color-blue-6))',
                }}
              />
              <Group justify="center" mb="lg" gap="xs">
                <ThemeIcon size={36} radius="xl" variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 45 }}>
                  <IconMessageCircle2Filled size={20} />
                </ThemeIcon>
                <Title order={2} fw={700} style={textGradient('teal', 'blue', 45)}>
                  Chattero
                </Title>
              </Group>

              {error && (
                <Alert
                  variant="light"
                  color="red"
                  title="Something went wrong"
                  icon={<IconAlertCircleFilled size={18} />}
                  withCloseButton
                  onClose={() => setError(null)}
                  mb="md"
                >
                  {error}
                </Alert>
              )}

              <Tabs value={mode} onChange={setMode} radius="md">
                <Tabs.List grow mb="lg">
                  <Tabs.Tab value="login">Log in</Tabs.Tab>
                  <Tabs.Tab value="signup">Sign up</Tabs.Tab>
                </Tabs.List>
              </Tabs>

              <motion.div layout transition={{ duration: 0.2, ease: 'easeInOut' }}>
                <AnimatePresence mode="wait" initial={false}>
                  {mode === 'login' ? (
                    <motion.form
                      key="login"
                      onSubmit={(e) =>{
                          authRequest('http://localhost:3000/api/v1/login', 'POST',
                              { email: email, password: password }, e)}}
                      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 12 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      <Stack gap="md">
                        <TextInput label="Email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="you@example.com" />
                        <PasswordInput label="Password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="••••••••" />
                        <Button
                          type="submit"
                          fullWidth
                          radius="md"
                          variant="gradient"
                          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                        >
                          Log in
                        </Button>
                      </Stack>
                    </motion.form>
                  ) : (
                    <motion.form
                      key="signup"
                      onSubmit={(e) => {  authRequest('http://localhost:3000/api/v1/signup', 'POST',
                          { first_name: firstName, last_name: lastName, email: email, password: password }, e)
                      }}
                      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      <Stack gap="md">
                        <Group grow>
                          <TextInput label="First name" placeholder="Joe" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                          <TextInput label="Last name" placeholder="Doe" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                        </Group>
                        <TextInput label="Email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="you@example.com" />
                        <PasswordInput label="Password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="••••••••" />
                        <Button
                          type="submit"
                          fullWidth
                          radius="md"
                          variant="gradient"
                          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? <NewtonsCradleLoader size={24} color="white" /> : 'Create account'}
                        </Button>
                      </Stack>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>

              <Text ta="center" size="sm" mt="lg" c="dimmed">
                {mode === 'login' ? (
                  <>
                    Don&apos;t have an account?{' '}
                    <Anchor size="sm" onClick={() => setMode('signup')}>
                      Sign up
                    </Anchor>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <Anchor size="sm" onClick={() => setMode('login')}>
                      Log in
                    </Anchor>
                  </>
                )}
              </Text>
            </Paper>
            <Text size="xs" c="dimmed">
              Made by{' '}
              <Anchor href="https://github.com/TheP4trik-tech" target="_blank" rel="noopener noreferrer" size="xs" inline>
                <Group gap={4} component="span" align="center" style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
                  <IconBrandGithub size={14} style={{ position: 'relative', top: 1 }} />
                  TheP4trik-tech
                </Group>
              </Anchor>
            </Text>
          </Stack>
        </motion.div>
      </Center>
    </div>
  )
}

export default AuthPage
