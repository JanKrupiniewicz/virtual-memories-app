import { EditProfileForm } from "@/components/edit-profile-form";
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
    <div className="container">
      <h1>Edit User</h1>
      <EditProfileForm user={user}>
        <button type="submit">Save</button>
      </EditProfileForm>
    </div>
  );
}
