"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function PhotoUpload({ memoryId }: { memoryId: string }) {
  async function handleSubmit(event: any) {
    event.preventDefault();

    const file = event.target.elements.picture.files[0];

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "memory-preset");

    const resClouinary = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const cloudinaryResponse = await resClouinary.json();

    const resApi = await fetch(`/api/memories/${memoryId}/photos`, {
      method: "POST",
      body: JSON.stringify({
        file: cloudinaryResponse.secure_url,
      }),
    });

    if (resApi.ok) {
      alert("Photo uploaded successfully!");
    } else {
      alert("Error uploading photo.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid mb-10 space-y-5 w-full items-center gap-1.5"
    >
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
      <Button type="submit">Upload</Button>
    </form>
  );
}
