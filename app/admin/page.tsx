import { getUsers } from "@/lib/api/users";
import { getMemories } from "@/lib/api/memories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersDisplay from "@/components/users-display";
import MemoriesDisplay from "@/components/memories-display";

export default async function AdminPage() {
  const users = await getUsers();
  const memories = await getMemories();

  return (
    <div className="container">
      <Tabs defaultValue="users">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="memories">Memories</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UsersDisplay users={users} />
        </TabsContent>
        <TabsContent value="memories">
          <MemoriesDisplay memories={memories} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
