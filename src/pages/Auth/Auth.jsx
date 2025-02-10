import { useState } from 'react';
import styles from './Auth.module.css';
import { useNavigate } from 'react-router-dom';
import {signin, signup} from '../../api/auth'

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleToggleForm = () => {
        setIsLogin(!isLogin);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isLogin) {
                const response = await signin({email, password})
                
                localStorage.setItem('token', response.token);
                if(response.success){
                    navigate('/dashboard');
                }
            } else {
                if (password !== confirmPassword) {
                    alert("Passwords don't match!");
                    return;
                }
                
                const response = await signup({email, password, confirmPassword, userName})
                handleToggleForm();
            }

        }catch (error){
            console.error('Auth error:', error);
        }

        setEmail("");
        setPassword("");
    }

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div className={styles.container}>
            <img src="../icons/arrow_back.svg" alt="Back arrow" className={styles.arrow} onClick={handleBack} />

            <img src="../auth-2.svg" alt="auth-2" className={styles.triangle1} />
            <img src="../auth-2.svg" alt="auth-2" className={styles.triangle2} />
            <img src="../auth-1.svg" alt="auth-1" className={styles.yellow} />
            <img src="../auth-3.svg" alt="auth-3" className={styles.peach} />

            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

                {!isLogin && (
                    <div className={styles.formItem}>
                        <label>Username</label>
                        <input
                        type="text" 
                        name="name"
                        label="Name" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required 
                        placeholder='Enter your username'
                        ></input>
                    </div>
                )}

                <div className={styles.formItem}>
                    <label>Email</label>
                    <input 
                    type="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    label="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    ></input>
                </div>

                <div className={styles.formItem}>
                    <label>Password</label>
                    <input 
                    type="password" 
                    name="password"
                    placeholder="**********" 
                    label="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    ></input>
                </div>

                {!isLogin && (
                    <div className={styles.formItem}>
                        <label>Confirm Password</label>
                        <input 
                        type="password" 
                        name="password"
                        placeholder="**********" 
                        label="Password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        ></input>
                    </div>
                )}

                <div className={styles.formItem}>
                    <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
                        <>
                            <p>or</p>
                            <div className={styles.google}>
                                <button>
                                    <img src="../icons/google.svg" alt="google" />
                                    Sign in with Google
                                </button>
                            </div>
                        </>
                </div>

                <p>
                    {isLogin ? 
                        "Don't have an account? " : 
                        "Already have an account? "}
                    <a onClick={handleToggleForm}>
                        {isLogin ? 'Register now' : 'Login'}
                    </a>
                </p>
            </form>

        </div>
    )
}

export default Auth;