'use client';  // Indicating this is a client-side component

import { motion } from 'framer-motion';
import styles from '../styles/testimonials.module.css';  // Correct CSS path

const Testimonials = () => {
  return (
    <section className={styles.testimonials}>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        What Our Users Say
      </motion.h2>
      <div className={styles.testimonialList}>
        <motion.div
          className={styles.testimonial}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p>"This platform helped me find my perfect match. Highly recommended!"</p>
          <h4>- Alice</h4>
        </motion.div>

        <motion.div
          className={styles.testimonial}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p>"The process was so simple, and I found someone special in no time."</p>
          <h4>- Bob</h4>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
