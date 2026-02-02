import { Link } from 'react-router-dom';
import { Globe, ExternalLink, MoreVertical, Pencil, Trash2, FileText } from 'lucide-react';
import { useState } from 'react';
import { formatDate } from '../../utils/dateUtils';

const WebsiteCard = ({ website, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const applicationCount = website.applications?.length || 0;
  const approvedCount = website.applications?.filter(
    (app) => app.status === 'approved'
  ).length || 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
            <Globe className="h-5 w-5 text-indigo-800" />
          </div>
          <div>
            <Link
              to={`/websites/${website.id}`}
              className="font-semibold text-gray-900 hover:text-indigo-800"
            >
              {website.websiteName}
            </Link>
            <a
              href={website.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-800"
            >
              {website.websiteUrl}
              <ExternalLink className="h-3 w-3" />
            </a>
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
                      onEdit(website);
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onDelete(website);
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

      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5 text-gray-600">
          <FileText className="h-4 w-4" />
          <span>{applicationCount} Applications</span>
        </div>
        {applicationCount > 0 && (
          <div className="text-green-600">
            {approvedCount} Approved
          </div>
        )}
      </div>

      <div className="mt-3 text-xs text-gray-400">
        Added {formatDate(website.createdAt)}
      </div>
    </div>
  );
};

export default WebsiteCard;
