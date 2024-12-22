import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpdateMemoriesSchema } from "@/db/schema/memories";
import { Button } from "@/components/ui/button";

export default function MemoriesDisplay({
  memories,
}: {
  memories: UpdateMemoriesSchema[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {memories.map((memory) => (
          <TableRow key={memory.id}>
            <TableCell className="font-medium">{memory.id}</TableCell>
            <TableCell>{memory.title}</TableCell>
            <TableCell>{memory.category}</TableCell>
            <TableCell>{memory.createdAt}</TableCell>
            <TableCell className="text-center space-x-6">
              <Button variant="ghost">Edit</Button>
              <Button variant="outline">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
