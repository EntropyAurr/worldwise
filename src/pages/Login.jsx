import { useState } from "react";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("auduong.301@gmail.com");
  const [password, setPassword] = useState("aurora");

  return (
    <main className={styles.login}>
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
          <button>Login</button>
        </div>
      </form>
    </main>
  );
}

export default Login;
