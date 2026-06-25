import React, { useState } from 'react';
import { User, Mail, Phone, Edit2, Check, X, Award, ShieldCheck, Compass, Heart, Briefcase } from 'lucide-react';

const avatarPresets = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
];

export default function Profile({ profile, onUpdateProfile, bookingsCount = 0, favoritesCount = 0 }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name || 'Shivani',
    email: profile.email || 'shivani@gmail.com',
    phone: profile.phone || '+91 98765 43210',
    avatar: profile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStartEdit = () => {
    setFormData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      avatar: profile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    });
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert("All fields are required.");
      return;
    }
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      avatar: profile.avatar
    });
    setIsEditing(false);
  };

  return (
    <div className="container" style={{ marginTop: '40px', marginBottom: '80px', animation: 'slideUp 0.4s ease-out' }}>
      
      {/* Page Title */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-display)' }}>My Profile</h2>
        <p style={{ color: 'var(--text-muted)' }}>Manage your personal contact details and member credentials.</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '32px',
        alignItems: 'start'
      }}>
        
        {/* PROFILE CARD */}
        <div style={{ 
          background: 'var(--bg-secondary)', 
          border: '1px solid var(--glass-border)', 
          padding: '32px', 
          borderRadius: '20px',
          boxShadow: 'var(--glass-shadow)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          {/* Avatar frame */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <img 
              src={(isEditing ? formData.avatar : profile.avatar) || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=180&q=80"} 
              alt="Avatar" 
              style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '50%', 
                objectFit: 'cover',
                border: '3px solid var(--primary)',
                padding: '4px',
                background: 'var(--bg-secondary)'
              }}
            />
            <div style={{ 
              position: 'absolute', 
              bottom: '0', 
              right: '8px', 
              background: 'var(--secondary)', 
              color: '#fff', 
              padding: '6px', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--bg-secondary)',
              fontSize: '0.8rem'
            }} title="Verified Traveler">
              <ShieldCheck size={14} />
            </div>
          </div>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
            {profile.name}
          </h3>
          <span style={{ 
            fontSize: '0.75rem', 
            background: 'rgba(255, 94, 132, 0.1)', 
            color: 'var(--primary)', 
            padding: '3px 12px', 
            borderRadius: '12px',
            fontWeight: 600,
            letterSpacing: '0.05em',
            marginBottom: '28px'
          }}>
            SANCHARI GOLD MEMBER
          </span>

          {/* Form details view / edit */}
          {!isEditing ? (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <Mail size={16} style={{ color: 'var(--primary)' }} />
                <div style={{ overflow: 'hidden' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Email Address</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 500, wordBreak: 'break-all' }}>{profile.email}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <Phone size={16} style={{ color: 'var(--secondary)' }} />
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Phone Number</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{profile.phone}</span>
                </div>
              </div>

              <button 
                className="action-btn" 
                onClick={handleStartEdit}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--primary)', marginTop: '8px' }}
              >
                <Edit2 size={14} />
                Edit Profile Info
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>Choose Profile Picture</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  {avatarPresets.map((avatarUrl, idx) => {
                    const isSelected = formData.avatar === avatarUrl;
                    return (
                      <img 
                        key={idx}
                        src={avatarUrl}
                        alt={`Preset ${idx + 1}`}
                        onClick={() => setFormData(prev => ({ ...prev, avatar: avatarUrl }))}
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          cursor: 'pointer',
                          border: isSelected ? '3.5px solid var(--primary)' : '2px solid transparent',
                          padding: isSelected ? '1px' : '0',
                          transition: 'all 0.15s'
                        }}
                      />
                    );
                  })}
                </div>
                
                <input 
                  type="text" 
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  placeholder="Or paste custom image URL..."
                  className="search-input"
                  style={{ width: '100%', height: '36px', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="search-input"
                  style={{ width: '100%', height: '40px', padding: '8px 12px', borderRadius: '8px', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Login Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="search-input"
                  style={{ width: '100%', height: '40px', padding: '8px 12px', borderRadius: '8px', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Phone Number</label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="search-input"
                  style={{ width: '100%', height: '40px', padding: '8px 12px', borderRadius: '8px', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button 
                  type="submit" 
                  className="action-btn"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', background: 'var(--secondary)' }}
                >
                  <Check size={14} />
                  Save
                </button>
                <button 
                  type="button" 
                  className="action-btn btn-secondary"
                  onClick={handleCancel}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                >
                  <X size={14} />
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* DETAILS GRID */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* STATS PANEL */}
          <div style={{ 
            background: 'var(--bg-secondary)', 
            border: '1px solid var(--glass-border)', 
            padding: '28px', 
            borderRadius: '20px',
            boxShadow: 'var(--glass-shadow)'
          }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '20px' }}>Your Travel Statistics</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'rgba(255, 94, 132, 0.1)', color: 'var(--primary)', padding: '8px', borderRadius: '8px' }}>
                  <Briefcase size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Booked Trips</span>
                  <strong style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>{bookingsCount}</strong>
                </div>
              </div>

              <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'rgba(46, 196, 182, 0.1)', color: 'var(--secondary)', padding: '8px', borderRadius: '8px' }}>
                  <Heart size={20} style={{ fill: 'var(--secondary)' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Saved Wishlist</span>
                  <strong style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>{favoritesCount}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* LOYALTY CARD */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(255, 94, 132, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)', 
            border: '1px solid var(--glass-border)', 
            padding: '28px', 
            borderRadius: '20px',
            boxShadow: 'var(--glass-shadow)',
            display: 'flex',
            gap: '20px',
            alignItems: 'flex-start'
          }}>
            <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)', color: '#fff', padding: '12px', borderRadius: '12px' }}>
              <Award size={28} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>Sanchari Rewards Program</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '14px' }}>
                You have accrued **12,500 mock miles**! Redeem miles at checkout for instant cashbacks on premium beach resort suites and airline cabin class upgrades.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.75rem', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', padding: '4px 10px', borderRadius: '8px' }}>Redeem Miles</span>
                <span style={{ fontSize: '0.75rem', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', padding: '4px 10px', borderRadius: '8px' }}>Milestones</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
