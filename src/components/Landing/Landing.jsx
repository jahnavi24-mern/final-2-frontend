import Logo from '../Logo/Logo'
import styles from './Landing.module.css'
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/auth');
    }
    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <Logo />

                <div>
                    <button onClick={handleClick}>Sign in</button>
                    <button onClick={handleClick}>Create a FormBot</button>
                </div>
            </nav>

            <div className={styles.heroContainer}>
                <div className={styles.containerFirst}>
                    <img src="../hero-1.svg" alt="hero-1" className={styles.heroFirst} />
                    <img src="../hero-2.svg" alt="hero-2" className={styles.heroSecond} />
                    <h1>Build advanced chatbots visually</h1>
                    <p>Typebot gives you powerful blocks to create unique chat experiences. Embed them
                        anywhere on your web/mobile apps and start collecting results like magic.</p>

                    <button onClick={handleClick}>Create a FormBot for free</button>
                </div>

                <div className={styles.containerSecond}>
                    <div className={styles.circleFirst}></div>
                    <div className={styles.circleSecond}></div>
                    <img src="../hero.svg" alt="hero" className={styles.heroImage} />
                </div>
            </div>
        </div>
    )
}

export default Landing;