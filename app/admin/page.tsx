import { getUsers } from "@/lib/api/users";
import { getMemories } from "@/lib/api/memories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersDisplay from "@/components/users-display";
import MemoriesDisplay from "@/components/memories-display";
import { getNumberOfMemoriesPerCategory } from "@/lib/api/dashboard";
import Dashboard from "@/components/dashboard";

export default async function AdminPage() {
  const users = await getUsers();
  const memories = await getMemories();
  const dashboardData = await getNumberOfMemoriesPerCategory();

  return (
    <div className="container">
      <h1 className="text-3xl text-center tracking-tight italic font-bold mb-6">
        Panel administracyjny
      </h1>
      <Dashboard memoriesData={dashboardData}></Dashboard>
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
