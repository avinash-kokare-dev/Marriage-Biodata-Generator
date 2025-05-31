'use client';
import { motion } from 'framer-motion';
import styles from '../styles/home.module.css';

const Home = () => {
  return (
    <motion.div
      className={styles.hero}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className={styles.heroContent}>
        <motion.h1
          className={styles.heroTitle}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Find Your Perfect Match
        </motion.h1>

        <motion.p
          className={styles.heroSubtitle}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Join our platform and create your biodata to meet potential life partners, with thousands of success stories.
        </motion.p>

        <motion.button
          className={styles.ctaBtn}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', delay: 1.5 }}
        >
          Get Started
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Home;
