import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.root}>
      <a href="https://ljtech.ca/" target="_blank" rel="noreferrer">
        visit ljtech.ca for more
      </a>
    </footer>
  );
};

export default Footer;
