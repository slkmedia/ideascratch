let shouldLeave;

export default function confirmPageLeave(event, showPageLeaveWarning) {
  if (!showPageLeaveWarning || shouldLeave) {
    shouldLeave = false;
    return;
  }

  event.preventDefault();

  shouldLeave = window.confirm(
    'A request is still processing. Leaving may cause lost changes.',
  );

  if (shouldLeave) event.currentTarget.click();
}
