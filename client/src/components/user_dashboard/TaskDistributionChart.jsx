// @ts-nocheck
const TaskDistributionChart = ({ data, completionRate }) => {
  // API ডাটা না থাকলে ডামি এনালিটিক্স অ্যারে রেডি
  const analytics = data || [
    { label: 'In Progress', count: 4, percentage: 40, color: 'bg-amber-500' },
    { label: 'Completed', count: 8, percentage: 66, color: 'bg-emerald-500' },
    {
      label: 'To Do / Backlog',
      count: 2,
      percentage: 14,
      color: 'bg-slate-500',
    },
  ];

  return (
    <div className="p-6 rounded-2xl border border-slate-800/80 bg-[#0b1120]/60 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-sm text-white tracking-wide">
            Task Analytics
          </h3>
          <p className="text-xs text-slate-500">
            Your performance ratio overview
          </p>
        </div>
        <span className="text-xs font-black text-[#646cff] bg-[#646cff]/10 px-2.5 py-1 rounded-md">
          {completionRate ?? 66}% Done
        </span>
      </div>

      <div className="space-y-5">
        {analytics.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">{item.label}</span>
              <span className="text-slate-400">
                {item.count} Tasks ({item.percentage}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
              <div
                className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDistributionChart;
