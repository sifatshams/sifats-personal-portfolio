import SEO from '../../components/SEO';
import ProfileProgressCard from '../../components/user_dashboard/ProfileProgressCard';
import RecentTasks from '../../components/user_dashboard/RecentTasks';
import TaskDistributionChart from '../../components/user_dashboard/TaskDistributionChart';
import UpcomingDeadlines from '../../components/user_dashboard/UpcomingDeadlines';
import UserDashboardStats from '../../components/user_dashboard/UserDashboardStats';
import UserQuickActions from '../../components/user_dashboard/UserQuickActions';

// user dash
const UserDashboard = () => {
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
      <UserDashboardStats />

      {/* Task Progress Chart + User Profile Progress Card */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TaskDistributionChart />
        </div>

        <ProfileProgressCard />
      </div>

      {/* Recent Tasks Table + Upcoming Deadlines Timeline */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentTasks />
        </div>

        <UpcomingDeadlines />
      </div>

      {/* User Quick Actions (Create Task, View Settings, etc.) */}
      <UserQuickActions />
    </div>
  );
};

export default UserDashboard;
