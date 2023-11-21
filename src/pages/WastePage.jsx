// WastePage.jsx

import { Link } from 'react-router-dom';
import RecordLPW from '../components/forms/waste/recordLPW';
import PackagePW from '../components/forms/waste/packagePW';

function WastePage() {
  return (
    <div>
      <nav>
        {/* Navbar for navigation */}
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
      <RecordLPW />
      <PackagePW />
    </div>
  );
}

export default WastePage;
