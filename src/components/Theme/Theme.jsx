import { useTheme } from '../../context/ThemeContext';
import styles from './Theme.module.css'

const Theme = () => {
    const { theme, toggleTheme } = useTheme();
    
    return (
        <div className={styles.themeToggleWrapper}>
            <span>Light</span>
            <label className={styles.switch}>
                <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                />
                <span className={styles.slider}></span>
            </label>
            <span>Dark</span>
        </div>
    )
}

export default Theme