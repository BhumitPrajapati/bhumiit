// about-page code block: types itself out character by character, then shows a success line
(function () {
  const source = document.getElementById('code-source');
  const typedEl = document.getElementById('code-typed');
  const cursorEl = document.getElementById('code-cursor');
  const successEl = document.getElementById('code-success');
  if (!source || !typedEl) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const html = source.innerHTML.replace(/^\n/, '').replace(/\n$/, '');

  if (reduceMotion) {
    typedEl.innerHTML = html;
    if (cursorEl) cursorEl.style.display = 'none';
    if (successEl) successEl.classList.add('show');
    return;
  }

  let i = 0;
  let out = '';
  const speed = 14; // ms per character

  function step() {
    if (i >= html.length) {
      if (cursorEl) cursorEl.style.display = 'none';
      if (successEl) {
        setTimeout(() => successEl.classList.add('show'), 200);
      }
      return;
    }
    // if we hit a tag, output the whole tag at once instead of char by char
    if (html[i] === '<') {
      const close = html.indexOf('>', i);
      out += html.slice(i, close + 1);
      i = close + 1;
    } else {
      out += html[i];
      i++;
    }
    typedEl.innerHTML = out;
    setTimeout(step, speed);
  }

  // start typing once the container fade-in has settled
  setTimeout(step, 500);
})();
