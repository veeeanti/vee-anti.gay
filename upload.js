// Unified upload function that handles any file size
const API_KEY = 'YOUR_API_KEY'; // Optional - get from dashboard settings
const BASE_URL = 'https://rootz.so';
const MULTIPART_THRESHOLD = 10 * 1024 * 1024; // 10MB

// Upload small files (< 10MB) directly
async function uploadSmallFile(file, folderId = null) {
  const formData = new FormData();
  formData.append('file', file);
  if (folderId) formData.append('folderId', folderId);

  const headers = {};
  if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`;

  const response = await fetch(`${BASE_URL}/api/files/upload`, {
    method: 'POST',
    headers,
    body: formData
  });

  const result = await response.json();
  if (!result.success) throw new Error(result.error);
  return result.data;
}

// Upload large files (>= 10MB) with multipart
async function uploadLargeFile(file, folderId = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`;

  // 1. Initialize
  const initRes = await fetch(`${BASE_URL}/api/files/multipart/init`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      folderId
    })
  });
  const { uploadId, key, chunkSize, totalParts } = await initRes.json();

  // 2. Get presigned URLs
  const urlsRes = await fetch(`${BASE_URL}/api/files/multipart/batch-urls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, uploadId, totalParts })
  });
  const { urls } = await urlsRes.json();

  // 3. Upload parts in parallel
  const uploadedParts = [];
  for (let i = 0; i < totalParts; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    const res = await fetch(urls[i].url, { method: 'PUT', body: chunk });
    uploadedParts.push({
      partNumber: i + 1,
      etag: res.headers.get('ETag')
    });
  }

  // 4. Complete
  const completeRes = await fetch(`${BASE_URL}/api/files/multipart/complete`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      key, uploadId, parts: uploadedParts,
      fileName: file.name, fileSize: file.size, contentType: file.type
    })
  });
  const result = await completeRes.json();
  if (!result.success) throw new Error(result.error);
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

// Usage example
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const result = await uploadFile(file);
    console.log('Uploaded:', result);
    alert(`Success! Share: https://rootz.so/d/${result.shortId}`);
  } catch (error) {
    console.error('Error:', error);
    alert('Upload failed: ' + error.message);
  }
});
