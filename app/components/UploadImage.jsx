"use client";
import { useState } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await res.json();

      if (data.url) {
        setImageUrl(data.url);
        alert("Image uploaded successfully!");
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      alert("Error uploading image");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  function copyToClipboard() {
    if (imageUrl) {
      navigator.clipboard.writeText(imageUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  }
  return (
    <div className="app-container">
      <div className="content">
        <h1>Upload Your Image to get a URL</h1>

        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          accept="image/*"
        />

        <button onClick={uploadImage} className="upload-btn" disabled={loading}>
          {loading ? "Uploading..." : "Upload Image"}
        </button>

        {imageUrl && (
          <div className="image-preview">
            <h2>Uploaded Image:</h2>
            <img src={imageUrl} alt="Uploaded" className="uploaded-img" />
            <button onClick={copyToClipboard} className="copy">
              {copySuccess ? "Copied" : "Copy URL"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
