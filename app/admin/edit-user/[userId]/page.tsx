import { EditProfileForm } from "@/components/forms/edit-profile-form";
import { getUserById } from "@/lib/api/users";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  const user = await getUserById(userId);

  if (!user) {
    return <div>User not found!</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl text-center tracking-tight italic font-bold mb-6">
        Edytuj profil użytkownika
      </h1>
      <EditProfileForm user={user}></EditProfileForm>
    </div>
  );
}
