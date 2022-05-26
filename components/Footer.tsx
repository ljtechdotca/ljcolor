import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.root}>
      <a className={styles.base} href="https://ljtech.ca/" rel="noreferrer">
        visit ljtech.ca for more
      </a>
    </footer>
  );
};

export default Footer;
