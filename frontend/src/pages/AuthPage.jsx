import { useState } from 'react'
import {
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
import { IconMessageCircle2 } from '@tabler/icons-react'

function AuthPage() {
  const [mode, setMode] = useState('login')

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

        <Tabs value={mode} onChange={setMode} radius="md">
          <Tabs.List grow mb="lg">
            <Tabs.Tab value="login">Log in</Tabs.Tab>
            <Tabs.Tab value="signup">Sign up</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="login">
            <Stack gap="md">
              <TextInput label="Email" placeholder="you@example.com" />
              <PasswordInput label="Password" placeholder="••••••••" />
              <Anchor size="sm" ta="right">
                Forgot password?
              </Anchor>
              <Button fullWidth color="teal" radius="md">
                Log in
              </Button>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="signup">
            <Stack gap="md">
              <Group grow>
                <TextInput label="First name" placeholder="Patrik" />
                <TextInput label="Last name" placeholder="Hvezdič" />
              </Group>
              <TextInput label="Email" placeholder="you@example.com" />
              <PasswordInput label="Password" placeholder="••••••••" />
              <Button fullWidth color="teal" radius="md">
                Create account
              </Button>
            </Stack>
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
