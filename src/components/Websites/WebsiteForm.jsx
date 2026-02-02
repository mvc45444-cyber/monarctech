import { useState, useEffect } from 'react';
import Modal from '../Common/Modal';
import Input from '../Common/Input';
import Button from '../Common/Button';

const WebsiteForm = ({ isOpen, onClose, onSubmit, website = null }) => {
  const [formData, setFormData] = useState({
    websiteName: '',
    websiteUrl: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (website) {
      setFormData({
        websiteName: website.websiteName || '',
        websiteUrl: website.websiteUrl || '',
      });
    } else {
      setFormData({ websiteName: '', websiteUrl: '' });
    }
    setErrors({});
  }, [website, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.websiteName.trim()) {
      newErrors.websiteName = 'Website name is required';
    }
    if (!formData.websiteUrl.trim()) {
      newErrors.websiteUrl = 'Website URL is required';
    } else if (!/^https?:\/\/.+/.test(formData.websiteUrl)) {
      newErrors.websiteUrl = 'Please enter a valid URL (starting with http:// or https://)';
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={website ? 'Edit Website' : 'Add New Website'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Website Name"
          placeholder="My Awesome Website"
          value={formData.websiteName}
          onChange={(e) =>
            setFormData({ ...formData, websiteName: e.target.value })
          }
          error={errors.websiteName}
        />
        <Input
          label="Website URL"
          placeholder="https://example.com"
          value={formData.websiteUrl}
          onChange={(e) =>
            setFormData({ ...formData, websiteUrl: e.target.value })
          }
          error={errors.websiteUrl}
        />
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {website ? 'Update' : 'Add Website'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default WebsiteForm;
