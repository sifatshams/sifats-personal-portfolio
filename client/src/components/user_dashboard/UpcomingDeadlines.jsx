// @ts-nocheck
import { FaHourglassHalf } from 'react-icons/fa';

const UpcomingDeadlines = ({ deadlines }) => {
  // ডামি ডেডলাইন ফলব্যাক ডাটা
  const dummyDeadlines = [
    { title: 'Fix Vite Tailwind Config Error', due: 'Tomorrow 11:59 PM' },
    { title: 'Deploy App to Production Server', due: 'In 3 days' },
  ];

  const displayDeadlines =
    deadlines && deadlines.length > 0 ? deadlines : dummyDeadlines;

  return (
    <div className="p-6 rounded-2xl border border-slate-800/80 bg-[#0b1120]/60">
      <div className="flex items-center gap-2 mb-5">
        <FaHourglassHalf className="text-rose-400 text-xs animate-pulse" />
        <h3 className="font-bold text-sm text-white tracking-wide">
          Upcoming Deadlines
        </h3>
      </div>

      <div className="relative border-l border-slate-800 pl-4 space-y-5 ml-2">
        {displayDeadlines.map((item, idx) => (
          <div key={idx} className="relative group">
            <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-slate-800 border-2 border-[#0d1117] group-hover:bg-[#646cff] group-hover:scale-125 duration-300" />
            <div>
              <h4 className="text-xs font-bold text-slate-200 group-hover:text-[#646cff] duration-300 truncate">
                {item.title}
              </h4>
              <span className="text-[10px] font-bold text-rose-400/80 uppercase tracking-wide inline-block mt-0.5">
                ⏰ {item.due || item.dueDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;
