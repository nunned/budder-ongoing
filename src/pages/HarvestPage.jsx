// HarvestPage.jsx

import { Link } from 'react-router-dom';
import RenameH from "../components/forms/harvested/renameH"
import ChangeHL from '../components/forms/harvested/changeHL';
import ReportHW from '../components/forms/harvested/reportHW';
import CreateP from '../components/forms/harvested/createP';

function HarvestPage() {
  return (
    <div>
      <nav>
        {/* Navbar for navigation */}
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
      <RenameH />
      <ChangeHL />
      <ReportHW />
      <CreateP />
    </div>
  );
}

export default HarvestPage;
