import useStore from '../../store/useStore';
import StatsCards from './StatsCards';
import StatusChart from './StatusChart';
import RecentApplications from './RecentApplications';

const Dashboard = () => {
  const getStats = useStore((state) => state.getStats);
  const getAllApplications = useStore((state) => state.getAllApplications);
  const websites = useStore((state) => state.websites);

  const stats = getStats();
  const allApplications = getAllApplications();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Overview of your affiliate applications across {websites.length} website
          {websites.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-6">
        <StatsCards stats={stats} />

        <div className="grid gap-6 lg:grid-cols-2">
          <StatusChart stats={stats} />
          <RecentApplications applications={allApplications} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
