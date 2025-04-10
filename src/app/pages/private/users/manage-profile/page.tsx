import WithHeaderLayout from '_/app/layout-container/protected/WithHeaderLayout';
import ManageUserProfile from '../components/ManageUserProfile';

export default async function ProfilePage() {
  return (
    <WithHeaderLayout>
      <ManageUserProfile/>
    </WithHeaderLayout>
  );
}
