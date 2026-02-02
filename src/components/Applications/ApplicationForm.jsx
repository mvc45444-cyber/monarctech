import { useState, useEffect } from 'react';
import Modal from '../Common/Modal';
import Input from '../Common/Input';
import Select from '../Common/Select';
import Button from '../Common/Button';
import { getTodayString } from '../../utils/dateUtils';

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

const ApplicationForm = ({ isOpen, onClose, onSubmit, application = null }) => {
  const [formData, setFormData] = useState({
    platformName: '',
    platformUrl: '',
    status: 'pending',
    dateApplied: getTodayString(),
    responseDate: '',
    contactEmail: '',
    contactPerson: '',
    commissionRate: '',
    paymentTerms: '',
    cookieDuration: '',
    notes: '',
    followUpDate: '',
    followUpReminder: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (application) {
      setFormData({
        platformName: application.platformName || '',
        platformUrl: application.platformUrl || '',
        status: application.status || 'pending',
        dateApplied: application.dateApplied || getTodayString(),
        responseDate: application.responseDate || '',
        contactEmail: application.contactEmail || '',
        contactPerson: application.contactPerson || '',
        commissionRate: application.commissionRate || '',
        paymentTerms: application.paymentTerms || '',
        cookieDuration: application.cookieDuration || '',
        notes: application.notes || '',
        followUpDate: application.followUpDate || '',
        followUpReminder: application.followUpReminder || false,
      });
    } else {
      setFormData({
        platformName: '',
        platformUrl: '',
        status: 'pending',
        dateApplied: getTodayString(),
        responseDate: '',
        contactEmail: '',
        contactPerson: '',
        commissionRate: '',
        paymentTerms: '',
        cookieDuration: '',
        notes: '',
        followUpDate: '',
        followUpReminder: false,
      });
    }
    setErrors({});
  }, [application, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.platformName.trim()) {
      newErrors.platformName = 'Platform name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={application ? 'Edit Application' : 'Add New Application'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Platform Details */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Platform Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Platform Name *"
              placeholder="Amazon Associates"
              value={formData.platformName}
              onChange={(e) => handleChange('platformName', e.target.value)}
              error={errors.platformName}
            />
            <Input
              label="Platform URL"
              placeholder="https://affiliate-program.amazon.com"
              value={formData.platformUrl}
              onChange={(e) => handleChange('platformUrl', e.target.value)}
            />
          </div>
        </div>

        {/* Status & Dates */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Status & Dates</h4>
          <div className="grid grid-cols-3 gap-4">
            <Select
              label="Status"
              options={statusOptions}
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
            />
            <Input
              label="Date Applied"
              type="date"
              value={formData.dateApplied}
              onChange={(e) => handleChange('dateApplied', e.target.value)}
            />
            <Input
              label="Response Date"
              type="date"
              value={formData.responseDate}
              onChange={(e) => handleChange('responseDate', e.target.value)}
            />
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Contact Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Contact Person"
              placeholder="John Doe"
              value={formData.contactPerson}
              onChange={(e) => handleChange('contactPerson', e.target.value)}
            />
            <Input
              label="Contact Email"
              type="email"
              placeholder="john@example.com"
              value={formData.contactEmail}
              onChange={(e) => handleChange('contactEmail', e.target.value)}
            />
          </div>
        </div>

        {/* Commission Details */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Commission Details</h4>
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Commission Rate"
              placeholder="5% - 10%"
              value={formData.commissionRate}
              onChange={(e) => handleChange('commissionRate', e.target.value)}
            />
            <Input
              label="Payment Terms"
              placeholder="Net 30"
              value={formData.paymentTerms}
              onChange={(e) => handleChange('paymentTerms', e.target.value)}
            />
            <Input
              label="Cookie Duration"
              placeholder="30 days"
              value={formData.cookieDuration}
              onChange={(e) => handleChange('cookieDuration', e.target.value)}
            />
          </div>
        </div>

        {/* Follow-up */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Follow-up</h4>
          <div className="grid grid-cols-2 gap-4 items-end">
            <Input
              label="Follow-up Date"
              type="date"
              value={formData.followUpDate}
              onChange={(e) => handleChange('followUpDate', e.target.value)}
            />
            <div className="flex items-center gap-2 pb-2">
              <input
                type="checkbox"
                id="followUpReminder"
                checked={formData.followUpReminder}
                onChange={(e) => handleChange('followUpReminder', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-800 focus:ring-indigo-600"
              />
              <label htmlFor="followUpReminder" className="text-sm text-gray-700">
                Enable reminder
              </label>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Notes</h4>
          <textarea
            placeholder="Add any notes about this application..."
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {application ? 'Update' : 'Add Application'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ApplicationForm;
