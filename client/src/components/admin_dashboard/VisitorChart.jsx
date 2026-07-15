import { FaArrowDown, FaArrowUp, FaChartLine } from 'react-icons/fa';

const VisitorChart = ({ data = [], growth = 0 }) => {
  const maxValue = Math.max(...data.map((item) => item.visitors), 1);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <FaChartLine className="text-indigo-400" />
            Visitor Analytics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Last 7 days visitor statistics
          </p>
        </div>

        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            growth >= 0 ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          {growth >= 0 ? <FaArrowUp /> : <FaArrowDown />}
          {Math.abs(growth)}%
        </div>
      </div>

      <div className="flex h-56 items-end justify-between gap-3">
        {data.map((item) => (
          <div
            key={item.date}
            className="flex flex-1 flex-col items-center h-full"
          >
            <div className="flex h-[85%] w-full items-end justify-center">
              <div
                className="w-5 rounded-full bg-gradient-to-t from-indigo-600 to-cyan-400 transition-all duration-500 hover:scale-110"
                style={{
                  height: `${(item.visitors / maxValue) * 100}%`,
                }}
              />
            </div>

            <span className="mt-3 text-xs text-slate-500">
              {new Date(item.date).toLocaleDateString('en-US', {
                weekday: 'short',
              })}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
        <span>Total Days: {data.length}</span>

        <span className="text-indigo-400">Live Analytics</span>
      </div>
    </div>
  );
};

export default VisitorChart;
