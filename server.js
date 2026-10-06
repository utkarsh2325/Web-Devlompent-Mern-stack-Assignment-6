// Simple Node.js HTTP Web Server
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Helper function to render HTML pages safely
const renderPage = (filePath, statusCode, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Internal Server Error');
    } else {
      res.writeHead(statusCode, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
};

const server = http.createServer((req, res) => {
  const url = req.url;

  // Handling different routes
  if (url === '/' || url === '/home') {
    const pagePath = path.join(__dirname, 'public', 'index.html');
    renderPage(pagePath, 200, res);
  } else if (url === '/about') {
    const pagePath = path.join(__dirname, 'public', 'about.html');
    renderPage(pagePath, 200, res);
  } else if (url === '/contact') {
    const pagePath = path.join(__dirname, 'public', 'contact.html');
    renderPage(pagePath, 200, res);
  } else {
    // Custom 404 handler for invalid routes
    const pagePath = path.join(__dirname, 'public', '404.html');
    renderPage(pagePath, 404, res);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running smoothly on http://localhost:${PORT}`);
});