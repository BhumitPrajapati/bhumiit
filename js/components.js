const siteHeader = document.getElementById('site-header');
const siteFooter = document.getElementById('site-footer');

if (siteHeader) {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const pagePrefix = window.location.pathname.includes('/view/') ? '' : 'view/';
  const homeLink = window.location.pathname.includes('/view/') ? '../index.html' : 'index.html';
  const navigationLinks = [
    [`${pagePrefix}blog.html`, 'Blog'],
    [`${pagePrefix}stories.html`, 'Stories'],
    [`${pagePrefix}projects.html`, 'Projects'],
    [`${pagePrefix}about.html`, 'About']
  ];

  siteHeader.outerHTML = `
    <header>
      <a href="${homeLink}" class="brand">Bhumiit</a>
      <nav>
        ${navigationLinks.map(([href, label]) => {
          const linkPage = href.split('/').pop();
          const isBlogPage = linkPage === 'blog.html' && (currentPage.startsWith('blog-') || currentPage === 'resume.html');
          const isStoriesPage = linkPage === 'stories.html' && currentPage.startsWith('story-');
          return `
          <a href="${href}"${(currentPage === linkPage || isBlogPage || isStoriesPage) ? ' class="active"' : ''}>${label}</a>
        `;
        }).join('')}
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