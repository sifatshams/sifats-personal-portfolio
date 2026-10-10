import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FiCalendar,
  FiCamera,
  FiCheck,
  FiEdit2,
  FiImage,
  FiLoader,
  FiMail,
  FiShield,
  FiUser,
  FiX,
} from 'react-icons/fi';

import { toast } from 'react-toastify';
import { useUpdateUserProfile } from '../../hooks/user/useProfileQuery';
import useAuthStore from '../../store/authStore';

const UserProfileCard = () => {
  const user = useAuthStore((state) => state.user);
  const updateProfileMutation = useUpdateUserProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
    },
  });

  const currentName = watch('name');

  // support different profile image formats
  const profileImage =
    user?.profileImage?.url ||
    user?.avatar?.url ||
    (typeof user?.profileImage === 'string' ? user.profileImage : '') ||
    (typeof user?.avatar === 'string' ? user.avatar : '');

  const displayImage = previewImage || profileImage;

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'Not available';

  // reset the form when user data changes
  useEffect(() => {
    if (!isEditing) {
      reset({
        name: user?.name || '',
      });
    }
  }, [user?.name, isEditing, reset]);

  // create and clean up the local image preview
  useEffect(() => {
    if (!selectedImage) {
      setPreviewImage('');
      return undefined;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewImage(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedImage]);

  // validate the selected image
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      event.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5 MB.');
      event.target.value = '';
      return;
    }

    setSelectedImage(file);
  };

  // cancel profile editing
  const handleCancel = () => {
    reset({
      name: user?.name || '',
    });

    setSelectedImage(null);
    setPreviewImage('');
    setIsEditing(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // save profile changes
  const handleSaveProfile = async (values) => {
    const trimmedName = values.name.trim();

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      toast.error('Name must be between 2 and 100 characters.');
      return;
    }

    const nameChanged = trimmedName !== (user?.name || '');
    const imageChanged = Boolean(selectedImage);

    if (!nameChanged && !imageChanged) {
      setIsEditing(false);
      return;
    }

    const formData = new FormData();

    if (nameChanged) {
      formData.append('name', trimmedName);
    }

    if (selectedImage) {
      formData.append('avatar', selectedImage);
    }

    try {
      await updateProfileMutation.mutateAsync(formData);

      setSelectedImage(null);
      setPreviewImage('');
      setIsEditing(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch {
      console.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-white shadow-xl">
      {/* profile header */}
      <div className="relative border-b border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/40 px-6 py-8 sm:px-8">
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          {/* profile image */}
          <div className="relative shrink-0">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-slate-700 bg-slate-800 shadow-lg">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={user?.name || 'User profile'}
                  className="h-full w-full object-cover"
                />
              ) : (
                <FiUser className="text-4xl text-slate-400" />
              )}
            </div>

            {isEditing && (
              <>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={updateProfileMutation.isPending}
                  aria-label="Change profile image"
                  className="absolute cursor-pointer bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-950 bg-indigo-600 text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FiCamera size={16} />
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={updateProfileMutation.isPending}
                />
              </>
            )}
          </div>

          {/* user details */}
          <div className="min-w-0 flex-1 text-center sm:text-left">
            {isEditing ? (
              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Full name
                </label>

                <input
                  id="profile-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your name"
                  disabled={updateProfileMutation.isPending}
                  {...register('name', {
                    required: 'Name is required.',
                    validate: (value) =>
                      value.trim().length >= 2 ||
                      'Name must contain at least 2 characters.',
                    maxLength: {
                      value: 100,
                      message: 'Name cannot exceed 100 characters.',
                    },
                  })}
                  className="w-full max-w-md rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>
            ) : (
              <h2 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
                {user?.name || 'User'}
              </h2>
            )}

            <p className="mt-2 break-all text-sm text-slate-400">
              {user?.email || 'No email available'}
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium capitalize text-indigo-300">
                <FiShield size={13} />
                {user?.role || 'user'}
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/70 px-3 py-1 text-xs text-slate-300">
                <FiCalendar size={13} />
                Joined {joinedDate}
              </span>
            </div>
          </div>

          {/* edit button */}
          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-indigo-500 hover:text-white cursor-pointer"
            >
              <FiEdit2 size={15} />
              Edit profile
            </button>
          )}
        </div>

        {isEditing && selectedImage && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400 sm:justify-start">
            <FiImage size={14} />
            <span className="max-w-full break-all">{selectedImage.name}</span>
          </div>
        )}
      </div>

      {/* account information */}
      <div className="p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
            <FiUser size={19} />
          </div>

          <div>
            <h3 className="font-semibold text-white">Account information</h3>
            <p className="text-sm text-slate-400">
              Your personal account details
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* name */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-500">
              <FiUser size={14} />
              Full name
            </div>
            <p className="break-words font-medium text-slate-200">
              {currentName || user?.name || 'Not available'}
            </p>
          </div>

          {/* email */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-500">
              <FiMail size={14} />
              Email address
            </div>
            <p className="break-all font-medium text-slate-200">
              {user?.email || 'Not available'}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Email cannot be changed here
            </p>
          </div>

          {/* role */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-500">
              <FiShield size={14} />
              Account role
            </div>
            <p className="font-medium capitalize text-slate-200">
              {user?.role || 'user'}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Role is managed by the system
            </p>
          </div>

          {/* joined date */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-500">
              <FiCalendar size={14} />
              Member since
            </div>
            <p className="font-medium text-slate-200">{joinedDate}</p>
          </div>
        </div>

        {/* edit actions */}
        {isEditing && (
          <form
            onSubmit={handleSubmit(handleSaveProfile)}
            className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end"
          >
            <button
              type="button"
              onClick={handleCancel}
              disabled={updateProfileMutation.isPending}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition cursor-pointer hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiX size={16} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={updateProfileMutation.isPending}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition cursor-pointer hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updateProfileMutation.isPending ? (
                <>
                  <FiLoader className="animate-spin" size={16} />
                  Saving...
                </>
              ) : (
                <>
                  <FiCheck size={16} />
                  Save changes
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;
