// FormPage.jsx

import { Link } from 'react-router-dom';

function FormPage() {
  return (
    <div>
      <h1>Welcome</h1>
      <nav>
        <ul>
          <li><Link to="/immature">Immature Forms</Link></li>
          <li><Link to="/veg">Vegetative Forms</Link></li>
          <li><Link to="/flower">Flowering Forms</Link></li>
          <li><Link to="/waste">Waste Forms</Link></li>
          <li><Link to="/harvest">Harvest Forms</Link></li>
          <li><Link to="/admin">Admin Forms</Link></li>
          <li><Link to="/packages">Packages Forms</Link></li>
          {/* Add other category links here */}
        </ul>
      </nav>
    </div>
  );
}

export default FormPage;