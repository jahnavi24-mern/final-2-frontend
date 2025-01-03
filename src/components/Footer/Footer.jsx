import React from 'react';
import styles from './Footer.module.css';
import Logo from '../Logo/Logo'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
            <div className={styles.footerSection}>
                <Logo />
                <ul>
                <li>Made with ❤️ by @cuvette</li>
                </ul>
            </div>
          <div className={styles.footerSection}>
            <h3>Product</h3>
            <ul>
                <li>Status</li>
                <li>Documentation</li>
                <li>Roadmap</li>
                <li>Pricing</li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Community</h3>
            <ul>
              <li>Discord</li>
              <li><a href="/services">GitHub repository</a></li>
              <li><a href="/contact">Twitter</a></li>
              <li>LinkedIn</li>
              <li>OSS Friends</li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Company</h3>
            <ul>
                <li>About</li>
                <li>Contact</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;