// From Uiverse.io by dovatgabriel - https://uiverse.io/dovatgabriel/jolly-kangaroo-36
// MIT License, Copyright (c) dovatgabriel (Gabriel)
import styles from './NewtonsCradleLoader.module.css'

function NewtonsCradleLoader({ size = 50, color = '#474554' }) {
    return (
        <div className={styles.newtonsCradle} style={{ '--uib-size': `${size}px`, '--uib-color': color }}>
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
        </div>
    )
}

export default NewtonsCradleLoader
