// @ts-nocheck
import { useMemo } from 'react';
import TaskDistributionChart from '../../components/user_dashboard/TaskDistributionChart';
import { useMyTasksQuery } from '../../hooks/user/useTaskQuery';

const AnalyticsPage = () => {
  const { data: tasksData, isLoading } = useMyTasksQuery();

  const tasks = useMemo(() => {
    return Array.isArray(tasksData) ? tasksData : tasksData?.tasks || [];
  }, [tasksData]);

  // transform new task list
  const analyticsData = useMemo(() => {
    const total = tasks.length;
    if (total === 0) return [];

    const counts = tasks.reduce(
      (acc, task) => {
        const status = task.status || 'Pending';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      { Pending: 0, 'In Progress': 0, Completed: 0 },
    );

    return [
      {
        label: 'Completed',
        count: counts.Completed,
        percentage: Math.round((counts.Completed / total) * 100),
        color: 'bg-emerald-500',
      },
      {
        label: 'In Progress',
        count: counts['In Progress'],
        percentage: Math.round((counts['In Progress'] / total) * 100),
        color: 'bg-amber-500',
      },
      {
        label: 'Pending',
        count: counts.Pending,
        percentage: Math.round((counts.Pending / total) * 100),
        color: 'bg-slate-500',
      },
    ];
  }, [tasks]);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-xs text-slate-500">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-black text-white tracking-wide">
          Analytics Overview
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time completion metrics and task ratio
        </p>
      </div>

      {/* render TaskDistributionChart  */}
      <TaskDistributionChart analytics={analyticsData} />
    </div>
  );
};

export default AnalyticsPage;
