import logo from '../../assets/images/Header/logo.webp'
import user from '../../assets/images/Header/user.webp'
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerNavBox}>
        <img src={logo} alt="logo" className={styles.headerLogo} />
        <nav className={styles.headerNav}>
          <a href="" className={styles.headerNavItem}>Who we are</a>
          <a href="" className={styles.headerNavItem}>Contacts</a>
          <a href="" className={styles.headerNavItem}>Menu</a>
        </nav>
      </div>
      <div className={styles.headerLogInBox}>
        <button type="button" className={styles.headerBtn}>Sing Up</button>
        <img src={user} alt="Profile Picture" className={styles.headerPP} />
      </div>
    </header>
  );
}