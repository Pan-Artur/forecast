import styles from "./Login.module.scss";

export const SingInModal = () => {
  return (
    <div className="backdrop">
      <div className={styles.modal}>
        <h2 className={styles.modalSuptitle}>Sing Up</h2>
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
              <label htmlFor="email" className="modalFormLabel">
                E-mail
              </label>
              <input
                id="email"
                placeholder="E-mail"
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
          <button type="submit" className="modalSingInBtn">Sing Up</button>
        </form>
        <p className="modalLink">Already have an account? <span className="modalSpan">Log In</span></p>
      </div>
    </div>
  );
};
