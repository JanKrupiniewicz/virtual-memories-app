"use client";

import { memories } from "@/db/schema/memories";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";

type Memory = typeof memories.$inferSelect;

export default function MemoryCard({ memory }: { memory: Memory }) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="gap-4 p-4">
        <div className="flex flex-row justify-between">
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarIcon className="w-3 h-3 mr-1" />
            <span>{new Date(memory.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {memory.latitude && memory.longitude ? (
              <>
                <MapPinIcon className="w-3 h-3 inline mr-1" />
                {memory.latitude.toFixed(2)}, {memory.longitude.toFixed(2)}
              </>
            ) : (
              "No location"
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h1 className="text-center italic hover:underline text-3xl md:text-xl lg:text-3xl font-bold tracking-tight">
          {memory.title}
        </h1>
        <div className="flex justify-between items-center mb-2">
          <Link href={`/memories/${memory.id}`}>
            <Button variant="ghost">Zobacz</Button>
          </Link>
          <Link href={`/memories/${memory.id}/update`}>
            <Button variant="ghost">Edytuj</Button>
          </Link>
        </div>
        <p className="text-sm text-justify text-muted-foreground mb-2">
          {memory.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
        <div className="flex flex-row w-full justify-between">
          <Badge variant="secondary">{memory.category}</Badge>
          {memory.isPublic ? "Public memory" : "Private memory"}
        </div>
      </CardFooter>
    </Card>
  );
}
