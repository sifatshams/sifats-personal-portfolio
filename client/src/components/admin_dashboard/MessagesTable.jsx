import { FaEnvelope, FaEye, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  useDeleteMessageMutation,
  useMarkMessageAsReadMutation,
} from '../../hooks/admin/useMessageQuery';

const getStatusStyle = (status) => {
  switch (status) {
    case 'unread':
      return 'bg-red-500/10 text-red-400';

    case 'read':
      return 'bg-emerald-500/10 text-emerald-400';

    default:
      return 'bg-slate-500/10 text-slate-400';
  }
};

const MessagesTable = ({ messages = [], hideViewAll = false }) => {
  const { mutate: markAsRead } = useMarkMessageAsReadMutation();
  const { mutate: deleteMessage } = useDeleteMessageMutation();

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
      {/* header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <FaEnvelope className="text-indigo-400" />
            Recent Messages
          </h2>

          <p className="text-sm text-slate-500">Latest contact messages</p>
        </div>

        {!hideViewAll && (
          <Link
            to="/admin-dashboard/messages"
            className="text-sm text-indigo-400 hover:text-indigo-300"
          >
            View All
          </Link>
        )}
      </div>

      {/* empty */}

      {!messages.length && (
        <div className="py-14 text-center text-slate-500">
          No messages found.
        </div>
      )}

      {/* table */}

      {messages.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-800 text-left text-sm text-slate-400">
                <th className="py-3">Name</th>

                <th>Email</th>

                <th>Subject</th>

                <th>Status</th>

                <th>Date</th>

                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {messages.map((message) => (
                <tr
                  key={message._id}
                  className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                >
                  <td className="py-4 font-medium">{message.userName}</td>

                  <td className="text-sm text-slate-400">{message.email}</td>

                  <td className="max-w-[220px] truncate text-slate-300">
                    {message.subject}
                  </td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-xs capitalize ${getStatusStyle(
                        message.status,
                      )}`}
                    >
                      {message.status}
                    </span>
                  </td>

                  <td className="text-sm text-slate-500">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/admin-dashboard/messages/${message._id}`}
                        onClick={() => {
                          if (message.status === 'unread') {
                            markAsRead(message._id);
                          }
                        }}
                        className="text-slate-400 transition hover:text-indigo-400 p-2 hover:bg-slate-800 rounded-xl"
                      >
                        <FaEye />
                      </Link>

                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              'Are you sure you want to delete this message?',
                            )
                          ) {
                            deleteMessage(message._id);
                          }
                        }}
                        className="text-slate-400 transition hover:text-red-400 p-2 hover:bg-slate-800 rounded-xl"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MessagesTable;
