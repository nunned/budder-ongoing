// PackagesPage.jsx

import { Link } from 'react-router-dom';
import NewPackage from '../components/forms/packages/newPackage';
import RemediateP from '../components/forms/packages/remediateP';

function PackagesPage() {
  return (
    <div>
      <nav>
        {/* Navbar for navigation */}
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
      <NewPackage />
      <RemediateP />
    </div>
  );
}

export default PackagesPage;
