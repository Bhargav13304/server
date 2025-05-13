const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8000;

// Folder where your codes are stored on the E drive
const codesFolderPath = 'E:/my-server/CodeFiles'; // Modify this path

// Serve static files if necessary (e.g., images, styles, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Frontpage: List all code files in the 'CodeFiles' folder
app.get('/', (req, res) => {
  fs.readdir(codesFolderPath, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading files');
    }

    const fileList = files.map(file => {
      return `<li><a href="/view/${file}">${file}</a></li>`;
    }).join('');

    res.send(`
      <h1>Code Files</h1>
      <ul>
        ${fileList}
      </ul>
    `);
  });
});

// Display file contents when clicked
app.get('/view/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(codesFolderPath, filename);

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading the file');
    }

    res.send(`
      <h1>${filename}</h1>
      <pre>${data}</pre>
      <a href="/">Back to list</a>
    `);
  });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
