import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import useStore from '../../store/useStore';
import WebsiteCard from './WebsiteCard';
import WebsiteForm from './WebsiteForm';
import ConfirmDialog from '../Common/ConfirmDialog';
import Button from '../Common/Button';

const WebsiteList = () => {
  const websites = useStore((state) => state.websites);
  const addWebsite = useStore((state) => state.addWebsite);
  const updateWebsite = useStore((state) => state.updateWebsite);
  const deleteWebsite = useStore((state) => state.deleteWebsite);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState(null);
  const [deletingWebsite, setDeletingWebsite] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWebsites = websites.filter((website) =>
    website.websiteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    website.websiteUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (formData) => {
    if (editingWebsite) {
      updateWebsite(editingWebsite.id, formData);
    } else {
      addWebsite(formData);
    }
    setEditingWebsite(null);
  };

  const handleEdit = (website) => {
    setEditingWebsite(website);
    setIsFormOpen(true);
  };

  const handleDelete = () => {
    if (deletingWebsite) {
      deleteWebsite(deletingWebsite.id);
      setDeletingWebsite(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Websites</h1>
          <p className="text-gray-600 mt-1">
            Manage your websites and their affiliate applications
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Website
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search websites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
        </div>
      </div>

      {filteredWebsites.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <div className="text-gray-400 mb-2">
            {searchTerm ? 'No websites found matching your search' : 'No websites added yet'}
          </div>
          {!searchTerm && (
            <Button variant="outline" onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Website
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredWebsites.map((website) => (
            <WebsiteCard
              key={website.id}
              website={website}
              onEdit={handleEdit}
              onDelete={setDeletingWebsite}
            />
          ))}
        </div>
      )}

      <WebsiteForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingWebsite(null);
        }}
        onSubmit={handleSubmit}
        website={editingWebsite}
      />

      <ConfirmDialog
        isOpen={!!deletingWebsite}
        onClose={() => setDeletingWebsite(null)}
        onConfirm={handleDelete}
        title="Delete Website"
        message={`Are you sure you want to delete "${deletingWebsite?.websiteName}"? This will also delete all associated applications. This action cannot be undone.`}
        confirmText="Delete"
      />
    </div>
  );
};

export default WebsiteList;
