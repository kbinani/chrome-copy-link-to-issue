(() => {
  if (window.isAlreadyPrepared) {
    return;
  }
  window.isAlreadyPrepared = true;
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (!!request.format) {
      copy(request.format);
    }
  });

  const copy = (format) => {
    return execCopy(getFormattedIssueLink(format));
  };

  const execCopy = (text) => {
    const textArea = document.createElement('textarea');
    textArea.style.cssText = 'position:absolute;left:-100%;';

    document.body.appendChild(textArea);

    textArea.value = text;
    textArea.select();
    document.execCommand('copy');

    document.body.removeChild(textArea);
  };

  const getFormattedIssueLink = (format) => {
    const h1 = 'h1.gh-header-title';
    const title = document.querySelectorAll(`${h1} .js-issue-title`)[0].innerText.trim();
    const num = document.querySelectorAll(`${h1} .f1-light`)[0].innerText;
    const url = window.location.href;
    const name = 'kbinani';
    const isAuthor = document.querySelectorAll(`#partial-discussion-header a.author[data-hovercard-url="/users/${name}/hovercard"]`).length > 0;

    if (isAuthor) {
      return `${url} \`${title}\``;
    } else {
      return `${url} 「${title}」`;
    }
  };

  const isPullRequestUrl = (url) => {
    return /^https:\/\/github.com\/(.+)\/(.+)\/pull\/(\d+)/.test(url)
  };
})();

