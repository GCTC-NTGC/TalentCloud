export async function copyToClipboard(
  event,
  text: string,
): Promise<void> {
  if (event.clipboardData && event.clipboardData.setData) {
    // IE specific code path to prevent textarea being shown while dialog is visible.
    return event.clipboardData.setData("Text", text);
  }
  if (
    document.queryCommandSupported &&
    document.queryCommandSupported("copy")
  ) {
    const textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy"); // Security exception may be thrown by some browsers.
      return Promise.resolve();
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return Promise.reject();
    } finally {
      document.body.removeChild(textarea);
    }
  }
  return Promise.reject();
}

export function copyElementContents(el: Element): void {
  const documentIEBody = document.body as any;
  let range;
  let sel;
  if (document.createRange && window.getSelection) {
    range = document.createRange();
    sel = window.getSelection();
    sel.removeAllRanges();
    try {
      range.selectNodeContents(el);
      sel.addRange(range);
    } catch (e) {
      range.selectNode(el);
      sel.addRange(range);
    }
    // createTextRange is IE only
  } else if (documentIEBody.createTextRange) {
    range = documentIEBody.createTextRange();
    range.moveToElementText(el);
    range.select();
  }
  document.execCommand("copy");
}
