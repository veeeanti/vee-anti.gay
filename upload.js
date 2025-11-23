// Unified upload function that handles any file size
const API_KEY = 'rtz_619db4e782c92fef237f0ba2734bc4f237fe9f61981000de1386671179f7b282'; // <-- Set your API key here
const BASE_URL = 'https://rootz.so';
const MULTIPART_THRESHOLD = 10 * 1024 * 1024; // 10MB

// Upload small files (< 10MB) directly
async function uploadSmallFile(file, folderId = null) {
  const formData = new FormData();
  formData.append('file', file);
  if (folderId) formData.append('folderId', folderId);

  const headers = {};
  if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`;

  let response;
  try {
    response = await fetch(`${BASE_URL}/api/files/upload`, {
      method: 'POST',
      headers,
      body: formData
    });
  } catch (err) {
    throw new Error('Network error or CORS block.');
  }

  if (!response.ok) {
    throw new Error('Server returned status ' + response.status);
  }

  let result;
  try {
    result = await response.json();
  } catch (err) {
    throw new Error('Invalid JSON response from server.');
  }

  if (!result.success) throw new Error(result.error || 'Unknown error on upload.');
  return result.data;
}

// Upload large files (>= 10MB) with multipart
async function uploadLargeFile(file, folderId = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`;

  // 1. Initialize
  let initRes;
  try {
    initRes = await fetch(`${BASE_URL}/api/files/multipart/init`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        folderId
      })
    });
  } catch (err) {
    throw new Error('Network error or CORS block in multipart/init.');
  }

  if (!initRes.ok) throw new Error('Server error (init): ' + initRes.status);
  const { uploadId, key, chunkSize, totalParts } = await initRes.json();

  // 2. Get presigned URLs
  let urlsRes;
  try {
    urlsRes = await fetch(`${BASE_URL}/api/files/multipart/batch-urls`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, uploadId, totalParts })
    });
  } catch (err) {
    throw new Error('Network error or CORS block in multipart/batch-urls.');
  }

  if (!urlsRes.ok) throw new Error('Server error (batch-urls): ' + urlsRes.status);
  const { urls } = await urlsRes.json();

  // 3. Upload parts - sequentially for reliability (parallel risky for CORS)
  const uploadedParts = [];
  for (let i = 0; i < totalParts; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    let res;
    try {
      res = await fetch(urls[i].url, { method: 'PUT', body: chunk });
    } catch (err) {
      throw new Error(`Failed to upload part ${i + 1}: Network or CORS error.`);
    }
    if (!res.ok) throw new Error(`Failed to upload part ${i + 1}: Server status ${res.status}`);

    uploadedParts.push({
      partNumber: i + 1,
      etag: res.headers.get('ETag')
    });
  }

  // 4. Complete
  let completeRes;
  try {
    completeRes = await fetch(`${BASE_URL}/api/files/multipart/complete`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        key, uploadId, parts: uploadedParts,
        fileName: file.name, fileSize: file.size, contentType: file.type
      })
    });
  } catch (err) {
    throw new Error('Network error or CORS block in multipart/complete.');
  }
  if (!completeRes.ok) throw new Error('Server error (complete): ' + completeRes.status);

  const result = await completeRes.json();
  if (!result.success) throw new Error(result.error || 'Unknown error on upload.');
  return result.data;
}

// Main upload function - automatically chooses the right method
async function uploadFile(file, folderId = null) {
  if (file.size < MULTIPART_THRESHOLD) {
    console.log(`Uploading ${file.name} (small file)`);
    return await uploadSmallFile(file, folderId);
  } else {
    console.log(`Uploading ${file.name} (large file - multipart)`);
    return await uploadLargeFile(file, folderId);
  }
}

// Hook up the form elements and display logic
document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('fileInput');
  const uploadForm = document.getElementById('uploadForm');
  const statusDiv = document.getElementById('uploadStatus');
  const btn = uploadForm.querySelector('button[type="submit"]');
  let uploading = false;

  uploadForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (uploading) return;

    const file = fileInput.files[0];
    if (!file) {
      statusDiv.textContent = "Please select a file.";
      return;
    }

    if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
      statusDiv.textContent = "Please set your API key in upload.js.";
      return;
    }

    statusDiv.textContent = "Uploading...";
    btn.disabled = true;
    uploading = true;

    try {
      const result = await uploadFile(file);
      statusDiv.innerHTML =
        `✅ Success!<br>Share: <a href="https://rootz.so/d/${result.shortId}" target="_blank">https://rootz.so/d/${result.shortId}</a>`;
    } catch (error) {
      statusDiv.textContent = "❌ Upload failed: " + error.message;
    } finally {
      btn.disabled = false;
      uploading = false;
    }
  });
});