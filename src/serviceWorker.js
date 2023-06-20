export default function serviceWorker() {
  if (process.env.REACT_APP_BASE_URL !== "http://localhost:3000") {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(function (registration) {
          console.log("Registration successful, scope is:", registration.scope);
        })
        .catch(function (error) {
          console.warn("Service worker registration failed, error:");
        });
    }
  }
}
