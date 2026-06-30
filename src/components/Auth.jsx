import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Eye, EyeOff, ShieldCheck, Compass, ArrowRight, Sparkles } from 'lucide-react';

const avatarPresets = [
  "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=150&q=80", // Cute Bunny
  "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=150&q=80", // Cute Panda
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80", // Cute Cat
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=150&q=80", // Cute Puppy
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80", // Cute Baby Bear
  "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=150&q=80"  // Cute Penguin
];

export default function Auth({ onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    avatar: avatarPresets[0]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(""); // Clear error on change
  };

  const handleSelectAvatar = (url) => {
    setFormData(prev => ({ ...prev, avatar: url }));
  };

  const handleDemoLogin = () => {
    const demoUser = {
      name: 'Demo Traveler',
      email: 'demo@sancharitravels.com',
      phone: '+91 99999 88888',
      avatar: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=150&q=80'
    };
    onAuthSuccess(demoUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, password, avatar } = formData;

    if (!email || !password) {
      setError("Please fill out all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Load registered users list from localStorage
    const savedUsers = JSON.parse(localStorage.getItem("sanchari_travels_users") || "[]");

    if (isSignUp) {
      if (!name || !phone) {
        setError("Please provide your name and phone number to sign up.");
        return;
      }

      // Check if user already exists
      const userExists = savedUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        setError("An account with this email already exists. Try signing in.");
        return;
      }

      // Register new user
      const newUser = { name, email, phone, password, avatar };
      savedUsers.push(newUser);
      localStorage.setItem("sanchari_travels_users", JSON.stringify(savedUsers));

      // Trigger login success
      onAuthSuccess({ name, email, phone, avatar });
    } else {
      // Find matching user
      // If no users registered yet, support "shivani@gmail.com" as default fallback if matching shivani credentials
      let user = savedUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      
      if (!user && email.toLowerCase() === 'demo@sancharitravels.com' && password === '123456') {
        user = {
          name: 'Demo Traveler',
          email: 'demo@sancharitravels.com',
          phone: '+91 99999 88888',
          avatar: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=150&q=80'
        };
      }

      if (user) {
        onAuthSuccess({
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar
        });
      } else {
        setError("Invalid email or password. Please try again.");
      }
    }
  };

  return (
    <div className="auth-wrapper" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'radial-gradient(circle at top right, rgba(255, 94, 132, 0.12) 0%, transparent 40%), radial-gradient(circle at bottom left, rgba(46, 196, 182, 0.08) 0%, transparent 40%), var(--bg-primary)',
      padding: '40px 24px',
      animation: 'fadeIn 0.5s ease-out'
    }}>
      <div className="auth-card" style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--glass-shadow)',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '480px',
        padding: '40px',
        backdropFilter: 'blur(24px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '12px' }}>
            <Compass size={32} className="logo-pulse" />
            <span style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '1.8rem', 
              fontWeight: 800, 
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>
              Sanchari Travels
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-main)', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
            {isSignUp ? "Create Your Travel Account" : "Welcome Back, Explorer"}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>
            {isSignUp 
              ? "Sign up to track bookings, customize seat views, and unlock gold tiers." 
              : "Sign in to access your Indian terminal itineraries & boarding passes."}
          </p>
        </div>

        {/* Tab Toggle */}
        <div style={{ 
          display: 'flex', 
          background: 'rgba(255, 94, 132, 0.05)', 
          border: '1px solid var(--glass-border)', 
          padding: '4px', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '28px' 
        }}>
          <button 
            type="button"
            onClick={() => { setIsSignUp(false); setError(""); }}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              background: !isSignUp ? 'var(--primary)' : 'transparent',
              color: !isSignUp ? '#fff' : 'var(--text-muted)',
              fontSize: '0.9rem',
              fontWeight: 600,
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Sign In
          </button>
          <button 
            type="button"
            onClick={() => { setIsSignUp(true); setError(""); }}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              background: isSignUp ? 'var(--primary)' : 'transparent',
              color: isSignUp ? '#fff' : 'var(--text-muted)',
              fontSize: '0.9rem',
              fontWeight: 600,
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: 'var(--danger)',
            fontSize: '0.8rem',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '20px',
            lineHeight: '1.4'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {isSignUp && (
            <>
              {/* Full Name */}
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: 500 }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Aditya Sen"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 42px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      color: 'var(--text-main)',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: 500 }}>
                  Phone Number
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 42px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      color: 'var(--text-main)',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                  />
                </div>
              </div>

              {/* Avatar Picker */}
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                  Choose Your Traveler Persona
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginBottom: '8px' }}>
                  {avatarPresets.map((preset, idx) => (
                    <img
                      key={idx}
                      src={preset}
                      alt={`Avatar preset ${idx + 1}`}
                      onClick={() => handleSelectAvatar(preset)}
                      style={{
                        width: '100%',
                        aspectRatio: '1',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border: formData.avatar === preset ? '3px solid var(--primary)' : '2px solid transparent',
                        padding: '2px',
                        background: 'var(--bg-secondary)',
                        transition: 'all 0.2s'
                      }}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Email Address */}
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: 500 }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  color: 'var(--text-main)',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: 500 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 42px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  color: 'var(--text-main)',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="action-btn"
            style={{
              marginTop: '12px',
              padding: '14px',
              borderRadius: '10px',
              background: 'var(--primary)',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(255, 94, 132, 0.3)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--primary)'}
          >
            <span>{isSignUp ? "Register Account" : "Access Console"}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Divider */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          margin: '24px 0', 
          color: 'var(--text-muted)', 
          fontSize: '0.8rem' 
        }}>
          <span style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></span>
          <span style={{ padding: '0 12px' }}>OR QUICK ACCESS</span>
          <span style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></span>
        </div>

        {/* Demo Account Access Button */}
        <button
          type="button"
          onClick={handleDemoLogin}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px dashed var(--primary)',
            background: 'rgba(255, 94, 132, 0.03)',
            color: 'var(--primary)',
            fontSize: '0.9rem',
            fontWeight: 600,
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 94, 132, 0.08)';
            e.currentTarget.style.borderColor = 'var(--primary-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 94, 132, 0.03)';
            e.currentTarget.style.borderColor = 'var(--primary)';
          }}
        >
          <Sparkles size={16} />
          <span>Login with Demo User</span>
        </button>

        {/* Secure SSL footer check */}
        <div style={{ 
          marginTop: '28px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '6px', 
          fontSize: '0.75rem', 
          color: 'var(--text-muted)' 
        }}>
          <ShieldCheck size={14} style={{ color: 'var(--secondary)' }} />
          <span>256-Bit SSL Encrypted Connection</span>
        </div>
      </div>
    </div>
  );
}
