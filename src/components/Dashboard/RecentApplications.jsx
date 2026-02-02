import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { formatRelativeDate } from '../../utils/dateUtils';
import StatusBadge from '../Applications/StatusBadge';

const RecentApplications = ({ applications }) => {
  const recentApps = [...applications]
    .sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
        <Link
          to="/websites"
          className="text-sm text-indigo-800 hover:text-indigo-900 flex items-center gap-1"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {recentApps.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No applications yet
        </div>
      ) : (
        <div className="space-y-3">
          {recentApps.map((app) => (
            <Link
              key={app.id}
              to={`/websites/${app.websiteId}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div>
                <div className="font-medium text-gray-900">{app.platformName}</div>
                <div className="text-sm text-gray-500">{app.websiteName}</div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={app.status} />
                <span className="text-xs text-gray-400">
                  {formatRelativeDate(app.dateApplied)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentApplications;
