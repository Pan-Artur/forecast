import styles from "./Login.module.scss";
import { RxCross2 } from "react-icons/rx";

export const SingInModal = () => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2 className={styles.modalSuptitle}>Sing Up <span className={styles.modalSuptitleSpan}><RxCross2 className={styles.modalClose}/></span></h2>
        <form className={styles.modalForm}>
          <ul className={styles.modalFormList}>
            <li className={styles.modalFormItem}>
              <label htmlFor="username" className={styles.modalFormLabel}>
                Username
              </label>
              <input
                id="username"
                placeholder="Username"
                type="text"
                className={styles.modalFormInput}
              />
            </li>
            <li className={styles.modalFormItem}>
              <label htmlFor="email" className={styles.modalFormLabel}>
                E-mail
              </label>
              <input
                id="email"
                placeholder="E-mail"
                type="text"
                className={styles.modalFormInput}
              />
            </li>
            <li className={styles.modalFormItem}>
              <label htmlFor="password" className={styles.modalFormLabel}>
                Password
              </label>
              <input
                id="password"
                placeholder="Password"
                type="text"
                className={styles.modalFormInput}
              />
            </li>
          </ul>
          <button type="submit" className={styles.modalSignInBtn}>Sing Up</button>
        </form>
        <p className={styles.modalLink}>Already have an account? <span className={styles.modalLinkSpan}>Log In</span></p>
        
        
      </div>
    </div>
  );
};
