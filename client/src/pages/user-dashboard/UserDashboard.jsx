import SEO from '../../components/SEO';
import ProfileProgressCard from '../../components/user_dashboard/ProfileProgressCard';
import RecentTasks from '../../components/user_dashboard/RecentTasks';
import TaskDistributionChart from '../../components/user_dashboard/TaskDistributionChart';
import UpcomingDeadlines from '../../components/user_dashboard/UpcomingDeadlines';
import UserDashboardStats from '../../components/user_dashboard/UserDashboardStats';
import UserQuickActions from '../../components/user_dashboard/UserQuickActions';
import { useDashboardSummaryQuery } from '../../hooks/user/useTaskQuery';

// user dash
const UserDashboard = () => {
  // tanStack query hook
  const { data, isLoading, isError, error } = useDashboardSummaryQuery();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-slate-400 font-semibold text-xs">
          <span className="w-4 h-4 border-2 border-[#646cff] border-t-transparent rounded-full animate-spin"></span>
          <span>Loading dashboard analytics...</span>
        </div>
      </div>
    );
  }

  // error state
  if (isError) {
    return (
      <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 text-center">
        <p className="text-xs font-bold text-rose-400">
          Failed to load dashboard:{' '}
          {error?.response?.data?.message ||
            error?.message ||
            'Something went wrong!'}
        </p>
      </div>
    );
  }

  // destructure dynamic API response
  const { stats, taskAnalytics, recentTasks, upcomingDeadlines } = data || {};

  return (
    <div className="space-y-8">
      {/* seo tags */}
      <SEO
        title="User Dashboard"
        description="View your account overview, manage your profile, track your activity, and access all your personalized features from your dashboard."
        keywords="user dashboard, my account, profile overview, dashboard, account management"
        image="/og-user-dashboard.png"
        url="https://sifatcoder.vercel.app/user-dashboard"
      />

      {/* User Task & Project Stats Counters */}
      <UserDashboardStats stats={stats} />

      {/* Task Progress Chart + User Profile Progress Card */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TaskDistributionChart analytics={taskAnalytics} />
        </div>

        <ProfileProgressCard />
      </div>

      {/* Recent Tasks Table + Upcoming Deadlines Timeline */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentTasks tasks={recentTasks} />
        </div>

        <UpcomingDeadlines deadlines={upcomingDeadlines} />
      </div>

      {/* User Quick Actions (Create Task, View Settings, etc.) */}
      <UserQuickActions />
    </div>
  );
};

export default UserDashboard;
