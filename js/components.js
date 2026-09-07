const siteHeader = document.getElementById('site-header');
const siteFooter = document.getElementById('site-footer');

if (siteHeader) {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navigationLinks = [
    ['blog.html', 'Blog'],
    ['stories.html', 'Stories'],
    ['projects.html', 'Projects'],
    ['about.html', 'About']
  ];

  siteHeader.outerHTML = `
    <header>
      <a href="index.html" class="brand">Bhumiit</a>
      <nav>
        ${navigationLinks.map(([href, label]) => `
          <a href="${href}"${(currentPage === href || (href === 'blog.html' && currentPage.startsWith('blog-'))) ? ' class="active"' : ''}>${label}</a>
        `).join('')}
        <button id="theme-toggle" aria-label="Toggle theme">Light</button>
      </nav>
    </header>
  `;
}

if (siteFooter) {
  siteFooter.outerHTML = `
    <footer>
      © 2026 Bhumiit Prajapati. All rights reserved.
    </footer>
  `;
}