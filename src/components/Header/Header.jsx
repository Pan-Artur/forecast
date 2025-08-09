import { useState } from "react";
import logo from "../../assets/images/Header/logo.webp";
import user from "../../assets/images/Header/user.webp";
import styles from "./Header.module.scss";
import { IoIosArrowDown } from "react-icons/io";

export const Header = () => {
  const [headerModalState, setHeaderModalState] = useState(false)
  const toggleHeaderModal = () => {
    setHeaderModalState(!headerModalState);
  };
  return (
    <header className={styles.header }>
      <div className={styles.headerNavBox}>
        <img src={logo} alt="logo" className={styles.headerLogo} />
        <nav className={styles.headerNav}>
          <a href="" className={styles.headerNavItem}>
            Who we are
          </a>
          <a href="" className={styles.headerNavItem}>
            Contacts
          </a>
          <a href="" className={styles.headerNavItem}>
            Menu
          </a>
        </nav>
      </div>
      <div className={styles.headerLogInBox}>
        <button type="button" className={styles.headerBtn}>
          Sing Up
        </button>
        <img src={user} alt="Profile Picture" className={styles.headerPP} />
        <button onClick={toggleHeaderModal} className={styles.headerMenu}>
          Menu <span className={styles.headerMenuSpan}><IoIosArrowDown /></span>
        </button>
      </div>
      <div className={headerModalState ? styles.headerModal : styles.isClosed }>
        <nav className={styles.headerModalNav}>
          <a href="" className={styles.headerNavItem}>
            Who we are
          </a>
          <a href="" className={styles.headerNavItem}>
            Contacts
          </a>
          <a href="" className={styles.headerNavItem}>
            Menu
          </a>
        </nav>
        <div className={styles.headerModalLogInBox}>
          <img src={user} alt="Profile Picture" className={styles.headerModalPP} />

          <button type="button" className={styles.headerModalBtn}>
            Sing Up
          </button>
        </div>
      </div>
    </header>
  );
};
