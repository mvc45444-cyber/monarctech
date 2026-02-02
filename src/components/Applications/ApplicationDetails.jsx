import { X, ExternalLink, Mail, User, Calendar, Bell, DollarSign } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import StatusBadge from './StatusBadge';
import Button from '../Common/Button';

const ApplicationDetails = ({ application, websiteName, isOpen, onClose, onEdit }) => {
  if (!isOpen || !application) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        />
        <div className="relative w-full max-w-2xl transform rounded-lg bg-white shadow-xl transition-all">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {application.platformName}
                </h3>
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
              <p className="text-sm text-gray-500">Website: {websiteName}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4 space-y-6">
            {/* Status */}
            <div className="flex items-center gap-4">
              <StatusBadge status={application.status} />
              {application.responseDate && (
                <span className="text-sm text-gray-500">
                  Response received: {formatDate(application.responseDate)}
                </span>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Applied:</span>
                <span className="font-medium">{formatDate(application.dateApplied)}</span>
              </div>
              {application.followUpDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Bell className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Follow-up:</span>
                  <span className="font-medium">{formatDate(application.followUpDate)}</span>
                </div>
              )}
            </div>

            {/* Contact Info */}
            {(application.contactPerson || application.contactEmail) && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  {application.contactPerson && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{application.contactPerson}</span>
                    </div>
                  )}
                  {application.contactEmail && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <a
                        href={`mailto:${application.contactEmail}`}
                        className="text-indigo-800 hover:underline"
                      >
                        {application.contactEmail}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Commission Details */}
            {(application.commissionRate || application.paymentTerms || application.cookieDuration) && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Commission Details</h4>
                <div className="grid grid-cols-3 gap-4">
                  {application.commissionRate && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Commission Rate</div>
                      <div className="font-semibold text-gray-900">{application.commissionRate}</div>
                    </div>
                  )}
                  {application.paymentTerms && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Payment Terms</div>
                      <div className="font-semibold text-gray-900">{application.paymentTerms}</div>
                    </div>
                  )}
                  {application.cookieDuration && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Cookie Duration</div>
                      <div className="font-semibold text-gray-900">{application.cookieDuration}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Revenue Tracking */}
            {application.monthlyRevenue && application.monthlyRevenue.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Revenue Tracking</h4>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span>Revenue data available</span>
                </div>
              </div>
            )}

            {/* Notes */}
            {application.notes && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Notes</h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{application.notes}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => onEdit(application)}>
              Edit Application
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
