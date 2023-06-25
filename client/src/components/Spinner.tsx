import { motion } from 'framer-motion';

import styles from '../styles/LoadingSpinner.module.scss';

const Spinner = () => {
  const dotVariants = {
    start: {
      y: '-10px',
    },
    end: {
      y: '10px',
    },
  };

  const dotTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: 'easeInOut',
  };

  return (
    <motion.div className={styles.spinnerContainer}>
      <motion.div className={styles.dotWrapper}>
        <motion.p className={styles.loadingText}>Loading</motion.p>
        <motion.div
          className={styles.dot}
          animate="end"
          initial="start"
          variants={dotVariants}
          transition={dotTransition}
        />
        <motion.div
          className={styles.dot}
          animate="end"
          initial="start"
          variants={dotVariants}
          transition={{ ...dotTransition, delay: 0.1 }}
        />
        <motion.div
          className={styles.dot}
          animate="end"
          initial="start"
          variants={dotVariants}
          transition={{ ...dotTransition, delay: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Spinner;
