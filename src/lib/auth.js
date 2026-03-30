/** Fired when localStorage `user` is set/cleared in this tab (logout/login/register). */
export const AUTH_CHANGE_EVENT = "inventory-auth-change";

export function notifyAuthChanged() {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}
