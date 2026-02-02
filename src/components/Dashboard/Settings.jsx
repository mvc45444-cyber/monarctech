import { useState } from 'react';
import { Download, Upload, Trash2, AlertTriangle } from 'lucide-react';
import useStore from '../../store/useStore';
import Button from '../Common/Button';
import ConfirmDialog from '../Common/ConfirmDialog';

const Settings = () => {
  const exportData = useStore((state) => state.exportData);
  const importData = useStore((state) => state.importData);
  const websites = useStore((state) => state.websites);

  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [importStatus, setImportStatus] = useState(null);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `affiliate-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        const success = importData(content);
        setImportStatus(success ? 'success' : 'error');
        setTimeout(() => setImportStatus(null), 3000);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleClearData = () => {
    localStorage.removeItem('affiliate-tracker-storage');
    window.location.reload();
  };

  const totalApplications = websites.reduce(
    (sum, website) => sum + (website.applications?.length || 0),
    0
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your data and application settings
        </p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Data Overview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">{websites.length}</div>
              <div className="text-sm text-gray-500">Websites</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">{totalApplications}</div>
              <div className="text-sm text-gray-500">Applications</div>
            </div>
          </div>
        </div>

        {/* Export Data */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Export Data</h2>
          <p className="text-sm text-gray-500 mb-4">
            Download all your data as a JSON file for backup or transfer.
          </p>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Import Data */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Import Data</h2>
          <p className="text-sm text-gray-500 mb-4">
            Import data from a previously exported JSON file. This will replace all existing data.
          </p>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                <Upload className="h-4 w-4 mr-2" />
                Import Data
              </span>
            </label>
            {importStatus === 'success' && (
              <span className="text-sm text-green-600">Data imported successfully!</span>
            )}
            {importStatus === 'error' && (
              <span className="text-sm text-red-600">Failed to import data. Invalid file format.</span>
            )}
          </div>
        </div>

        {/* Clear Data */}
        <div className="bg-white rounded-lg border border-red-200 p-6">
          <h2 className="text-lg font-semibold text-red-600 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Clear all data from the application. This action cannot be undone.
          </p>
          <Button variant="danger" onClick={() => setShowClearConfirm(true)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All Data
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={handleClearData}
        title="Clear All Data"
        message="Are you sure you want to delete all your data? This includes all websites and applications. This action cannot be undone."
        confirmText="Clear All Data"
      />
    </div>
  );
};

export default Settings;
