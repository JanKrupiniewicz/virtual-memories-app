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
import { UpdateMemoriesSchema } from "@/db/schema/memories";

export default function MemoryPage({
  memory,
}: {
  memory: UpdateMemoriesSchema;
}) {
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{memory.title}</CardTitle>
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
          <p className="text-lg">{memory.description}</p>
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
              <span>Back</span>
            </Link>
          </Button>
          <div className="space-x-2">
            <Button variant="outline" asChild>
              <Link
                href={`/memories/${memory.id}/update`}
                className="flex items-center space-x-2"
              >
                <EditIcon className="w-4 h-4" />
                <span>Update</span>
              </Link>
            </Button>
            <Button variant="destructive" asChild>
              <Link
                href={`/memories/${memory.id}/delete`}
                className="flex items-center space-x-2"
              >
                <TrashIcon className="w-4 h-4" />
                <span>Delete</span>
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
