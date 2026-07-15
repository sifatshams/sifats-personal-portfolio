import VisitorChart from '../../components/admin_dashboard/VisitorChart';
import VisitorStats from '../../components/admin_dashboard/VisitorStats';

const VisitorsPage = () => {
  return (
    <div className="space-y-8">
      <VisitorStats />

      <VisitorChart />
    </div>
  );
};

export default VisitorsPage;
