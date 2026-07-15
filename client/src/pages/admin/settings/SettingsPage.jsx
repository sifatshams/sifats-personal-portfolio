import AccountSettingsCard from '../../../components/admin_dashboard/settings/AccountSettingsCard';
import ChangePasswordCard from '../../../components/admin_dashboard/settings/ChangePasswordCard';
import DangerZoneCard from '../../../components/admin_dashboard/settings/DangerZoneCard';
import NotificationSettingsCard from '../../../components/admin_dashboard/settings/NotificationSettingsCard';
import ProfilePhotoCard from '../../../components/admin_dashboard/settings/ProfilePhotoCard';
import SecurityCard from '../../../components/admin_dashboard/settings/SecurityCard';
import SettingsHeader from '../../../components/admin_dashboard/settings/SettingsHeader';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <SettingsHeader />

        <div className="mt-8 space-y-8">
          <AccountSettingsCard />

          <ProfilePhotoCard />

          <ChangePasswordCard />

          <NotificationSettingsCard />

          <SecurityCard />

          <DangerZoneCard />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
