// From Uiverse.io by vinodjangid07 - https://uiverse.io/vinodjangid07/afraid-falcon-17
// MIT License, Copyright (c) vinodjangid07 (Vinod Jangid)
import styles from './BackToTopButton.module.css'

function BackToTopButton() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <button
            className={styles.button}
            onClick={scrollToTop}
            style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 200 }}
        >
            <svg className={styles.svgIcon} viewBox="0 0 384 512">
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
            </svg>
        </button>
    )
}

export default BackToTopButton
