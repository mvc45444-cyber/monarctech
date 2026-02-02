import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const useStore = create(
  persist(
    (set, get) => ({
      websites: [],

      // Website CRUD operations
      addWebsite: (websiteData) => {
        const newWebsite = {
          id: uuidv4(),
          websiteName: websiteData.websiteName,
          websiteUrl: websiteData.websiteUrl,
          createdAt: new Date().toISOString(),
          applications: [],
        };
        set((state) => ({
          websites: [...state.websites, newWebsite],
        }));
        return newWebsite;
      },

      updateWebsite: (websiteId, websiteData) => {
        set((state) => ({
          websites: state.websites.map((website) =>
            website.id === websiteId
              ? { ...website, ...websiteData }
              : website
          ),
        }));
      },

      deleteWebsite: (websiteId) => {
        set((state) => ({
          websites: state.websites.filter((website) => website.id !== websiteId),
        }));
      },

      getWebsiteById: (websiteId) => {
        return get().websites.find((website) => website.id === websiteId);
      },

      // Application CRUD operations
      addApplication: (websiteId, applicationData) => {
        const newApplication = {
          id: uuidv4(),
          platformName: applicationData.platformName || '',
          platformUrl: applicationData.platformUrl || '',
          status: applicationData.status || 'pending',
          dateApplied: applicationData.dateApplied || new Date().toISOString().split('T')[0],
          responseDate: applicationData.responseDate || null,
          contactEmail: applicationData.contactEmail || '',
          contactPerson: applicationData.contactPerson || '',
          commissionRate: applicationData.commissionRate || '',
          paymentTerms: applicationData.paymentTerms || '',
          cookieDuration: applicationData.cookieDuration || '',
          notes: applicationData.notes || '',
          followUpDate: applicationData.followUpDate || null,
          followUpReminder: applicationData.followUpReminder || false,
          documents: applicationData.documents || [],
          monthlyRevenue: applicationData.monthlyRevenue || [],
        };

        set((state) => ({
          websites: state.websites.map((website) =>
            website.id === websiteId
              ? { ...website, applications: [...website.applications, newApplication] }
              : website
          ),
        }));
        return newApplication;
      },

      updateApplication: (websiteId, applicationId, applicationData) => {
        set((state) => ({
          websites: state.websites.map((website) =>
            website.id === websiteId
              ? {
                  ...website,
                  applications: website.applications.map((app) =>
                    app.id === applicationId ? { ...app, ...applicationData } : app
                  ),
                }
              : website
          ),
        }));
      },

      deleteApplication: (websiteId, applicationId) => {
        set((state) => ({
          websites: state.websites.map((website) =>
            website.id === websiteId
              ? {
                  ...website,
                  applications: website.applications.filter((app) => app.id !== applicationId),
                }
              : website
          ),
        }));
      },

      getApplicationById: (websiteId, applicationId) => {
        const website = get().websites.find((w) => w.id === websiteId);
        return website?.applications.find((app) => app.id === applicationId);
      },

      // Get all applications across all websites
      getAllApplications: () => {
        return get().websites.flatMap((website) =>
          website.applications.map((app) => ({
            ...app,
            websiteId: website.id,
            websiteName: website.websiteName,
          }))
        );
      },

      // Statistics helpers
      getStats: () => {
        const allApps = get().getAllApplications();
        const total = allApps.length;
        const approved = allApps.filter((app) => app.status === 'approved').length;
        const pending = allApps.filter((app) => app.status === 'pending').length;
        const rejected = allApps.filter((app) => app.status === 'rejected').length;
        const underReview = allApps.filter((app) => app.status === 'under_review').length;

        return {
          total,
          approved,
          pending,
          rejected,
          underReview,
          approvalRate: total > 0 ? ((approved / total) * 100).toFixed(1) : 0,
        };
      },

      // Get applications with upcoming follow-ups
      getUpcomingFollowUps: () => {
        const today = new Date().toISOString().split('T')[0];
        return get()
          .getAllApplications()
          .filter((app) => app.followUpDate && app.followUpDate >= today && app.followUpReminder)
          .sort((a, b) => new Date(a.followUpDate) - new Date(b.followUpDate));
      },

      // Export data
      exportData: () => {
        return JSON.stringify(get().websites, null, 2);
      },

      // Import data
      importData: (jsonData) => {
        try {
          const data = JSON.parse(jsonData);
          if (Array.isArray(data)) {
            set({ websites: data });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },
    }),
    {
      name: 'affiliate-tracker-storage',
    }
  )
);

export default useStore;
