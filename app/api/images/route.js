// /app/api/images/route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function GET() {
  try {
    const { resources } = await cloudinary.search
      .expression("folder:uploads") // change 'upload' to your folder name
      .sort_by("created_at", "desc")
      .max_results(50)
      .execute();

    return NextResponse.json({ images: resources });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
