'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from '../styles/header.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'About', path: 'About' },
    { name: 'Experience', path: 'Experience' },
    { name: 'Projects', path: 'Projects' },
    { name: 'Contact', path: 'Contact' },
  ];

  return (
    <motion.nav
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`container ${styles.container}`}>
        <Link href="#Home" className={styles.logo}>
          Avinash Kokare
        </Link>

        {/* Desktop menu */}
        <div className={styles.desktopLinks}>
          {navItems.map((item) => (
            <Link key={item.name} href={`#${item.path}`} className={styles.navLink}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* Hamburger menu button */}
        <button
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <div className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={`#${item.path}`}
            className={styles.mobileLink}
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
