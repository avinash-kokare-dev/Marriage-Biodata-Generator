'use client';  // Indicating this is a client-side component

import { motion } from 'framer-motion';
import styles from '../styles/services.module.css';  // Correct CSS path

const Services = () => {
  return (
    <section className={styles.services}>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Our Services
      </motion.h2>
      <div className={styles.servicesList}>
        <motion.div
          className={styles.service}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h3>Profile Creation</h3>
          <p>Create a professional biodata with ease.</p>
        </motion.div>

        <motion.div
          className={styles.service}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h3>Matchmaking</h3>
          <p>Find the perfect match with our intelligent algorithm.</p>
        </motion.div>

        <motion.div
          className={styles.service}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <h3>Consultation</h3>
          <p>Receive expert advice and guidance for a perfect match.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
