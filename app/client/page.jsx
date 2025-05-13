// // app/client-gallery/page.jsx
// "use client";
// import { useEffect, useState } from "react";

// export default function ClientGallery() {
//   const [images, setImages] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     const fetchImages = async () => {
//       const res = await fetch("/api/images");
//       const data = await res.json();
//       setImages(data.images);
//     };
//     fetchImages();
//   }, []);

//   return (
//     <div>
//       <h2 className="title">Image Gallery</h2>
//       <div className="grid">
//         {images.map((img) => (
//           <img
//             key={img.asset_id}
//             src={img.secure_url}
//             alt=""
//             className="thumb"
//             onClick={() => setSelectedImage(img.secure_url)}
//           />
//         ))}
//       </div>

//       {selectedImage && (
//         <div className="overlay" onClick={() => setSelectedImage(null)}>
//           <img src={selectedImage} className="full-image" />
//         </div>
//       )}

//       <style jsx>{`
//         .title {
//           text-align: center;
//           font-size: 2rem;
//           margin: 1rem 0;
//         }
//         .grid {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 10px;
//           justify-content: center;
//         }
//         .thumb {
//           width: 150px;
//           height: 150px;
//           object-fit: cover;
//           cursor: pointer;
//           border-radius: 8px;
//         }
//         .overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100vw;
//           height: 100vh;
//           background: rgba(0, 0, 0, 0.8);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1000;
//         }
//         .full-image {
//           max-width: 90%;
//           max-height: 90%;
//           border-radius: 10px;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";

export default function ClientGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/images");
        const data = await res.json();
        setImages(data.images);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      <h2 className="title">Image Gallery</h2>

      {loading ? (
        <div className="loader">Loading images...</div>
      ) : (
        <div className="grid">
          {images.map((img) => (
            <img
              key={img.asset_id}
              src={img.secure_url}
              alt=""
              className="thumb"
              onClick={() => setSelectedImage(img.secure_url)}
            />
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="overlay" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} className="full-image" />
        </div>
      )}

      <style jsx>{`
        .title {
          text-align: center;
          font-size: 2rem;
          margin: 1rem 0;
        }
        .loader {
          text-align: center;
          margin-top: 2rem;
          font-size: 1.2rem;
          color: #666;
        }
        .grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
        .thumb {
          width: 150px;
          height: 150px;
          object-fit: cover;
          cursor: pointer;
          border-radius: 8px;
        }
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .full-image {
          max-width: 90%;
          max-height: 90%;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
