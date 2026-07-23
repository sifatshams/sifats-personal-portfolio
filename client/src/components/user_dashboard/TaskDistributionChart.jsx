// @ts-nocheck
const TaskDistributionChart = ({ analytics = [] }) => {
  // Calculate completion percentage from analytics or default to 0
  const completedItem = analytics.find(
    (item) => item.label?.toLowerCase() === 'completed'
  );
  
  const completionRate = completedItem?.percentage ?? 0;

  // Map backend labels or status to specific theme colors
  const getColorClass = (label = '') => {
    const lower = label.toLowerCase();
    if (lower.includes('progress')) return 'bg-amber-500';
    if (lower.includes('completed') || lower.includes('done')) return 'bg-emerald-500';
    return 'bg-slate-500';
  };

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
          {completionRate}% Done
        </span>
      </div>

      <div className="space-y-5">
        {analytics.length > 0 ? (
          analytics.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">{item.label}</span>
                <span className="text-slate-400">
                  {item.count} Tasks ({item.percentage}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${item.color || getColorClass(item.label)}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-xs text-slate-500">
            No analytics data available.
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDistributionChart;