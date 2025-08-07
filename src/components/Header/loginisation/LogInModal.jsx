import styles from "./Login.module.scss";

export const LogInModal = () => {
  return (
    <div className="backdrop">
      <div className={styles.modal}>
        <h2 className={styles.modalSuptitle}>Log In</h2>
        <form className="modalForm">
          <ul className="modalFormList">
            <li className="modalFormItem">
              <label htmlFor="username" className="modalFormLabel">
                Username
              </label>
              <input
                id="username"
                placeholder="Username"
                type="text"
                className="modalFormInput"
              />
            </li>
            <li className="modalFormItem">
              <label htmlFor="password" className="modalFormLabel">
                Password
              </label>
              <input
                id="password"
                placeholder="Password"
                type="text"
                className="modalFormInput"
              />
            </li>
          </ul>
          <button type="submit" className="modalLogInBtn">
            Sing Up
          </button>
        </form>
        <p className="modalLink">
          Have'nt an account? <span className="modalSpan">Sing Up</span>
        </p>
      </div>
    </div>
  );
};
