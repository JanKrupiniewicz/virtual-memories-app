"use client";

import { UpdateMemoriesSchema } from "@/db/schema/memories";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPinIcon,
  LockOpenIcon,
  EditIcon,
  TrashIcon,
  ArrowLeftIcon,
  LockOpen,
} from "lucide-react";
import { toast } from "sonner";
import { SessionContext } from "@/store/session-context";
import { useRouter } from "next/navigation";

export default function MemoryPage({
  params,
}: {
  params: Promise<{ memoryId: string }>;
}) {
  const [memory, setMemory] = useState<UpdateMemoriesSchema | null>(null);
  const router = useRouter();
  const sessionCtx = useContext(SessionContext);

  if (!sessionCtx?.session) {
    router.push("/");
    return null;
  }

  useEffect(() => {
    async function fetchMemory() {
      const { memoryId } = await params;
      const response = await fetch(`/api/memories/${memoryId}`);
      const memory = await response.json();
      setMemory(memory);
    }

    fetchMemory();
  }, []);

  if (!memory) {
    return null;
  }

  async function deleteMemory() {
    const response = await fetch(`/api/memories/${memory?.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      toast.error("Failed to delete memory");
    }

    toast.success("Event has been deleted");
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-bold tracking-tight italic underline">
            {memory.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {memory.latitude && memory.longitude && (
            <div className="flex items-center space-x-2 text-sm">
              <MapPinIcon className="w-4 h-4 text-muted-foreground" />
              <span>
                {memory.latitude.toFixed(4)}, {memory.longitude.toFixed(4)}
              </span>
            </div>
          )}
          <p className="text-lg text-justify">{memory.description}</p>
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{memory.category}</Badge>
            <div className="flex items-center space-x-1 text-sm">
              {memory.isPublic ? (
                <>
                  <LockOpenIcon className="w-4 h-4" />
                  <span>Public</span>
                </>
              ) : (
                <>
                  <LockOpen className="w-4 h-4" />
                  <span>Private</span>
                </>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/memories" className="flex items-center space-x-2">
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Wróć</span>
            </Link>
          </Button>
          <div className="space-x-2">
            <Button variant="outline" asChild>
              <Link
                href={`/memories/${memory.id}/update`}
                className="flex items-center space-x-2"
              >
                <EditIcon className="w-4 h-4" />
                <span>Edytuj</span>
              </Link>
            </Button>
            <Button onClick={deleteMemory} variant="destructive" asChild>
              <span className="flex items-center">
                <TrashIcon className="w-4 h-4" />
                <span>Usuń</span>
              </span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
