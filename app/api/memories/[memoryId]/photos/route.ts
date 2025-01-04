import { saveMemoryPhoto } from "@/lib/api/memories";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function POST(
  req: Request,
  { params }: { params: { memoryId: string } }
) {
  const memoryId = params.memoryId;
  const body = await req.json();
  const photoUrl = body.photoUrl;

  const result = await saveMemoryPhoto({ memoryId, photoUrl });

  if (!result) {
    return new Response(null, { status: 500 });
  }

  return new Response(null, { status: 201 });
}
