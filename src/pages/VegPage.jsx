// VegPage.jsx

import { Link } from 'react-router-dom';
import AssignTTVP from '../components/forms/veg/assignTTVP';
import ReplaceVPT from '../components/forms/veg/replaceVPT';
import ChangeVPS from '../components/forms/veg/changeVPS';
import ChangeVPL from '../components/forms/veg/changeVPL';
import ChangeVPGP from '../components/forms/veg/changeVPGP';
import VegPCBL from '../components/forms/veg/VegPCBL';
import DestroyVP from '../components/forms/veg/destroyVP';
import RecordVPW from '../components/forms/veg/recordVPW';
import CreatePFVP from '../components/forms/veg/createPFVP';
import CreateVPP from '../components/forms/veg/createVPP';
import ManicureVP from '../components/forms/veg/manicureVP';

function VegPage() {
  return (
    <div>
      <nav>
        {/* Navbar for navigation */}
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
      <AssignTTVP />
      <ReplaceVPT />
      <ChangeVPS />
      <ChangeVPL />
      <ChangeVPGP />
      <VegPCBL />
      <DestroyVP />
      <RecordVPW />
      <CreatePFVP />
      <CreateVPP />
      <ManicureVP />
      {/* forms */}
    </div>
  );
}

export default VegPage;
