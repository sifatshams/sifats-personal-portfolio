import { useEffect, useRef, useState } from 'react';
import {
  FaBriefcase,
  FaCalendarAlt,
  FaCamera,
  FaEdit,
  FaEnvelope,
  FaSave,
  FaShieldAlt,
  FaTimes,
  FaUser,
} from 'react-icons/fa';
import { useUpdateAdminProfile } from '../../hooks/admin/useUpdateAdminProfile';
import useAuthStore from '../../store/authStore';

const ProfileCard = () => {
  const { user } = useAuthStore();
  const fileInputRef = useRef(null);

  // query mutation hook for profile update
  const { mutate: updateProfile, isPending } = useUpdateAdminProfile();

  // local states for profile inputs
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // sync state with store data on mount or updates
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setImagePreview(user.profileImage?.url || null);
    }
  }, [user]);

  // format member since date dynamically
  const formattedJoinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'N/A';

  // trigger hidden input click
  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  // handle local image preview and save selected file
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // append form-data and dispatch mutation
  const handleSave = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);

    if (selectedFile) {
      formData.append('avatar', selectedFile);
    }

    updateProfile(formData, {
      onSuccess: () => {
        setIsEditing(false);
        setSelectedFile(null);
      },
    });
  };

  // reset form to database values
  const handleCancel = () => {
    if (user) {
      setName(user.name || '');
      setImagePreview(user.profileImage?.url || null);
    }
    setSelectedFile(null);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Main Admin Profile Card */}
      <div className="relative rounded-3xl border border-slate-800/80 bg-[#0b1120]/60 p-6 md:p-8 backdrop-blur-xl overflow-hidden shadow-2xl transition-all duration-300">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#646cff]/10 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="mb-6 flex items-center justify-between relative z-10">
          <h2 className="flex items-center gap-2.5 text-lg font-bold text-white tracking-wide">
            <FaUser className="text-[#646cff]" />
            Admin Profile Overview
          </h2>

          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-xl bg-slate-900 border border-slate-800 hover:border-[#646cff]/40 text-slate-200 hover:text-[#646cff] font-bold text-xs transition duration-300 active:scale-95"
            >
              <FaEdit className="text-xs" /> Edit Profile
            </button>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-6 relative z-10">
          {/* Top Hero Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-2">
            {/* Avatar Section */}
            <div className="relative group cursor-pointer">
              <div className="p-[3px] rounded-2xl bg-gradient-to-tr from-[#646cff] to-purple-600 shadow-xl shadow-[#646cff]/10">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={name}
                    className="h-24 w-24 sm:h-28 sm:w-28 rounded-[13px] object-cover bg-slate-950 transition duration-300"
                  />
                ) : (
                  <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-[13px] bg-slate-950 flex items-center justify-center text-white font-black text-3xl">
                    {name?.charAt(0).toUpperCase() || 'A'}
                  </div>
                )}
              </div>

              {isEditing && (
                <div
                  onClick={handleImageClick}
                  className="absolute inset-0 bg-black/70 rounded-[16px] flex items-center justify-center cursor-pointer border border-[#646cff]/60 m-[3px] opacity-0 group-hover:opacity-100 transition duration-300"
                >
                  <FaCamera className="text-white text-xl" />
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Name & Role Field */}
            <div className="text-center sm:text-left flex-1 min-w-0 space-y-2">
              {isEditing ? (
                <div className="space-y-3 max-w-md">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter admin name"
                      className="w-full px-4 py-2 text-sm font-semibold rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-[#646cff] transition duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[#646cff] text-xs font-bold uppercase tracking-wider">
                    <FaBriefcase className="text-xs" />
                    <span>{user.role || 'Super Admin'}</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <h3 className="text-2xl font-black text-white tracking-wide truncate">
                      {name}
                    </h3>
                    <span className="mx-auto sm:mx-0 px-2.5 py-0.5 bg-[#646cff]/10 border border-[#646cff]/20 text-[10px] font-bold text-[#646cff] rounded-md uppercase tracking-wider w-max">
                      System {user.role || 'Admin'}
                    </span>
                  </div>
                  <p className="flex items-center justify-center sm:justify-start gap-2 text-slate-400 text-xs font-medium mt-1">
                    <FaEnvelope className="text-slate-500 text-xs" />
                    {user.email}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Account Information Section */}
          <div className="pt-6 border-t border-slate-800/80 space-y-4">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">
              Account Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name Display */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FaUser className="text-slate-600" /> Full Name
                </label>
                <div className="p-3 bg-slate-950/50 border border-slate-900 text-xs text-slate-200 font-bold rounded-xl truncate">
                  {name}
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FaEnvelope className="text-slate-600" /> Email Address
                </label>
                <div className="p-3 bg-slate-950/50 border border-slate-900 text-xs text-slate-200 font-bold rounded-xl truncate">
                  {user.email}
                </div>
              </div>

              {/* Account Role */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FaShieldAlt className="text-slate-600" /> Account Role
                </label>
                <div className="p-3 bg-slate-950/50 border border-slate-900 text-xs text-slate-200 font-bold rounded-xl truncate capitalize">
                  {user.role || 'Admin'}
                </div>
              </div>

              {/* Member Since */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FaCalendarAlt className="text-slate-600" /> Member Since
                </label>
                <div className="p-3 bg-slate-950/50 border border-slate-900 text-xs text-slate-200 font-bold rounded-xl truncate">
                  {formattedJoinedDate}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3 pt-4 border-t border-slate-800/60">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isPending}
                className="flex-1 flex items-center justify-center gap-2 cursor-pointer rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 py-2.5 font-bold text-xs transition duration-300 disabled:opacity-50"
              >
                <FaTimes />
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 flex items-center justify-center gap-2 cursor-pointer rounded-xl bg-gradient-to-r from-[#646cff] to-[#4e5dff] text-white py-2.5 font-bold text-xs transition duration-300 hover:shadow-lg hover:shadow-[#646cff]/20 disabled:opacity-50"
              >
                <FaSave />
                {isPending ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileCard;
