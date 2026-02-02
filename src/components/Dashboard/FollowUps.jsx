import { Link } from 'react-router-dom';
import { Bell, Calendar, ExternalLink } from 'lucide-react';
import useStore from '../../store/useStore';
import { formatDate, isOverdue } from '../../utils/dateUtils';
import StatusBadge from '../Applications/StatusBadge';

const FollowUps = () => {
  const getUpcomingFollowUps = useStore((state) => state.getUpcomingFollowUps);
  const getAllApplications = useStore((state) => state.getAllApplications);

  const upcomingFollowUps = getUpcomingFollowUps();
  const allApps = getAllApplications();

  // Get overdue follow-ups
  const overdueFollowUps = allApps.filter(
    (app) => app.followUpDate && app.followUpReminder && isOverdue(app.followUpDate)
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Follow-ups</h1>
        <p className="text-gray-600 mt-1">
          Track and manage your application follow-ups
        </p>
      </div>

      {/* Overdue Section */}
      {overdueFollowUps.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-red-600 mb-3 flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Overdue ({overdueFollowUps.length})
          </h2>
          <div className="space-y-3">
            {overdueFollowUps.map((app) => (
              <Link
                key={app.id}
                to={`/websites/${app.websiteId}`}
                className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <Bell className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{app.platformName}</div>
                    <div className="text-sm text-gray-500">{app.websiteName}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge status={app.status} />
                  <div className="text-sm text-red-600 font-medium">
                    {formatDate(app.followUpDate)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-800" />
          Upcoming ({upcomingFollowUps.length})
        </h2>

        {upcomingFollowUps.length === 0 && overdueFollowUps.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <div className="text-gray-400 mb-2">No follow-ups scheduled</div>
            <p className="text-sm text-gray-400">
              Add follow-up dates to your applications to track them here
            </p>
          </div>
        ) : upcomingFollowUps.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg border border-gray-200 text-gray-400">
            No upcoming follow-ups
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingFollowUps.map((app) => (
              <Link
                key={app.id}
                to={`/websites/${app.websiteId}`}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
                    <Calendar className="h-5 w-5 text-indigo-800" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{app.platformName}</div>
                    <div className="text-sm text-gray-500">{app.websiteName}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge status={app.status} />
                  <div className="text-sm text-gray-600">
                    {formatDate(app.followUpDate)}
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowUps;
