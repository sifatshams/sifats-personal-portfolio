import {
  FaCircle,
  FaEnvelope,
  FaFolderOpen,
  FaSignInAlt,
  FaUser,
} from 'react-icons/fa';

const getIcon = (type) => {
  switch (type) {
    case 'project':
      return <FaFolderOpen />;

    case 'message':
      return <FaEnvelope />;

    case 'login':
      return <FaSignInAlt />;

    case 'user':
      return <FaUser />;

    default:
      return <FaCircle />;
  }
};

const getColor = (type) => {
  switch (type) {
    case 'project':
      return 'bg-indigo-500/10 text-indigo-400';

    case 'message':
      return 'bg-emerald-500/10 text-emerald-400';

    case 'login':
      return 'bg-orange-500/10 text-orange-400';

    case 'user':
      return 'bg-cyan-500/10 text-cyan-400';

    default:
      return 'bg-slate-700 text-slate-300';
  }
};

const formatTime = (date) => {
  return new Date(date).toLocaleString();
};

const ActivityTimeline = ({ activities = [] }) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
      {/* header */}
      <div className="mb-7">
        <h2 className="text-lg font-semibold">Recent Activities</h2>

        <p className="text-sm text-slate-500">
          Latest actions inside the admin dashboard
        </p>
      </div>

      {/* timeline */}

      <div className="relative border-l border-slate-800 pl-6">
        {activities.length === 0 ? (
          <div className="py-8 text-center text-slate-500">
            No activities found.
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity._id}
              className="relative mb-8 last:mb-0"
            >
              {/* dot */}

              <span
                className={`absolute -left-[34px] flex h-8 w-8 items-center justify-center rounded-full ${getColor(
                  activity.type,
                )}`}
              >
                {getIcon(activity.type)}
              </span>

              {/* content */}

              <div>
                <h3 className="font-semibold text-white">
                  {activity.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  {activity.description}
                </p>

                <span className="mt-2 inline-block text-xs text-slate-500">
                  {formatTime(activity.createdAt)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityTimeline;