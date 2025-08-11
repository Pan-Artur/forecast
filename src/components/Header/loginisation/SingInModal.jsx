import styles from "./Login.module.scss";
import { RxCross2 } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';


export const SingInModal = ({ signIn, setSignIn, setLogIn, logIn, setIsLoggined }) => {
  
  const checkUser = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    console.log(username);

    fetch(
      `https://684d9d2865ed08713916a5ac.mockapi.io/weather-loginization`
    )
      .then((res) => res.json())
      .then((allUsers) => {
        let error = false;
        if (allUsers) {
          if (allUsers.find((user) => user.username === username)) {
            // form.username.classList.remove(styles.modalFormInput);
            form.username.classList.add(styles.wrong);
            form.username.placeholder = "This username is already taken";
            form.username.value = "";
            error = true;
          }

          if (allUsers.find((user) => user.email === email)) {
            form.email.classList.add(styles.wrong);
            form.email.placeholder = "This email is already taken";
            form.email.value = "";
            error = true;
          }
        }
        if (error) return;
        
        fetch(
          "https://684d9d2865ed08713916a5ac.mockapi.io/weather-loginization",
          {
            method: "POST",
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
            }),
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
          }
        );
        setSignIn(false)
        setIsLoggined(true)
      });
    // console.log(allUsers)

    // console.log(allUsers)
  };

  const changeSignIn = () => {
    setSignIn(!signIn);
  };
  const changeLogIn = () => {
    setLogIn(!logIn);
    setSignIn(false);
  };
  return (
    <div className={signIn ? styles.backdrop : styles.isClosed}>
      <div className={styles.modal}>
        <h2 className={styles.modalSuptitle}>
          Sing Up{" "}
          <span onClick={changeSignIn} className={styles.modalSuptitleSpan}>
            <RxCross2 className={styles.modalClose} />
          </span>
        </h2>
        <form className={styles.modalForm} onSubmit={checkUser}>
          <ul className={styles.modalFormList}>
            <li className={styles.modalFormItem}>
              <label htmlFor="username" className={styles.modalFormLabel}>
                Username
              </label>
              <input
                name="username"
                // id="username"
                placeholder="Username"
                type="text"
                required
                className={styles.modalFormInput}
              />
            </li>
            <li className={styles.modalFormItem}>
              <label htmlFor="email" className={styles.modalFormLabel}>
                E-mail
              </label>
              <input
                name="email"
                id="email"
                placeholder="E-mail"
                type="email"
                required
                className={styles.modalFormInput}
              />
            </li>
            <li className={styles.modalFormItem}>
              <label htmlFor="password" className={styles.modalFormLabel}>
                Password
              </label>
              <input
                name="password"
                // id="password"
                placeholder="Password"
                type="text"
                required
                className={styles.modalFormInput}
              />
            </li>
          </ul>
          <button type="submit" className={styles.modalSignInBtn}>
            Sing Up
          </button>
        </form>
        <p onClick={changeLogIn} className={styles.modalLink}>
          Already have an account?
          <span className={styles.modalLinkSpan}>Log In</span>
        </p>
      </div>
      
    </div>
  );
};
