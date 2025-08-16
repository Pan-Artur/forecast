import { Container } from "../Container/Container.jsx";
import wasap from "../../assets/images/Header/wasap.webp";
import instagram from "../../assets/images/Header/instagram.webp";
import github from "../../assets/images/Header/github.webp";
import styles from "./Footer.module.scss";
import logo from "../../assets/images/Header/logo.webp";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContainer}>
          <img src={logo} alt="logo" className={styles.footerLogo} />

          <ul className={styles.footerList}>
            <li className={styles.footerList}>Address</li>
            <li className={styles.footerList}>Svobody str. 35</li>
            <li className={styles.footerList}>Kyiv</li>
            <li className={styles.footerList}>Ukraine</li>
          </ul>
          <div className={styles.footerContacts}>
            <h3 className={styles.footerSuptitle}>Contact us</h3>
            <ul className={styles.footerContactsList}>
              <li className={styles.footerContactsItem}>
                <a
                  href="https://chat.whatsapp.com/D9sGvSXTdBOG6ueCxI2Grl?mode=ac_t"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={styles.footerImg}
                    src={wasap}
                    alt="WhatsApp"
                  />
                </a>
              </li>
              <li className={styles.footerContactsItem}>
                <a
                  href="https://www.instagram.com/artibalt.pank/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={styles.footerImg}
                    src={instagram}
                    alt="Instagram"
                  />
                </a>
              </li>
              <li className={`${styles.footerContactsItem} ${styles.footerContactsItemGithub}`}>
                <a
                  href="https://github.com/Pan-Artur/forecast"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={`${styles.footerImg} ${styles.footerGithub}`}
                    src={github}
                    alt="Github"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
};
