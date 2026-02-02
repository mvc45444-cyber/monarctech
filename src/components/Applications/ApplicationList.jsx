import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Search, ArrowLeft, Filter } from 'lucide-react';
import useStore from '../../store/useStore';
import ApplicationCard from './ApplicationCard';
import ApplicationForm from './ApplicationForm';
import ApplicationDetails from './ApplicationDetails';
import ConfirmDialog from '../Common/ConfirmDialog';
import Button from '../Common/Button';
import Select from '../Common/Select';

const statusFilterOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

const ApplicationList = () => {
  const { websiteId } = useParams();
  const website = useStore((state) => state.getWebsiteById(websiteId));
  const addApplication = useStore((state) => state.addApplication);
  const updateApplication = useStore((state) => state.updateApplication);
  const deleteApplication = useStore((state) => state.deleteApplication);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [viewingApplication, setViewingApplication] = useState(null);
  const [deletingApplication, setDeletingApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  if (!website) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Website not found</p>
        <Link to="/websites">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Websites
          </Button>
        </Link>
      </div>
    );
  }

  const applications = website.applications || [];

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = app.platformName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (formData) => {
    if (editingApplication) {
      updateApplication(websiteId, editingApplication.id, formData);
    } else {
      addApplication(websiteId, formData);
    }
    setEditingApplication(null);
  };

  const handleEdit = (application) => {
    setEditingApplication(application);
    setViewingApplication(null);
    setIsFormOpen(true);
  };

  const handleDelete = () => {
    if (deletingApplication) {
      deleteApplication(websiteId, deletingApplication.id);
      setDeletingApplication(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/websites"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Websites
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{website.websiteName}</h1>
            <a
              href={website.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-800 hover:underline"
            >
              {website.websiteUrl}
            </a>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Application
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <Select
            options={statusFilterOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-40"
          />
        </div>
      </div>

      {/* Applications Grid */}
      {filteredApplications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <div className="text-gray-400 mb-2">
            {searchTerm || statusFilter !== 'all'
              ? 'No applications found matching your filters'
              : 'No applications added yet'}
          </div>
          {!searchTerm && statusFilter === 'all' && (
            <Button variant="outline" onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Application
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onView={setViewingApplication}
              onEdit={handleEdit}
              onDelete={setDeletingApplication}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <ApplicationForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingApplication(null);
        }}
        onSubmit={handleSubmit}
        application={editingApplication}
      />

      <ApplicationDetails
        isOpen={!!viewingApplication}
        onClose={() => setViewingApplication(null)}
        application={viewingApplication}
        websiteName={website.websiteName}
        onEdit={handleEdit}
      />

      <ConfirmDialog
        isOpen={!!deletingApplication}
        onClose={() => setDeletingApplication(null)}
        onConfirm={handleDelete}
        title="Delete Application"
        message={`Are you sure you want to delete the application for "${deletingApplication?.platformName}"? This action cannot be undone.`}
        confirmText="Delete"
      />
    </div>
  );
};

export default ApplicationList;
