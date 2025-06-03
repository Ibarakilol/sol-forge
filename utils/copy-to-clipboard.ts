const copyToClipboardFallback = async (text: string) => {
  try {
    return await new Promise((resolve: any, reject) => {
      const range = document.createRange();
      range.selectNodeContents(document.body);
      document.getSelection()?.addRange(range);

      let success = false;
      const listener = (e: any) => {
        e.clipboardData.setData('text/plain', text);
        e.preventDefault();
        success = true;
      };

      document.addEventListener('copy', listener);
      document.execCommand('copy');
      document.removeEventListener('copy', listener);
      document.getSelection()?.removeAllRanges();

      if (success) {
        resolve();
      } else {
        reject();
      }
    });
  } catch (err) {
    return console.log(err);
  }
};

export const copyToClipboard = async (text: string, onSuccess?: () => void) => {
  try {
    if (!navigator.clipboard) {
      await copyToClipboardFallback(text);
      onSuccess?.();
      return;
    }

    await navigator.clipboard.writeText(text);
    onSuccess?.();
  } catch (err) {
    console.log(`Failed to copy ${text}`);
  }
};
