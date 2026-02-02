import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import WebsiteList from './components/Websites/WebsiteList';
import ApplicationList from './components/Applications/ApplicationList';
import FollowUps from './components/Dashboard/FollowUps';
import Settings from './components/Dashboard/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="websites" element={<WebsiteList />} />
        <Route path="websites/:websiteId" element={<ApplicationList />} />
        <Route path="follow-ups" element={<FollowUps />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
