import {login} from "../services/AuthService";
import styles from "./LoginForm.module.scss";
import { createSignal } from "solid-js";

export default function LoginForm() {
  const [email, setEmail] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  async function start() {
    if (!email()) return;

    setLoading(true);
    await login(email());
    setLoading(false);
  }

  return <div className={styles.form}>
    <input value={email()} onChange={ev => setEmail(ev.target.value)} type="email" />
    <button className="btn primary" disabled={loading()} onClick={start}>Start</button>
  </div>
}