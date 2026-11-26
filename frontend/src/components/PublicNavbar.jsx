import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ActionIcon, Anchor, Box, Button, Group, Text, ThemeIcon, useMantineColorScheme } from '@mantine/core'
import { IconMessageCircle2Filled, IconMoon, IconSun } from '@tabler/icons-react'

function PublicNavbar({ onFeaturesClick, showLoginButton = true }) {
    const { colorScheme, setColorScheme } = useMantineColorScheme()
    const isDark = colorScheme === 'dark'
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <Box
            component="header"
            px={{ base: 'md', sm: 'xl' }}
            py="lg"
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                background: scrolled
                    ? 'light-dark(rgba(255,255,255,0.85), rgba(20,20,25,0.85))'
                    : 'light-dark(rgba(255,255,255,0.6), rgba(20,20,25,0.6))',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid var(--mantine-color-default-border)',
                boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.06)' : 'none',
                transition: 'background 0.25s ease, box-shadow 0.25s ease',
            }}
        >
            <Group justify="space-between" wrap="nowrap" style={{ position: 'relative' }}>
                <Group gap={10} component={Link} to="/about" wrap="nowrap" style={{ textDecoration: 'none', color: 'inherit', minWidth: 0 }}>
                    <motion.div whileHover={{ rotate: -8, scale: 1.08 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                        <ThemeIcon size={40} radius="xl" variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 45 }}>
                            <IconMessageCircle2Filled size={22} />
                        </ThemeIcon>
                    </motion.div>
                    <Text
                        fw={700}
                        size="xl"
                        truncate
                        style={{
                            backgroundImage: 'linear-gradient(45deg, var(--mantine-color-teal-6), var(--mantine-color-blue-6))',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Chattero
                    </Text>
                </Group>

                {onFeaturesClick && (
                    <motion.div
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
                    >
                        <Anchor
                            component="button"
                            type="button"
                            onClick={onFeaturesClick}
                            underline="never"
                            c="dimmed"
                            fw={500}
                            size="md"
                            visibleFrom="xs"
                            style={{ position: 'relative' }}
                        >
                            Features
                            <motion.span
                                variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    bottom: -4,
                                    height: 2,
                                    borderRadius: 2,
                                    transformOrigin: 'left',
                                    background: 'linear-gradient(90deg, var(--mantine-color-teal-6), var(--mantine-color-blue-6))',
                                }}
                            />
                        </Anchor>
                    </motion.div>
                )}

                <Group gap={{ base: 'xs', sm: 'md' }} wrap="nowrap">
                    <ActionIcon
                        onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
                        variant="light"
                        color="teal"
                        size="lg"
                        radius="xl"
                        aria-label="Toggle color scheme"
                    >
                        {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
                    </ActionIcon>
                    {showLoginButton ? (
                        <Button
                            component={Link}
                            to="/auth"
                            size="md"
                            radius="md"
                            variant="gradient"
                            gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                        >
                            Log in
                        </Button>
                    ) : (
                        <Anchor component={Link} to="/about" underline="never" c="dimmed" size="md">
                            ← About
                        </Anchor>
                    )}
                </Group>
            </Group>
        </Box>
    )
}

export default PublicNavbar
