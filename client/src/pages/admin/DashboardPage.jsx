import ActivityTimeline from '../../components/admin_dashboard/ActivityTimeline';
import DashboardStats from '../../components/admin_dashboard/DashboardStats';
import MessagesTable from '../../components/admin_dashboard/MessagesTable';
import ProfileCard from '../../components/admin_dashboard/ProfileCard';
import QuickActions from '../../components/admin_dashboard/QuickActions';
import RecentProjects from '../../components/admin_dashboard/RecentProjects';
import VisitorChart from '../../components/admin_dashboard/VisitorChart';

import { useDashboardQuery } from '../../hooks/admin/useDashboardQuery';

const DashboardPage = () => {
  const { data, isLoading, isError, error } = useDashboardQuery();

  /**
   * API support
   *
   * {
   *   success:true,
   *   data:{...}
   * }
   *
   * OR
   *
   * {
   *   stats...
   * }
   */
  const dashboard = data?.data || data;

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-slate-400 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-red-500">
          {error?.response?.data?.message || 'Failed to load dashboard'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats */}

      <DashboardStats stats={dashboard?.stats} />

      {/* Chart + Profile */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <VisitorChart
            data={dashboard?.visitorChart}
            growth={dashboard?.stats?.growth}
          />
        </div>

        <ProfileCard profile={dashboard?.profile} />
      </div>

      {/* Projects + Activity */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentProjects projects={dashboard?.recentProjects || []} />
        </div>

        <ActivityTimeline activities={dashboard?.activities || []} />
      </div>

      {/* Messages */}

      <MessagesTable messages={dashboard?.recentMessages || []} />

      {/* Quick Actions */}

      <QuickActions />
    </div>
  );
};

export default DashboardPage;
