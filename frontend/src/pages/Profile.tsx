import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/auth';

const Profile: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        phone: user?.phone || '',
        address: user?.address || '',
    });
    const [passwordData, setPasswordData] = useState({
        old_password: '',
        new_password: '',
        new_password_confirm: '',
    });
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const updatedUser = await authService.updateProfile(formData);
            updateUser(updatedUser);
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error: any) {
            setErrors(error.response?.data || { detail: 'Update failed' });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            await authService.changePassword(passwordData);
            setPasswordData({
                old_password: '',
                new_password: '',
                new_password_confirm: '',
            });
            setShowPasswordForm(false);
            alert('Password changed successfully!');
        } catch (error: any) {
            setErrors(error.response?.data || { detail: 'Password change failed' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Info */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="text-primary-600 hover:text-primary-800 transition-colors"
                                >
                                    Edit
                                </button>
                            )}
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {errors.detail && (
                                    <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
                                        {errors.detail}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                        {errors.first_name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.first_name[0]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                        {errors.last_name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.last_name[0]}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">{errors.phone[0]}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <textarea
                                        name="address"
                                        rows={3}
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-600">{errors.address[0]}</p>
                                    )}
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50"
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setFormData({
                                                first_name: user?.first_name || '',
                                                last_name: user?.last_name || '',
                                                phone: user?.phone || '',
                                                address: user?.address || '',
                                            });
                                            setErrors({});
                                        }}
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                                        <p className="mt-1 text-gray-900">{user?.first_name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <p className="mt-1 text-gray-900">{user?.last_name}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <p className="mt-1 text-gray-900">{user?.email}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <p className="mt-1 text-gray-900">{user?.phone || 'Not provided'}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <p className="mt-1 text-gray-900">{user?.address || 'Not provided'}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Change Password */}
                    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
                            {!showPasswordForm && (
                                <button
                                    onClick={() => setShowPasswordForm(true)}
                                    className="text-primary-600 hover:text-primary-800 transition-colors"
                                >
                                    Change Password
                                </button>
                            )}
                        </div>

                        {showPasswordForm && (
                            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                {errors.detail && (
                                    <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
                                        {errors.detail}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        name="old_password"
                                        value={passwordData.old_password}
                                        onChange={handlePasswordChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                    {errors.old_password && (
                                        <p className="mt-1 text-sm text-red-600">{errors.old_password[0]}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="new_password"
                                        value={passwordData.new_password}
                                        onChange={handlePasswordChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                    {errors.new_password && (
                                        <p className="mt-1 text-sm text-red-600">{errors.new_password[0]}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="new_password_confirm"
                                        value={passwordData.new_password_confirm}
                                        onChange={handlePasswordChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                    {errors.new_password_confirm && (
                                        <p className="mt-1 text-sm text-red-600">{errors.new_password_confirm[0]}</p>
                                    )}
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50"
                                    >
                                        {loading ? 'Changing...' : 'Change Password'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowPasswordForm(false);
                                            setPasswordData({
                                                old_password: '',
                                                new_password: '',
                                                new_password_confirm: '',
                                            });
                                            setErrors({});
                                        }}
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Account Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Account Summary</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Username</label>
                                <p className="mt-1 text-gray-900">{user?.username}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Member Since</label>
                                <p className="mt-1 text-gray-900">
                                    {user?.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
