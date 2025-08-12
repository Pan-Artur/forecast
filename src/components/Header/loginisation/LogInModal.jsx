import styles from "./Login.module.scss";
import { RxCross2 } from "react-icons/rx";

export const LogInModal = ({ logIn, setLogIn, setIsLoggined }) => {
  const changeLogIn = () => {
    setLogIn(false);
  };

  const logInUser = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.username.value.trim();
    const password = form.password.value.trim();

    fetch(`https://684d9d2865ed08713916a5ac.mockapi.io/weather-loginization`)
      .then((res) => res.json())
      .then((allUsers) => {
        const user = allUsers.find((u) => u.username === username);

        if (!user || user.password !== password) {
          form.username.classList.add(styles.wrong);
          form.username.placeholder = "Wrong user or password";
          form.password.classList.add(styles.wrong);
          form.password.placeholder = "Wrong user or password";
          return;
        }

        setLogIn(false);
        setIsLoggined(true);
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Завантажуємо улюблені міста з даних користувача
        if (user.favorites) {
          localStorage.setItem("userFavorites", JSON.stringify(user.favorites));
        }
      });
  };
  
  return (
    <div className={logIn ? styles.backdrop : styles.isClosed}>
      <div className={styles.modal}>
        <h2 className={styles.modalSuptitle}>
          Log In{" "}
          <span onClick={changeLogIn} className={styles.modalSuptitleSpan}>
            <RxCross2 className={styles.modalClose} />
          </span>
        </h2>
        <form className={styles.modalForm} onSubmit={logInUser}>
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
              <label htmlFor="password" className={styles.modalFormLabel}>
                Password
              </label>
              <input
                id="password"
                placeholder="Password"
                type="password"
                className={styles.modalFormInput}
              />
            </li>
          </ul>
          <button type="submit" className={styles.modalSignInBtn}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
