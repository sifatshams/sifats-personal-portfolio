// @ts-nocheck

import ProfileProgressCard from '../../components/user_dashboard/ProfileProgressCard';
import RecentTasks from '../../components/user_dashboard/RecentTasks';
import TaskDistributionChart from '../../components/user_dashboard/TaskDistributionChart';
import UpcomingDeadlines from '../../components/user_dashboard/UpcomingDeadlines';
import UserDashboardStats from '../../components/user_dashboard/UserDashboardStats';
import UserQuickActions from '../../components/user_dashboard/UserQuickActions';

// ইউজার স্পেসিফিক ড্যাশবোর্ড কোয়েরি হুক

const UserDashboard = () => {
  // ইউজারের নিজস্ব ড্যাশবোর্ড ডাটা ফেচিং
  // const { data, isLoading, isError, error } = useUserDashboardQuery();

  /**
   * API Support Layer
   * অ্যাডমিনের মতোই সেফটি হ্যান্ডলিং
   */
  // const dashboard = data?.data || data;

  // if (isLoading) {
  //   return (
  //     <div className="flex h-[70vh] items-center justify-center">
  //       <p className="text-slate-400 text-lg">Loading your dashboard...</p>
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <div className="flex h-[70vh] items-center justify-center">
  //       <p className="text-rose-500 font-medium">
  //         {error?.response?.data?.message || 'Failed to load user dashboard'}
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-8">
      {/* 1. User Task & Project Stats Counters */}
      <UserDashboardStats />

      {/* 2. Task Progress Chart + User Profile Progress Card */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TaskDistributionChart />
        </div>

        <ProfileProgressCard />
      </div>

      {/* 3. Recent Tasks Table + Upcoming Deadlines Timeline */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentTasks />
        </div>

        <UpcomingDeadlines />
      </div>

      {/* 4. User Quick Actions (Create Task, View Settings, etc.) */}
      <UserQuickActions />
    </div>
  );
};

export default UserDashboard;
