import { uploadToCloudinary } from "@/lib/api/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const fileBuffer = await file.arrayBuffer();

  const mimeType = file.type;
  const encoding = "base64";
  const base64Data = Buffer.from(fileBuffer).toString("base64");

  const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

  console.log();

  const res = await uploadToCloudinary(fileUri, file.name);

  console.log(res);

  if (res.success && res.result) {
    return NextResponse.json({
      message: "success",
      imgUrl: res.result.secure_url,
    });
  } else return NextResponse.json({ message: "failure" });
}