"use client";
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiPlus, FiUsers, FiEdit2, FiTrash2, FiShield, FiX, FiUserCheck, FiUserX, FiChevronDown, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ROLES = [
  { value: 'super_admin', label: 'Super Admin',   color: 'bg-red-100 text-red-700',    desc: 'Full access to everything' },
  { value: 'admin',       label: 'Admin',          color: 'bg-orange-100 text-orange-700', desc: 'All content & management' },
  { value: 'client',      label: 'Client',         color: 'bg-blue-100 text-blue-700',  desc: 'Own website management' },
  { value: 'seo',         label: 'SEO Specialist', color: 'bg-purple-100 text-purple-700', desc: 'SEO Manager only' },
  { value: 'blog',        label: 'Blog Manager',   color: 'bg-teal-100 text-teal-700',  desc: 'Blogs section only' },
  { value: 'editor',      label: 'Content Editor', color: 'bg-green-100 text-green-700', desc: 'Pages, Redirects & Media' },
  { value: 'viewer',      label: 'Viewer',         color: 'bg-gray-100 text-gray-700',  desc: 'Pages & SEO view only' },
];

// Multi-select dropdown with checkboxes for Modal forms (auto-flips upward/downward to avoid overflow)
function RoleMultiSelect({ selectedRoles = [], onChange, label = 'Role' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [maxHeight, setMaxHeight] = useState(220);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      // In modals, space below is usually tight (~150px) while space above is ample (~500px)
      const shouldOpenUp = spaceBelow < 270 && spaceAbove > spaceBelow;
      setOpenUpward(shouldOpenUp);
      const available = shouldOpenUp ? spaceAbove - 24 : spaceBelow - 24;
      setMaxHeight(Math.max(160, Math.min(220, available)));
    }
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleRole = (roleVal) => {
    if (selectedRoles.includes(roleVal)) {
      if (selectedRoles.length === 1) {
        toast.error('At least one role must be selected');
        return;
      }
      onChange(selectedRoles.filter(r => r !== roleVal));
    } else {
      onChange([...selectedRoles, roleVal]);
    }
  };

  const renderTriggerContent = () => {
    if (!selectedRoles || selectedRoles.length === 0) {
      return <span className="text-gray-400">Select roles...</span>;
    }
    if (selectedRoles.length === 1) {
      const r = ROLES.find(x => x.value === selectedRoles[0]);
      return (
        <span className="text-gray-800 truncate">
          {r ? `${r.label} — ${r.desc}` : selectedRoles[0]}
        </span>
      );
    }
    const labels = selectedRoles.map(v => ROLES.find(r => r.value === v)?.label || v);
    return (
      <span className="text-gray-800 truncate">
        <span className="font-semibold text-[#084032]">{selectedRoles.length} Roles Selected: </span>
        {labels.join(', ')}
      </span>
    );
  };

  return (
    <div>
      {label && <label className="block text-sm font-semibold text-gray-700 mb-1">{label} *</label>}
      <div className="relative" ref={containerRef}>
        <button
          ref={buttonRef}
          type="button"
          onClick={handleToggle}
          className={`w-full rounded-md border ${
            isOpen ? 'border-[#084032] ring-2 ring-[#00a63e]' : 'border-gray-300'
          } px-4 py-2 text-sm text-left bg-white flex items-center justify-between gap-2 shadow-sm transition hover:border-gray-400 outline-none cursor-pointer`}
        >
          <div className="flex items-center gap-2 truncate">
            {renderTriggerContent()}
          </div>
          <FiChevronDown className={`text-gray-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div
            ref={dropdownRef}
            style={{ maxHeight: `${maxHeight}px` }}
            className={`absolute z-50 left-0 right-0 ${
              openUpward ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
            } bg-white border border-gray-200 rounded-md shadow-2xl overflow-y-auto py-1`}
          >
            <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium sticky top-0 z-10">
              <span>Check roles to grant access</span>
              <span className="text-[#084032] font-semibold">{selectedRoles.length} selected</span>
            </div>
            {ROLES.map(role => {
              const isChecked = selectedRoles.includes(role.value);
              return (
                <label
                  key={role.value}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleRole(role.value);
                  }}
                  className={`flex items-center gap-3 px-3.5 py-2 text-sm cursor-pointer select-none transition ${
                    isChecked ? 'bg-[#084032]/10 font-medium' : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-4 h-4 text-[#084032] rounded border-gray-300 focus:ring-[#084032] cursor-pointer"
                  />
                  <span className="flex-1 truncate">
                    <span className={isChecked ? 'font-semibold text-gray-900' : 'text-gray-800'}>{role.label}</span>
                    <span className="text-gray-500 font-normal"> — {role.desc}</span>
                  </span>
                  {isChecked && <FiCheck className="text-[#084032] text-xs flex-shrink-0" />}
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Compact Multi-select dropdown for Table rows (rendered via Portal to prevent container clipping)
function TableRoleMultiSelect({ user, onRolesChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateMenuPosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const openUp = spaceBelow < 260 && spaceAbove > spaceBelow;
    const maxH = Math.max(160, Math.min(260, (openUp ? spaceAbove : spaceBelow) - 16));

    const menuWidth = 260;
    let left = rect.left;
    if (left + menuWidth > window.innerWidth - 16) {
      left = window.innerWidth - menuWidth - 16;
    }
    if (left < 16) left = 16;

    setMenuStyle({
      position: 'fixed',
      left: `${left}px`,
      top: openUp ? undefined : `${rect.bottom + 6}px`,
      bottom: openUp ? `${window.innerHeight - rect.top + 6}px` : undefined,
      width: `${menuWidth}px`,
      maxHeight: `${maxH}px`,
      zIndex: 99999,
    });
  };

  const handleToggle = () => {
    if (!isOpen) {
      updateMenuPosition();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (
        buttonRef.current && !buttonRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleScrollOrResize(event) {
      if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
        return; // Keep open while user scrolls inside dropdown
      }
      setIsOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen]);

  const userRoles = Array.isArray(user.roles) && user.roles.length > 0
    ? user.roles
    : (user.role ? [user.role] : ['editor']);

  const toggleRole = (roleVal) => {
    let nextRoles;
    if (userRoles.includes(roleVal)) {
      if (userRoles.length === 1) {
        toast.error('User must have at least one role');
        return;
      }
      nextRoles = userRoles.filter(r => r !== roleVal);
    } else {
      nextRoles = [...userRoles, roleVal];
    }
    onRolesChange(user._id, nextRoles);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        className="flex flex-wrap items-center gap-1.5 p-1 rounded hover:bg-gray-100 transition border border-transparent hover:border-gray-200 cursor-pointer"
        title="Click to manage role access"
      >
        {userRoles.map(rVal => {
          const rObj = ROLES.find(r => r.value === rVal);
          return (
            <span
              key={rVal}
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${rObj ? rObj.color : 'bg-gray-100 text-gray-700'}`}
            >
              {rObj ? rObj.label : rVal}
            </span>
          );
        })}
        <FiChevronDown className="text-gray-400 text-xs ml-0.5" />
      </button>

      {isOpen && mounted && createPortal(
        <div
          ref={dropdownRef}
          style={menuStyle}
          className="bg-white border border-gray-200 rounded-md shadow-2xl overflow-y-auto py-1"
        >
          <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium sticky top-0 z-10">
            <span>Toggle Role Access</span>
            <span className="text-[#084032] font-semibold">{userRoles.length} active</span>
          </div>
          {ROLES.map(role => {
            const isChecked = userRoles.includes(role.value);
            return (
              <label
                key={role.value}
                onClick={(e) => {
                  e.preventDefault();
                  toggleRole(role.value);
                }}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer select-none transition ${
                  isChecked ? 'bg-emerald-50/70 font-medium' : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="w-3.5 h-3.5 text-[#084032] rounded border-gray-300 focus:ring-[#084032] cursor-pointer"
                />
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${role.color}`}>
                  {role.label}
                </span>
                <span className="text-gray-400 text-[10px] truncate ml-auto">{role.desc.split(' ')[0]}</span>
                {isChecked && <FiCheck className="text-[#084032] text-xs flex-shrink-0" />}
              </label>
            );
          })}
        </div>,
        document.body
      )}
    </div>
  );
}

export default function UsersClient({ initialUsers = [], websites = [], apiBase }) {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', password: '', roles: ['editor'] });
  const [editLoading, setEditLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', roles: ['editor'], assignedWebsites: [] });

  const showMsg = (msg, type) => {
    if (type === 'success') toast.success(msg);
    else toast.error(msg);
  };

  const handleCreate = async () => {
    if (!form.name || !form.email || !form.password) {
      showMsg('Please fill all required fields', 'error');
      return;
    }
    if (!form.roles || form.roles.length === 0) {
      showMsg('Please select at least one role', 'error');
      return;
    }
    try {
      const primaryRole = form.roles.includes('super_admin') ? 'super_admin' : form.roles[0];
      const res = await fetch(`${apiBase}/api/cms/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          role: primaryRole,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(prev => [data.user, ...prev]);
        showMsg('User created successfully!', 'success');
        setShowModal(false);
        setForm({ name: '', email: '', password: '', roles: ['editor'], assignedWebsites: [] });
      } else {
        showMsg(data.error || 'Failed to create user', 'error');
      }
    } catch (err) {
      showMsg('Error: ' + err.message, 'error');
    }
  };

  const handleRolesChange = async (userId, newRoles) => {
    if (!newRoles || newRoles.length === 0) {
      showMsg('Please select at least one role', 'error');
      return;
    }
    const primaryRole = newRoles.includes('super_admin') ? 'super_admin' : newRoles[0];
    try {
      const res = await fetch(`${apiBase}/api/cms/users`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, roles: newRoles, role: primaryRole }),
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => u._id === userId ? { ...u, roles: newRoles, role: primaryRole } : u));
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('user');
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              const targetUser = users.find(u => u._id === userId);
              if (targetUser && targetUser.email === parsed.email) {
                const updated = { ...parsed, roles: newRoles, role: primaryRole };
                localStorage.setItem('user', JSON.stringify(updated));
              }
            } catch (e) {}
          }
        }
        showMsg('Role access updated', 'success');
      } else {
        const data = await res.json();
        showMsg(data.error || 'Failed to update roles', 'error');
      }
    } catch (err) {
      showMsg('Failed to update roles', 'error');
    }
  };

  const openEdit = (user) => {
    setEditUser(user);
    const userRoles = Array.isArray(user.roles) && user.roles.length > 0
      ? user.roles
      : (user.role ? [user.role] : ['editor']);
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      password: '',
      roles: userRoles,
    });
  };

  const handleEdit = async () => {
    if (!editForm.name || !editForm.email) {
      showMsg('Name and Email are required', 'error');
      return;
    }
    if (!editForm.roles || editForm.roles.length === 0) {
      showMsg('Please select at least one role', 'error');
      return;
    }
    setEditLoading(true);
    try {
      const primaryRole = editForm.roles.includes('super_admin') ? 'super_admin' : editForm.roles[0];
      const body = {
        id: editUser._id,
        name: editForm.name,
        email: editForm.email,
        roles: editForm.roles,
        role: primaryRole,
      };
      if (editForm.password.trim()) body.password = editForm.password.trim();
      const res = await fetch(`${apiBase}/api/cms/users`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(prev => prev.map(u =>
          u._id === editUser._id
            ? { ...u, name: editForm.name, email: editForm.email, roles: editForm.roles, role: primaryRole }
            : u
        ));
        showMsg('User updated successfully!', 'success');
        setEditUser(null);
      } else {
        showMsg(data.error || 'Failed to update user', 'error');
      }
    } catch (err) {
      showMsg('Error: ' + err.message, 'error');
    }
    setEditLoading(false);
  };

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to permanently delete this user?')) return;
    try {
      const res = await fetch(`${apiBase}/api/cms/users?id=${userId}`, { method: 'DELETE' });
      if (res.ok) {
        setUsers(prev => prev.filter(u => u._id !== userId));
        showMsg('User deleted successfully', 'success');
      } else {
        showMsg('Failed to delete user', 'error');
      }
    } catch (err) {
      showMsg('Failed to delete user', 'error');
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    if (!confirm(`Are you sure you want to ${newStatus === 'active' ? 'activate' : 'deactivate'} this user?`)) return;
    try {
      const res = await fetch(`${apiBase}/api/cms/users`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, status: newStatus }),
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => u._id === userId ? { ...u, status: newStatus } : u));
        showMsg(`User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`, 'success');
      } else {
        showMsg('Failed to update status', 'error');
      }
    } catch (err) {
      showMsg('Failed to update status', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats + Add */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-sm text-gray-500">
          <span>{users.length} total users</span>
          <span>{users.filter(u => u.status === 'active').length} active</span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#084032] text-white text-sm font-semibold rounded-md hover:bg-[#0a5c48] transition cursor-pointer"
        >
          <FiPlus /> Add User
        </button>
      </div>

      {/* Users Table */}
      {users.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <FiUsers className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Users</h3>
          <p className="text-sm text-gray-400">Create your first user account.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase rounded-tl-lg">User</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Role Access</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Websites</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Created</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(user => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#084032] flex items-center justify-center text-white text-sm font-bold">
                        {user.name?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <TableRoleMultiSelect user={user} onRolesChange={handleRolesChange} />
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-500">
                      {user.assignedWebsites?.length || 0} websites
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-500">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(user)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                        title="Edit User"
                      >
                        <FiEdit2 size={15} />
                      </button>
                      {user.status === 'active' ? (
                        <button
                          onClick={() => handleToggleStatus(user._id, 'active')}
                          className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors cursor-pointer"
                          title="Deactivate User"
                        >
                          <FiUserX size={15} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleToggleStatus(user._id, 'inactive')}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors cursor-pointer"
                          title="Activate User"
                        >
                          <FiUserCheck size={15} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                        title="Delete User"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Role Permissions Matrix */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FiShield size={15} className="text-[#084032]" />
          <h3 className="text-sm font-semibold text-gray-700">Role Permissions — What each role can access</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-44">Module / Feature</th>
                <th className="px-3 py-3 text-center"><span className="inline-flex flex-col items-center gap-1"><span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold text-[10px]">Super Admin</span><span className="text-[9px] text-gray-400 font-normal">Full control</span></span></th>
                <th className="px-3 py-3 text-center"><span className="inline-flex flex-col items-center gap-1"><span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-semibold text-[10px]">Admin</span><span className="text-[9px] text-gray-400 font-normal">All content</span></span></th>
                <th className="px-3 py-3 text-center"><span className="inline-flex flex-col items-center gap-1"><span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-[10px]">Client</span><span className="text-[9px] text-gray-400 font-normal">Own website</span></span></th>
                <th className="px-3 py-3 text-center"><span className="inline-flex flex-col items-center gap-1"><span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold text-[10px]">SEO</span><span className="text-[9px] text-gray-400 font-normal">SEO only</span></span></th>
                <th className="px-3 py-3 text-center"><span className="inline-flex flex-col items-center gap-1"><span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 font-semibold text-[10px]">Blog Mgr</span><span className="text-[9px] text-gray-400 font-normal">Blogs only</span></span></th>
                <th className="px-3 py-3 text-center"><span className="inline-flex flex-col items-center gap-1"><span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold text-[10px]">Editor</span><span className="text-[9px] text-gray-400 font-normal">Pages+Media</span></span></th>
                <th className="px-3 py-3 text-center"><span className="inline-flex flex-col items-center gap-1"><span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-semibold text-[10px]">Viewer</span><span className="text-[9px] text-gray-400 font-normal">View only</span></span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                {
                  group: '⚙️ Management',
                  rows: [
                    { label: 'Dashboard',             super_admin:true,  admin:true,  client:true,  seo:true,  blog:true,  editor:true,  viewer:true  },
                    { label: 'Job Applications',       super_admin:true,  admin:true,  client:true,  seo:false, blog:false, editor:false, viewer:false },
                    { label: 'Inquiry Form (Contact)', super_admin:true,  admin:true,  client:true,  seo:false, blog:false, editor:false, viewer:false },
                    { label: 'Reviews',                super_admin:true,  admin:true,  client:true,  seo:false, blog:false, editor:false, viewer:false },
                    { label: 'Business Settings',      super_admin:true,  admin:true,  client:true,  seo:false, blog:false, editor:false, viewer:false },
                    { label: 'Users Management',       super_admin:true,  admin:true,  client:false, seo:false, blog:false, editor:false, viewer:false },
                    { label: 'Activity Logs',          super_admin:true,  admin:true,  client:false, seo:false, blog:false, editor:false, viewer:false },
                  ],
                },
                {
                  group: '🗂️ CMS',
                  rows: [
                    { label: 'Pages & Routes',         super_admin:true,  admin:true,  client:true,  seo:false, blog:false, editor:true,  viewer:true  },
                    { label: 'Wholesale Landing Page', super_admin:true,  admin:true,  client:true,  seo:false, blog:false, editor:true,  viewer:true  },
                    { label: 'SEO Manager',            super_admin:true,  admin:true,  client:true,  seo:true,  blog:false, editor:false, viewer:true  },
                    { label: 'URL Redirects',          super_admin:true,  admin:true,  client:true,  seo:false, blog:false, editor:true,  viewer:false },
                    { label: 'Media Library',          super_admin:true,  admin:true,  client:true,  seo:false, blog:false, editor:true,  viewer:false },
                  ],
                },
                {
                  group: '✍️ Blogs',
                  rows: [
                    { label: 'List Blogs',             super_admin:true,  admin:true,  client:true,  seo:false, blog:true,  editor:false, viewer:false },
                    { label: 'Add Blog',               super_admin:true,  admin:true,  client:true,  seo:false, blog:true,  editor:false, viewer:false },
                    { label: 'Comment List',           super_admin:true,  admin:true,  client:true,  seo:false, blog:true,  editor:false, viewer:false },
                  ],
                },
                {
                  group: '📅 Scheduling',
                  rows: [
                    { label: 'Appointment Links',      super_admin:true,  admin:true,  client:true,  seo:false, blog:false, editor:false, viewer:false },
                  ],
                },
              ].map(section => (
                <React.Fragment key={section.group}>
                  <tr className="bg-[#f8faf9]">
                    <td colSpan={8} className="px-4 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      {section.group}
                    </td>
                  </tr>
                  {section.rows.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50/50 hover:bg-gray-50'}>
                      <td className="px-4 py-2.5 text-xs text-gray-700 font-medium">{row.label}</td>
                      {['super_admin','admin','client','seo','blog','editor','viewer'].map(role => (
                        <td key={role} className="px-3 py-2.5 text-center">
                          {row[role] ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600" title="Access granted">
                              <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-50 text-red-300" title="No access">
                              <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex flex-wrap items-center gap-5 text-[10px] text-gray-400">
          <span className="flex items-center gap-1.5"><span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-100 text-green-600"><svg viewBox="0 0 20 20" fill="currentColor" className="w-2.5 h-2.5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span>Access granted</span>
          <span className="flex items-center gap-1.5"><span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-50 text-red-300"><svg viewBox="0 0 20 20" fill="currentColor" className="w-2.5 h-2.5"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg></span>No access</span>
          <span className="ml-auto">Super Admin has full access to everything. Multiple roles grant access to all checked features combined.</span>
        </div>
      </div>

      {/* ── Edit User Modal ────────────────────────────────────────────── */}
      {editUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setEditUser(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 my-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Edit User</h3>
                <p className="text-xs text-gray-400 mt-0.5">Updating: {editUser.name}</p>
              </div>
              <button onClick={() => setEditUser(null)} className="p-1 hover:bg-gray-100 rounded cursor-pointer"><FiX /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                <input
                  value={editForm.name}
                  onChange={(e) => setEditForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Full name"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-[#084032] focus:ring-2 focus:ring-[#00a63e] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="user@example.com"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-[#084032] focus:ring-2 focus:ring-[#00a63e] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  New Password
                  <span className="ml-1 text-xs font-normal text-gray-400">(leave blank to keep current password)</span>
                </label>
                <input
                  type="password"
                  value={editForm.password}
                  onChange={(e) => setEditForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="Leave blank to keep current password"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-[#084032] focus:ring-2 focus:ring-[#00a63e] outline-none"
                />
              </div>
              <div>
                <RoleMultiSelect
                  label="Role Access"
                  selectedRoles={editForm.roles}
                  onChange={(newRoles) => setEditForm(p => ({ ...p, roles: newRoles }))}
                />
              </div>
              <button
                onClick={handleEdit}
                disabled={editLoading}
                className="w-full px-4 py-2.5 bg-[#084032] text-white text-sm font-semibold rounded-md hover:bg-[#0a5c48] transition disabled:opacity-60 cursor-pointer"
              >
                {editLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Create User Modal ────────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 my-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Create User</h3>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded cursor-pointer"><FiX /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-[#084032] focus:ring-2 focus:ring-[#00a63e] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="user@example.com"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-[#084032] focus:ring-2 focus:ring-[#00a63e] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password *</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="Min 8 characters"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-[#084032] focus:ring-2 focus:ring-[#00a63e] outline-none"
                />
              </div>
              <div>
                <RoleMultiSelect
                  label="Role"
                  selectedRoles={form.roles}
                  onChange={(newRoles) => setForm(p => ({ ...p, roles: newRoles }))}
                />
              </div>
              <button
                onClick={handleCreate}
                className="w-full px-4 py-2.5 bg-[#084032] text-white text-sm font-semibold rounded-md hover:bg-[#0a5c48] transition cursor-pointer"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
