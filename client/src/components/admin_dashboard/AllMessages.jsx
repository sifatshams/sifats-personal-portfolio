import MessagesTable from '../../components/admin_dashboard/MessagesTable';
import { useAllMessagesQuery } from '../../hooks/admin/useMessageQuery';

const AllMessagesPage = () => {
  const { data: messages, isLoading, isError } = useAllMessagesQuery();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-slate-400 text-lg animate-pulse">
          Loading all messages...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-red-500 font-medium">
          Failed to load messages from server.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-100 tracking-wide">
        All Contact Messages
      </h1>
      <MessagesTable messages={messages} hideViewAll={true} />
    </div>
  );
};

export default AllMessagesPage;
