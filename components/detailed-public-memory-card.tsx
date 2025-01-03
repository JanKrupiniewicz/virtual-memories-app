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
  ArrowLeftIcon,
  LockOpen,
} from "lucide-react";
import { UpdateMemoriesSchema } from "@/db/schema/memories";

export default function DetailedPublicMemoryCard({
  memory,
}: {
  memory: UpdateMemoriesSchema;
}) {
  return (
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
        <Badge variant="secondary">{memory.category}</Badge>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/public-memories" className="flex items-center space-x-2">
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Wróć</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
