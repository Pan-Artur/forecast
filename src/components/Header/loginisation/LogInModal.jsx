import styles from "./Login.module.scss";
import { RxCross2 } from "react-icons/rx";


export const LogInModal = ({logIn, setLogIn, setIsLoggined}) => {
  const changeLogIn = () => {
    setLogIn(!setLogIn)
  }

  const logInUser = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.username.value.trim();
    const password = form.password.value.trim();
    

    fetch(
      `https://684d9d2865ed08713916a5ac.mockapi.io/weather-loginization`
    )
      .then((res) => res.json())
      .then((allUsers) => {
        let error = false;
        if (allUsers) {
          if (allUsers.find((user) => user.username === username) === false) {
            form.username.classList.add(styles.wrong);
            form.username.placeholder = "Wrong user or password";
            form.password.classList.add(styles.wrong);
            form.password.placeholder = "Wrong user or password";
            error = true;
          }
          if (error) return
          let currPassword

          allUsers.forEach(currentUser => {
            if(currentUser.username === username){
              currPassword = currentUser.password
            }
          });
          if(password !== currPassword){
            form.username.classList.add(styles.wrong);
            form.username.placeholder = "Wrong user or password";
            form.password.classList.add(styles.wrong);
            form.password.placeholder = "Wrong user or password";
            error = true;
          }
        }
        if (error) return;
        setLogIn(false)
        setIsLoggined(true)
        // fetch(
        //   "https://684d9d2865ed08713916a5ac.mockapi.io/weather-loginization",
        //   {
        //     method: "POST",
        //     body: JSON.stringify({
        //       username: username,
        //       // email: email,
        //       password: password,
        //     }),
        //     headers: {
        //       "Content-Type": "application/json; charset=UTF-8",
        //     },
        //   }
        // );
        // toast('Account created! Now you can log in.');
      });
    // console.log(allUsers)

    // console.log(allUsers)
  };
  return (
    <div className={logIn ? styles.backdrop : styles.isClosed}>
      <div className={styles.modal}>
        <h2 className={styles.modalSuptitle}>Log In <span onClick={changeLogIn} className={styles.modalSuptitleSpan}><RxCross2 className={styles.modalClose}/></span></h2>
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
                type="text"
                className={styles.modalFormInput}
              />
            </li>
          </ul>
          <button type="submit" className={styles.modalSignInBtn}>Sing Up</button>
        </form>
        
        
        
      </div>
    </div>
  );
};
