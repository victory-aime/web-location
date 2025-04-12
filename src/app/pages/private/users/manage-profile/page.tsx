import WithHeaderLayout from '_/app/layout-container/protected/WithHeaderLayout';
import ManageUserProfile from '../components/ManageUserProfile';

export default function ProfilePage() {
  return (
    <WithHeaderLayout>
      <ManageUserProfile/>
    </WithHeaderLayout>
  );
}
