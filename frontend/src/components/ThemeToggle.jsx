// From Uiverse.io by Pradeepsaranbishnoi - https://uiverse.io/Pradeepsaranbishnoi/strong-treefrog-90
// MIT License, Copyright (c) Pradeepsaranbishnoi (Pradeep Saran)
import { useMantineColorScheme } from '@mantine/core'
import styles from './ThemeToggle.module.css'

function ThemeToggle() {
    const { colorScheme, setColorScheme } = useMantineColorScheme()
    const isDark = colorScheme === 'dark'

    return (
        <>
            <input
                id="theme-switch"
                className={styles.checkbox}
                type="checkbox"
                checked={isDark}
                onChange={() => setColorScheme(isDark ? 'light' : 'dark')}
            />
            <div className={styles.app}>
                <div className={styles.body}>
                    <div className={styles.phone}>
                        <div className={styles.menu}>
                            <div className={styles.time}>4:20</div>
                            <div className={styles.icons}>
                                <div className={styles.network} />
                                <div className={styles.battery} />
                            </div>
                        </div>

                        <div className={styles.content}>
                            <div className={styles.circle}>
                                <div className={styles.crescent} />
                            </div>

                            <label htmlFor="theme-switch" className={styles.toggleLabel}>
                                <div className={styles.toggle} />
                                <div className={styles.names}>
                                    <p className={styles.light}>Light</p>
                                    <p className={styles.dark}>Dark</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ThemeToggle
