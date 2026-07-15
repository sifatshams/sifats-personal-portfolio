import { useEffect, useRef, useState } from 'react';
import {
  FaBriefcase,
  FaCamera,
  FaEdit,
  FaEnvelope,
  FaSave,
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

  // trigger hidden input click
  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  // handle local image preview and save selected file
  const handleImageChange = (e) => {
    const file = e.target.files[0];
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
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl relative overflow-hidden transition-all duration-300">
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#646cff]/10 blur-3xl pointer-events-none" />

      <div className="mb-6 flex items-center justify-between relative z-10">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <FaUser className="text-[#646cff]" />
          Admin Profile
        </h2>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 cursor-pointer rounded-xl bg-slate-800 hover:bg-slate-700 text-[#646cff] transition duration-300"
          >
            <FaEdit className="text-sm" />
          </button>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-5 relative z-10">
        <div className="flex flex-col items-center sm:flex-row gap-5 pb-2">
          <div className="relative group">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt={name}
                className="h-20 w-20 rounded-full border-2 border-[#646cff] object-cover transition duration-300"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-[#646cff] border-2 border-[#646cff] flex items-center justify-center text-white font-bold text-2xl">
                {name?.charAt(0).toUpperCase() || 'A'}
              </div>
            )}

            {isEditing && (
              <div
                onClick={handleImageClick}
                className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center cursor-pointer border border-[#646cff] opacity-0 group-hover:opacity-100 transition duration-300"
              >
                <FaCamera className="text-white text-lg" />
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

          <div className="text-center sm:text-left flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full px-3 py-1.5 text-sm rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-[#646cff] transition duration-300"
                />
                <p className="flex items-center justify-center sm:justify-start gap-1.5 text-[#646cff]/80 mt-1 text-sm font-medium">
                  <FaBriefcase className="text-xs" />
                  {user.role || 'Admin'}
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-white truncate">
                  {name}
                </h3>
                <p className="flex items-center justify-center sm:justify-start gap-1.5 text-[#646cff] mt-1 text-sm font-medium">
                  <FaBriefcase className="text-xs" />
                  {user.role || 'Admin'}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center gap-3 text-slate-300 px-1 py-1.5 rounded-xl bg-slate-900/40 border border-slate-800/30 opacity-70">
            <div className="p-2 rounded-lg bg-[#646cff]/10 text-[#646cff]">
              <FaEnvelope className="text-sm" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-slate-300 uppercase tracking-wider">
                Email Address (Not Editable)
              </p>
              <p className="text-sm text-slate-100 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 cursor-pointer rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 font-medium text-sm transition duration-300 disabled:opacity-50"
            >
              <FaTimes />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 cursor-pointer rounded-xl bg-gradient-to-r from-[#646cff] to-[#4e5dff] text-white py-3 font-medium text-sm transition duration-300 hover:shadow-lg hover:shadow-[#646cff]/20 disabled:opacity-50"
            >
              <FaSave />
              {isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileCard;
