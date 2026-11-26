import { Paper, Stack, Text, Title } from '@mantine/core'
import ThemeToggle from '../components/ThemeToggle.jsx'

function Settings() {
    return (
        <Stack align="center" gap="lg" py={60}>
            <Title order={2}>Settings</Title>
            <Paper withBorder radius="lg" p="xl">
                <Stack align="center" gap="sm">
                    <Text fw={600}>Appearance</Text>
                    <ThemeToggle />
                </Stack>
            </Paper>
        </Stack>
    )
}
export default Settings
