import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { Box, Burger, Button, Drawer, Group, Stack, ThemeIcon, Title } from '@mantine/core'
import { IconLogout, IconMessageCircle2Filled, IconMessagesFilled, IconSettingsFilled, IconUsers } from '@tabler/icons-react'
import { apiFetch } from '../api.js'

const links = [
    { to: '/chats', label: 'Chats', icon: IconMessagesFilled },
    { to: '/users', label: 'Users', icon: IconUsers },
    { to: '/settings', label: 'Settings', icon: IconSettingsFilled },
]

function Navbar() {
    const [opened, setOpened] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await apiFetch('/api/v1/logout', { method: 'DELETE' })
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/auth')
    }

    const NavLinks = ({ onNavigate }) => (
        <>
            {links.map(({ to, label, icon: Icon }) => (
                <Button
                    key={to}
                    component={Link}
                    to={to}
                    onClick={onNavigate}
                    variant={location.pathname === to ? 'light' : 'subtle'}
                    color="teal"
                    radius="md"
                    justify="start"
                    leftSection={<Icon size={16} />}
                >
                    {label}
                </Button>
            ))}
            <Button onClick={handleLogout} variant="subtle" color="red" radius="md" justify="start" leftSection={<IconLogout size={16} />}>
                Log out
            </Button>
        </>
    )

    return (
        <Box
            component="header"
            px="lg"
            py="sm"
            style={{
                background: 'light-dark(linear-gradient(160deg, #e6fbf5 0%, #eef3ff 100%), linear-gradient(160deg, #0d1b17 0%, #0d1324 100%))',
                borderBottom: '1px solid var(--mantine-color-default-border)',
                position: 'sticky',
                top: 0,
                zIndex: 100,
            }}
        >
            <Group justify="space-between">
                <Group gap="xs">
                    <ThemeIcon size={32} radius="xl" variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 45 }}>
                        <IconMessageCircle2Filled size={18} />
                    </ThemeIcon>
                    <Title order={3} fw={600}>
                        Chattero
                    </Title>
                </Group>

                <Group gap="xs" visibleFrom="sm">
                    <NavLinks />
                </Group>

                <Burger opened={opened} onClick={() => setOpened((o) => !o)} hiddenFrom="sm" />
            </Group>

            <Drawer opened={opened} onClose={() => setOpened(false)} hiddenFrom="sm" title="Menu" padding="md">
                <Stack gap="xs">
                    <NavLinks onNavigate={() => setOpened(false)} />
                </Stack>
            </Drawer>
        </Box>
    )
}

export default Navbar
