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
  const memoryIdNumber = parseInt(memoryId);

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return new Response("Invalid file upload.", { status: 400 });
  }

  // try {
  //   const result = await cloudinary.uploader.upload(file, {
  //     upload_preset: "memory-preset",
  //     folder: "memories",
  //   });

  //   await saveMemoryPhoto({
  //     memoryId: memoryIdNumber,
  //     photoUrl: result.secure_url,
  //   });

  //   return new Response(JSON.stringify(result), { status: 200 });
  // } catch (err) {
  //   return new Response("Error uploading the files.", { status: 500 });
  // }
}
