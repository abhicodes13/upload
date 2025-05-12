import cloudinary from "cloudinary";

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Handle POST request for image upload
export async function POST(req) {
  try {
    const formData = await req.formData(); // Get form data from the request
    const image = formData.get("image"); // Extract image from form data

    if (!image) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Convert the image to a buffer
    const buffer = await image.arrayBuffer(); // Convert the file to a buffer

    // Promisify the upload stream
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { folder: "uploads" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      // Pipe the buffer into the upload stream
      uploadStream.end(Buffer.from(buffer));
    });

    // Await the upload response
    const uploadResponse = await uploadPromise;

    // If the upload is successful, return the image URL
    return new Response(JSON.stringify({ url: uploadResponse.secure_url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return new Response(JSON.stringify({ error: "Error uploading image" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
