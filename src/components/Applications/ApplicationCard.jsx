import { ExternalLink, MoreVertical, Pencil, Trash2, Eye, Bell } from 'lucide-react';
import { useState } from 'react';
import { formatDate, isOverdue } from '../../utils/dateUtils';
import StatusBadge from './StatusBadge';

const ApplicationCard = ({ application, onView, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const hasFollowUp = application.followUpDate && application.followUpReminder;
  const isFollowUpOverdue = hasFollowUp && isOverdue(application.followUpDate);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{application.platformName}</h3>
            {application.platformUrl && (
              <a
                href={application.platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-800"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <StatusBadge status={application.status} />
            <span className="text-sm text-gray-500">
              Applied {formatDate(application.dateApplied)}
            </span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <MoreVertical className="h-5 w-5 text-gray-400" />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 z-20 mt-1 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onView(application);
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      onEdit(application);
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onDelete(application);
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quick Info */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        {application.commissionRate && (
          <div className="text-gray-600">
            <span className="text-gray-400">Commission:</span> {application.commissionRate}
          </div>
        )}
        {application.cookieDuration && (
          <div className="text-gray-600">
            <span className="text-gray-400">Cookie:</span> {application.cookieDuration}
          </div>
        )}
      </div>

      {/* Follow-up indicator */}
      {hasFollowUp && (
        <div
          className={`mt-3 flex items-center gap-2 text-sm ${
            isFollowUpOverdue ? 'text-red-600' : 'text-indigo-800'
          }`}
        >
          <Bell className="h-4 w-4" />
          <span>
            Follow-up: {formatDate(application.followUpDate)}
            {isFollowUpOverdue && ' (Overdue)'}
          </span>
        </div>
      )}

      {/* Notes preview */}
      {application.notes && (
        <div className="mt-3 text-sm text-gray-500 truncate">
          {application.notes}
        </div>
      )}
    </div>
  );
};

export default ApplicationCard;
