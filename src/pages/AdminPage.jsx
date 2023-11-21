// AdminPage.jsx
import "../App.css";
import { Link } from 'react-router-dom';
import AddStrains from '../components/forms/admin/addStrain';
import EditStrains from '../components/forms/admin/editStrain';
import AddLocation from '../components/forms/admin/addLocation';
import EditLocation from '../components/forms/admin/editLocation';
import AddItem from '../components/forms/admin/addItem';
import EditItem from '../components/forms/admin/editItem';

function AdminPage() {
  return (
    <div className='test-wrap'>
      <nav>
        {/* Navbar for navigation */}
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
      <AddStrains />
      <EditStrains />
      <AddLocation />
      <EditLocation />
      <AddItem />
      <EditItem />
    </div>
  );
}

export default AdminPage;
