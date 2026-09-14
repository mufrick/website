/**
 * Doha InfoTech - Cloudflare Workers Website
 * Full-featured website with pages, content management, and image support
 */

// Simple in-memory database (persists during worker lifetime)
let pageData = {
  home: {
    title: 'Doha InfoTech',
    subtitle: 'Your Technology Solutions Partner',
    content: 'Welcome to Doha InfoTech. We provide cutting-edge technology solutions for businesses.',
    image: '/images/hero.jpg'
  },
  about: {
    title: 'About Us',
    content: 'We are a leading technology company in Doha, Qatar.',
    image: '/images/about.jpg'
  },
  services: {
    title: 'Our Services',
    content: 'Web Development, Mobile Apps, Cloud Solutions, and more.',
    image: '/images/services.jpg'
  },
  contact: {
    title: 'Contact Us',
    content: 'Email: info@dohainfotech.com\nPhone: +974 XXXX XXXX',
    image: null
  }
};

// Helper function to get CSS
function getCSS() {
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    
    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    header h1 {
      margin-bottom: 10px;
      font-size: 2em;
    }
    
    nav {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      margin-top: 15px;
    }
    
    nav a {
      color: white;
      text-decoration: none;
      padding: 8px 15px;
      border-radius: 5px;
      transition: background 0.3s;
    }
    
    nav a:hover {
      background: rgba(255,255,255,0.2);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    
    .page-header {
      background: #f5f5f5;
      padding: 40px 20px;
      text-align: center;
      margin-bottom: 30px;
    }
    
    .page-header h2 {
      font-size: 2.5em;
      color: #667eea;
      margin-bottom: 10px;
    }
    
    .content-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      align-items: center;
      margin-bottom: 40px;
    }
    
    .content-section img {
      width: 100%;
      height: auto;
      border-radius: 10px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    }
    
    .content-text {
      font-size: 1.1em;
      line-height: 1.8;
      color: #555;
    }
    
    .content-text h3 {
      color: #667eea;
      margin-bottom: 15px;
      font-size: 1.5em;
    }
    
    .admin-panel {
      background: #f9f9f9;
      border: 2px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    
    .admin-panel h3 {
      color: #333;
      margin-bottom: 15px;
    }
    
    .form-group {
      margin-bottom: 15px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }
    
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-family: inherit;
      font-size: 1em;
    }
    
    .form-group textarea {
      min-height: 120px;
      resize: vertical;
    }
    
    button {
      background: #667eea;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1em;
      transition: background 0.3s;
    }
    
    button:hover {
      background: #764ba2;
    }
    
    .success {
      background: #4CAF50;
      color: white;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }
    
    .service-card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      transition: transform 0.3s;
    }
    
    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    }
    
    footer {
      background: #333;
      color: white;
      text-align: center;
      padding: 20px;
      margin-top: 50px;
    }
    
    @media (max-width: 768px) {
      .content-section {
        grid-template-columns: 1fr;
      }
      
      nav {
        gap: 10px;
      }
      
      .page-header h2 {
        font-size: 1.8em;
      }
    }
  `;
}

// Homepage template
function getHomePage() {
  const data = pageData.home;
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.title}</title>
      <style>${getCSS()}</style>
    </head>
    <body>
      <header>
        <h1>${data.title}</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
          <a href="/admin">Admin</a>
        </nav>
      </header>
      
      <div class="page-header">
        <h2>${data.subtitle}</h2>
      </div>
      
      <div class="container">
        <div class="content-section">
          <div class="content-text">
            <h3>Welcome</h3>
            <p>${data.content}</p>
            <p style="margin-top: 20px;">
              <button onclick="window.location.href='/services'">Learn More</button>
            </p>
          </div>
          ${data.image ? `<img src="${data.image}" alt="Hero Image">` : ''}
        </div>
      </div>
      
      <footer>
        <p>&copy; 2024 Doha InfoTech. All rights reserved.</p>
      </footer>
    </body>
    </html>
  `;
}

// Generic page template
function getPageTemplate(pageName) {
  const data = pageData[pageName] || { title: 'Page', content: 'Page not found' };
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.title}</title>
      <style>${getCSS()}</style>
    </head>
    <body>
      <header>
        <h1>Doha InfoTech</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
          <a href="/admin">Admin</a>
        </nav>
      </header>
      
      <div class="page-header">
        <h2>${data.title}</h2>
      </div>
      
      <div class="container">
        <div class="content-section">
          <div class="content-text">
            <p>${data.content.replace(/\n/g, '</p><p>')}</p>
          </div>
          ${data.image ? `<img src="${data.image}" alt="${data.title}">` : ''}
        </div>
      </div>
      
      <footer>
        <p>&copy; 2024 Doha InfoTech. All rights reserved.</p>
      </footer>
    </body>
    </html>
  `;
}

// Admin panel template
function getAdminPanel() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Admin Panel - Doha InfoTech</title>
      <style>${getCSS()}</style>
    </head>
    <body>
      <header>
        <h1>Doha InfoTech - Admin Panel</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/admin">Admin</a>
        </nav>
      </header>
      
      <div class="container">
        <div class="admin-panel">
          <h2>Edit Pages</h2>
          <p>Use the forms below to edit your website content.</p>
          
          <div class="form-group">
            <label for="page-select">Select Page:</label>
            <select id="page-select" onchange="loadPage(this.value)" style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; width: 100%;">
              <option value="home">Home</option>
              <option value="about">About</option>
              <option value="services">Services</option>
              <option value="contact">Contact</option>
            </select>
          </div>
          
          <form id="edit-form" onsubmit="savePage(event)">
            <div class="form-group">
              <label for="title">Page Title:</label>
              <input type="text" id="title" name="title" required>
            </div>
            
            <div class="form-group">
              <label for="content">Page Content:</label>
              <textarea id="content" name="content" required></textarea>
            </div>
            
            <div class="form-group">
              <label for="image">Image URL:</label>
              <input type="url" id="image" name="image" placeholder="https://example.com/image.jpg">
            </div>
            
            <div class="form-group">
              <label for="subtitle">Subtitle (Home only):</label>
              <input type="text" id="subtitle" name="subtitle">
            </div>
            
            <button type="submit">Save Changes</button>
          </form>
          
          <div id="message"></div>
        </div>
      </div>
      
      <script>
        let currentPage = 'home';
        
        function loadPage(page) {
          currentPage = page;
          const data = ${JSON.stringify(pageData)};
          const pageData = data[page];
          
          document.getElementById('title').value = pageData.title || '';
          document.getElementById('content').value = pageData.content || '';
          document.getElementById('image').value = pageData.image || '';
          document.getElementById('subtitle').value = pageData.subtitle || '';
        }
        
        function savePage(e) {
          e.preventDefault();
          const data = {
            page: currentPage,
            title: document.getElementById('title').value,
            content: document.getElementById('content').value,
            image: document.getElementById('image').value,
            subtitle: document.getElementById('subtitle').value
          };
          
          fetch('/api/save-page', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          .then(r => r.json())
          .then(result => {
            const msg = document.getElementById('message');
            msg.className = result.success ? 'success' : 'error';
            msg.textContent = result.message;
          });
        }
        
        // Load home page on load
        loadPage('home');
      </script>
      
      <footer>
        <p>&copy; 2024 Doha InfoTech. All rights reserved.</p>
      </footer>
    </body>
    </html>
  `;
}

// Main worker handler
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // API: Save page data
    if (pathname === '/api/save-page' && request.method === 'POST') {
      const body = await request.json();
      const { page, title, content, image, subtitle } = body;
      
      if (pageData[page]) {
        pageData[page].title = title;
        pageData[page].content = content;
        pageData[page].image = image || null;
        if (subtitle) pageData[page].subtitle = subtitle;
        
        return new Response(JSON.stringify({ success: true, message: 'Page saved successfully!' }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      return new Response(JSON.stringify({ success: false, message: 'Page not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Pages routing
    if (pathname === '/') {
      return new Response(getHomePage(), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    if (pathname === '/about') {
      return new Response(getPageTemplate('about'), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    if (pathname === '/services') {
      return new Response(getPageTemplate('services'), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    if (pathname === '/contact') {
      return new Response(getPageTemplate('contact'), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    if (pathname === '/admin') {
      return new Response(getAdminPanel(), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // Health check
    if (pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 404
    return new Response('Page not found', { status: 404 });
  },
};
