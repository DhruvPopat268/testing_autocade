import React, { useState } from 'react';

function DWGUploader() {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const file = event.target.modelFile.files[0];

    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('modelFile', file);

    try {
      setLoading(true);

      const response = await fetch('https://autodesk.1vans.in/api/models', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      const viewerUrl = data.viewerUrl;

      // Redirect to viewer URL
      window.location.href = viewerUrl;
    } catch (err) {
      alert('Upload error: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload DWG File</h2>
      <form onSubmit={handleFileUpload}>
        <input type="file" name="modelFile" accept=".dwg" required />
        <br /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}

export default DWGUploader;
