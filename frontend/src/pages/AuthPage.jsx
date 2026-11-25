import { useState } from 'react'
import {
  Alert,
  Anchor,
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
import { IconAlertCircle, IconMessageCircle2 } from '@tabler/icons-react'

function AuthPage() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState(null) // null = no error to show
  const handleLogin = (e) => {
      e.preventDefault()
      console.log(`Hello ${email}!`)
  }

  // calling RAILS API
  const handleSingup = async (e) => {
    e.preventDefault()
    setError(null) // clear the previous error before a new attempt

    try {
      const response = await fetch('http://localhost:3000/api/v1/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
          },
        }),
      })
      const data = await response.json()

      if (response.ok) {
        const token = response.headers.get('Authorization')
        const { first_name, last_name, id } = data.user
        // storing the token and user data in local storage
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify({ id, first_name, last_name }))
      } else {
        // Rails answered, but said no (e.g. 422) → show its messages
        setError(data.errors?.join(', ') || 'Sign up failed.')
      }
    } catch {
      // Rails couldn't be reached at all
      setError('Could not reach the server. Is Rails running?')
    }
  }



  return (
    <Center
      style={{
        minHeight: '100svh',
        background: 'linear-gradient(160deg, #e6fbf5 0%, #eef3ff 100%)',
      }}
    >
      <Paper withBorder shadow="md" radius="lg" p="xl" w={400}>
        <Group justify="center" mb="lg" gap="xs">
          <ThemeIcon size={36} radius="md" color="teal">
            <IconMessageCircle2 size={20} />
          </ThemeIcon>
          <Title order={2} fw={600}>
            Chatter
          </Title>
        </Group>

        {error && (
          <Alert
            variant="light"
            color="red"
            title="Something went wrong"
            icon={<IconAlertCircle size={18} />}
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

          <Tabs.Panel value="login">
            <form onSubmit={handleLogin}>
              <Stack gap="md">
                <TextInput label="Email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="you@example.com" />
                <PasswordInput label="Password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="••••••••" />
                <Anchor size="sm" ta="right">
                  Forgot password?
                </Anchor>
                <Button type="submit" fullWidth color="teal" radius="md">
                  Log in
                </Button>
              </Stack>
            </form>
          </Tabs.Panel>

          <Tabs.Panel value="signup">
            <form onSubmit={handleSingup}>
              <Stack gap="md">
                <Group grow>
                  <TextInput label="First name" placeholder="Joe" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                  <TextInput label="Last name" placeholder="Doe" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                </Group>
                <TextInput label="Email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="you@example.com" />
                <PasswordInput label="Password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="••••••••" />
                <Button type="submit" fullWidth color="teal" radius="md">
                  Create account
                </Button>
              </Stack>
            </form>
          </Tabs.Panel>
        </Tabs>

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
    </Center>
  )
}

export default AuthPage
