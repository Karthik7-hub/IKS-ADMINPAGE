import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, X, Upload, ArrowLeft, Loader2, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Base URL for your "person" routes
const API_BASE = "https://iks-nitrr-backend.vercel.app/person";

const PeopleManager = () => {
    const navigate = useNavigate();
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        role: '',
        email: '',
        alternateEmail: '',
        photo: null
    });
    const [preview, setPreview] = useState(null);

    // Initial Fetch
    useEffect(() => {
        fetchPeople();
    }, []);

    const fetchPeople = async () => {
        try {
            // Matches router.get("/getpeople", getAllPeople);
            const res = await axios.get(`${API_BASE}/getpeople`);
            if (res.data.success) {
                setPeople(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching people", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, photo: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const openModal = (person = null) => {
        if (person) {
            setIsEditing(true);
            setFormData({
                id: person._id,
                name: person.name,
                role: person.role,
                email: person.email,
                alternateEmail: person.alternateEmail || '',
                photo: null
            });
            setPreview(person.photo);
        } else {
            setIsEditing(false);
            setFormData({ name: '', role: '', email: '', alternateEmail: '', photo: null });
            setPreview(null);
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('role', formData.role);
        data.append('email', formData.email);
        if (formData.alternateEmail) data.append('alternateEmail', formData.alternateEmail);
        if (formData.photo) {
            data.append('photo', formData.photo);
        }

        try {
            if (isEditing) {
                // Matches router.put("/update/:id", ...);
                await axios.put(`${API_BASE}/update/${formData.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                // Matches router.post("/addperson", ...);
                await axios.post(`${API_BASE}/addperson`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            setShowModal(false);
            fetchPeople();
        } catch (error) {
            alert("Error saving person. Please try again.");
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="relative pb-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <button onClick={() => navigate('/')} className="flex items-center text-gray-500 hover:text-indigo-600 transition">
                    <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
                </button>
                <button
                    onClick={() => openModal()}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition shadow-sm"
                >
                    <Plus size={20} /> Add New Person
                </button>
            </div>

            {/* Grid of People */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <Loader2 className="animate-spin mb-2" size={30} />
                    <p>Loading people...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {people.map((person) => (
                        <div key={person._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
                            <div className="h-48 overflow-hidden bg-gray-100 relative group">
                                {person.photo ? (
                                    <img src={person.photo} alt={person.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                                )}
                                <button
                                    onClick={() => openModal(person)}
                                    className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-sm hover:text-indigo-600 transition opacity-0 group-hover:opacity-100"
                                >
                                    <Edit2 size={16} />
                                </button>
                            </div>
                            <div className="p-4 flex-grow">
                                <h3 className="font-bold text-gray-800 text-lg">{person.name}</h3>
                                <p className="text-sm text-indigo-600 font-medium mb-3">{person.role}</p>

                                <div className="space-y-1">
                                    <div className="flex items-center text-xs text-gray-500 gap-2">
                                        <Mail size={14} /> {person.email}
                                    </div>
                                    {person.alternateEmail && (
                                        <div className="flex items-center text-xs text-gray-500 gap-2">
                                            <Mail size={14} /> {person.alternateEmail}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Form */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                            <h2 className="text-lg font-bold text-gray-800">
                                {isEditing ? 'Edit Person' : 'Add New Person'}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Photo Upload Area */}
                            <div className="flex flex-col items-center justify-center">
                                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 group hover:border-indigo-400 transition">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">
                                            <Upload size={24} />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        accept="image/*"
                                    />
                                </div>
                                <span className="text-xs text-gray-500 mt-2">Click circle to upload photo</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input required name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Dr. Jane Doe" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role / Designation</label>
                                    <input required name="role" value={formData.role} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Associate Professor" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Email</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Alt. Email (Opt)</label>
                                    <input type="email" name="alternateEmail" value={formData.alternateEmail} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium mt-4 disabled:bg-indigo-400 flex justify-center items-center gap-2"
                            >
                                {submitting && <Loader2 className="animate-spin" size={18} />}
                                {isEditing ? 'Update Person' : 'Create Person'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PeopleManager;