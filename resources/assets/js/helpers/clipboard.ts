export function copyToClipboard(text: string): void {
  const textField = document.createElement("textarea");
  // textField.innerText = text;
  textField.value = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
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
