import { useEffect } from 'react';
import {
  FaArrowLeft,
  FaClock,
  FaEnvelope,
  FaReply,
  FaUser,
} from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import {
  useGetMessageByIdQuery,
  useMarkMessageAsReadMutation,
} from '../../hooks/admin/useMessageQuery';

const MessageDetailsPage = () => {
  const { id } = useParams();
  const { data: message, isLoading, isError } = useGetMessageByIdQuery(id);
  const { mutate: markAsRead } = useMarkMessageAsReadMutation();

  useEffect(() => {
    if (message && message.status === 'unread') {
      markAsRead(id);
    }
  }, [message, id, markAsRead]);

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-slate-400 text-lg animate-pulse">
          Loading message details...
        </p>
      </div>
    );
  }

  if (isError || !message) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-red-500">
          Failed to load message or message not found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        to="/admin-dashboard"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition"
      >
        <FaArrowLeft /> Back to Dashboard
      </Link>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize mb-3 ${
                message.status === 'unread'
                  ? 'bg-red-500/10 text-red-400'
                  : 'bg-emerald-500/10 text-emerald-400'
              }`}
            >
              {message.status}
            </span>
            <h1 className="text-2xl font-bold text-slate-100">
              {message.subject || 'No Subject'}
            </h1>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FaClock />
            {new Date(message.createdAt).toLocaleString('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <FaUser />
            </div>
            <div>
              <p className="text-xs text-slate-500">Sender Name</p>
              <p className="text-sm font-medium text-slate-200">
                {message.userName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <FaEnvelope />
            </div>
            <div>
              <p className="text-xs text-slate-500">Email Address</p>
              <a
                href={`mailto:${message.email}`}
                className="text-sm font-medium text-indigo-400 hover:underline"
              >
                {message.email}
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Message Content
          </p>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/20 p-6 text-slate-300 leading-relaxed whitespace-pre-wrap">
            {message.message || 'No message content provided.'}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <a
            href={`mailto:${message.email}?subject=Re: ${message.subject || ''}`}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 shadow-lg shadow-indigo-600/20"
          >
            <FaReply /> Reply via Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default MessageDetailsPage;
