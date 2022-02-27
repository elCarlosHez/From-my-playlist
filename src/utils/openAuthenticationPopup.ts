export const openAuthenticationPopup = (url: string, serviceName: string) => {
  const POPUP_WIDTH = 600;
  const POPUP_HEIGHT = 800;
  const left = window.screen.width / 2 - POPUP_WIDTH / 2,
    top = window.screen.height / 2 - POPUP_HEIGHT / 2;
  window.open(
    url,
    `${serviceName} Login`,
    "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
    POPUP_WIDTH +
    ", height=" +
    POPUP_HEIGHT +
    ", top=" +
    top +
    ", left=" +
    left
  );
}