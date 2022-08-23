import { onMount, createSignal } from "solid-js";
import { isAuthenticated } from "../services/AuthService";

export default function StartButton() {
  const [isAuth, setAuth] = createSignal(false);

  onMount(() => {
    setAuth(isAuthenticated());
  })

  return <>
    {!isAuth() && <a href="/start" class="btn primary">Start now</a>}
    {isAuth() && <a href="/profile" class="btn primary">Manage profile</a>}
  </>
}