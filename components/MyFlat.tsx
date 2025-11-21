
import React, { useState, useRef } from 'react';
import { User, Car, FileText, Plus, Phone, Mail, X, Edit2, Camera, Upload } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  relation: string;
  phone: string;
  email: string;
  avatar: string;
}

interface Vehicle {
  id: number;
  type: string;
  model: string;
  plate: string;
  slot: string;
}

const MyFlat: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: 'Alex Morgan', relation: 'Self', phone: '+1 234 567 890', email: 'alex@example.com', avatar: 'https://picsum.photos/id/64/100/100' },
    { id: 2, name: 'Sarah Morgan', relation: 'Spouse', phone: '+1 234 567 891', email: 'sarah@example.com', avatar: 'https://picsum.photos/id/65/100/100' },
    { id: 3, name: 'Leo Morgan', relation: 'Son', phone: '-', email: '-', avatar: 'https://picsum.photos/id/60/100/100' },
  ]);

  const [vehicleList, setVehicleList] = useState<Vehicle[]>([
    { id: 1, type: 'Car', model: 'Tesla Model 3', plate: 'ABC-1234', slot: 'P-101' },
    { id: 2, type: 'Bike', model: 'Honda CBR', plate: 'XYZ-9876', slot: 'P-101' },
  ]);

  // Modal states
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

  // Edit states
  const [editingMemberId, setEditingMemberId] = useState<number | null>(null);
  const [editingVehicleId, setEditingVehicleId] = useState<number | null>(null);

  // Form states
  const [memberForm, setMemberForm] = useState({ name: '', relation: 'Family', phone: '', email: '', avatar: '' });
  const [vehicleForm, setVehicleForm] = useState({ type: 'Car', model: '', plate: '' });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Member Handlers ---

  const openAddMemberModal = () => {
    setEditingMemberId(null);
    setMemberForm({ name: '', relation: 'Family', phone: '', email: '', avatar: '' });
    setIsMemberModalOpen(true);
  };

  const openEditMemberModal = (member: Member) => {
    setEditingMemberId(member.id);
    setMemberForm({
      name: member.name,
      relation: member.relation,
      phone: member.phone,
      email: member.email,
      avatar: member.avatar
    });
    setIsMemberModalOpen(true);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setMemberForm({ ...memberForm, avatar: imageUrl });
    }
  };

  const handleMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name) return;

    if (editingMemberId) {
      // Update existing member
      setMembers(members.map(m => m.id === editingMemberId ? {
        ...m,
        name: memberForm.name,
        relation: memberForm.relation,
        phone: memberForm.phone || '-',
        email: memberForm.email || '-',
        avatar: memberForm.avatar || m.avatar
      } : m));
    } else {
      // Add new member
      const member: Member = {
        id: Date.now(),
        name: memberForm.name,
        relation: memberForm.relation,
        phone: memberForm.phone || '-',
        email: memberForm.email || '-',
        avatar: memberForm.avatar || `https://ui-avatars.com/api/?name=${memberForm.name}&background=random`
      };
      setMembers([...members, member]);
    }
    setIsMemberModalOpen(false);
  };

  // --- Vehicle Handlers ---

  const openAddVehicleModal = () => {
    setEditingVehicleId(null);
    setVehicleForm({ type: 'Car', model: '', plate: '' });
    setIsVehicleModalOpen(true);
  };

  const openEditVehicleModal = (vehicle: Vehicle) => {
    setEditingVehicleId(vehicle.id);
    setVehicleForm({
      type: vehicle.type,
      model: vehicle.model,
      plate: vehicle.plate
    });
    setIsVehicleModalOpen(true);
  };

  const handleVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleForm.model || !vehicleForm.plate) return;

    if (editingVehicleId) {
      // Update existing vehicle
      setVehicleList(vehicleList.map(v => v.id === editingVehicleId ? {
        ...v,
        type: vehicleForm.type,
        model: vehicleForm.model,
        plate: vehicleForm.plate.toUpperCase()
      } : v));
    } else {
      // Add new vehicle
      const vehicle: Vehicle = {
        id: Date.now(),
        type: vehicleForm.type,
        model: vehicleForm.model,
        plate: vehicleForm.plate.toUpperCase(),
        slot: 'P-101' // Assigned slot
      };
      setVehicleList([...vehicleList, vehicle]);
    }
    setIsVehicleModalOpen(false);
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Member Modal (Add/Edit) */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingMemberId ? 'Edit Member Details' : 'Add New Member'}
              </h3>
              <button 
                onClick={() => setIsMemberModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleMemberSubmit} className="p-6 space-y-4">
              {/* Photo Upload */}
              <div className="flex justify-center mb-6">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    {memberForm.avatar ? (
                      <img src={memberForm.avatar} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <User size={32} />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="text-white" size={24} />
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-center mt-2 text-blue-600 dark:text-blue-400 font-medium">
                    {memberForm.avatar ? 'Change Photo' : 'Upload Photo'}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name *</label>
                <input 
                  type="text" 
                  required
                  value={memberForm.name} 
                  onChange={(e) => setMemberForm({...memberForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Relation</label>
                <select 
                  value={memberForm.relation}
                  onChange={(e) => setMemberForm({...memberForm, relation: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                >
                  <option value="Family">Family</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Parent">Parent</option>
                  <option value="Tenant">Tenant</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                <input 
                  type="tel" 
                  value={memberForm.phone} 
                  onChange={(e) => setMemberForm({...memberForm, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input 
                  type="email" 
                  value={memberForm.email} 
                  onChange={(e) => setMemberForm({...memberForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  placeholder="john@example.com"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-colors mt-4"
              >
                {editingMemberId ? 'Save Changes' : 'Add Member'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Vehicle Modal (Add/Edit) */}
      {isVehicleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingVehicleId ? 'Edit Vehicle Details' : 'Register Vehicle'}
              </h3>
              <button 
                onClick={() => setIsVehicleModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleVehicleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle Type</label>
                <select 
                  value={vehicleForm.type}
                  onChange={(e) => setVehicleForm({...vehicleForm, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                >
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="Scooter">Scooter</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle Model *</label>
                <input 
                  type="text" 
                  required
                  value={vehicleForm.model} 
                  onChange={(e) => setVehicleForm({...vehicleForm, model: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  placeholder="e.g. Toyota Camry"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">License Plate *</label>
                <input 
                  type="text" 
                  required
                  value={vehicleForm.plate} 
                  onChange={(e) => setVehicleForm({...vehicleForm, plate: e.target.value.toUpperCase()})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono"
                  placeholder="MH-12-AB-1234"
                />
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-xs text-blue-800 dark:text-blue-300">
                    Parking Slot <strong>P-101</strong> is assigned to your flat.
                  </p>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-colors mt-4"
              >
                {editingVehicleId ? 'Save Changes' : 'Register Vehicle'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Flat Details</h2>
        <p className="text-gray-500 dark:text-gray-400">Manage residents and vehicles associated with Flat A-101.</p>
      </div>

      {/* Residents Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <User size={20} className="text-blue-600" /> Residents
          </h3>
          <button 
            onClick={openAddMemberModal}
            className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1"
          >
            <Plus size={16} /> Add Member
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div key={member.id} className="relative group flex items-start gap-4 p-4 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
               <button 
                onClick={() => openEditMemberModal(member)}
                className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-blue-600 hover:bg-white dark:hover:bg-gray-600 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                title="Edit Member"
              >
                <Edit2 size={14} />
              </button>
              
              <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{member.name}</h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium">{member.relation}</span>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Phone size={12} /> {member.phone}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Mail size={12} /> {member.email}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicles Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Car size={20} className="text-green-600" /> Vehicles
          </h3>
          <button 
            onClick={openAddVehicleModal}
            className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1"
          >
            <Plus size={16} /> Add Vehicle
          </button>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 font-medium">
                <tr>
                  <th className="px-4 py-2 rounded-l-lg">Type</th>
                  <th className="px-4 py-2">Vehicle Model</th>
                  <th className="px-4 py-2">License Plate</th>
                  <th className="px-4 py-2">Parking Slot</th>
                  <th className="px-4 py-2 rounded-r-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {vehicleList.map((v) => (
                  <tr key={v.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{v.type}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{v.model}</td>
                    <td className="px-4 py-3">
                      <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-600 font-mono text-xs text-gray-700 dark:text-gray-300">
                        {v.plate}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{v.slot}</td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        onClick={() => openEditVehicleModal(v)}
                        className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                        title="Edit Vehicle"
                      >
                        <Edit2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Documents */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
         <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <FileText size={20} className="text-orange-600" /> Documents
          </h3>
        </div>
        <div className="p-6 flex flex-wrap gap-4">
          {['Lease Agreement.pdf', 'Parking Allotment.pdf', 'Society Rules.pdf'].map((doc, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded text-red-600 dark:text-red-400">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{doc}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2.5 MB • 12 Jan 2024</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyFlat;
