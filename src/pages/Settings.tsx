import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Palette, Bell, Shield, Home, Save, Camera, 
  Moon, Sun, Sparkles, Check, ArrowLeft, Volume2, VolumeX
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NeuralBackground } from '@/components/NeuralBackground';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const themes = [
  { id: 'default', name: 'Cyber Dark', color: 'hsl(185 100% 50%)' },
  { id: 'cyber', name: 'Cyber', color: 'hsl(185 100% 50%)' },
  { id: 'neon', name: 'Neon Pink', color: 'hsl(320 100% 60%)' },
  { id: 'glass', name: 'Glass', color: 'hsl(200 100% 60%)' },
  { id: 'ocean', name: 'Ocean', color: 'hsl(180 100% 45%)' },
];

const Settings = () => {
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
  });
  const [currentTheme, setCurrentTheme] = useState('default');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    goals: true,
    wellness: true,
    weekly: true,
  });
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Update form when profile loads
  useState(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        username: profile.username || '',
      });
    }
  });

  const handleSaveProfile = async () => {
    try {
      await updateProfile.mutateAsync(formData);
      toast({
        title: 'Profile updated',
        description: 'Your profile has been saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile.',
        variant: 'destructive',
      });
    }
  };

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    document.documentElement.className = themeId === 'default' ? '' : `theme-${themeId}`;
    localStorage.setItem('mindmesh-theme', themeId);
    toast({
      title: 'Theme updated',
      description: `Switched to ${themes.find(t => t.id === themeId)?.name} theme.`,
    });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <NeuralBackground />
      
      <div className="relative max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link 
            to="/dashboard" 
            className="p-2 rounded-lg glass-card hover:bg-primary/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold gradient-text">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-4 rounded-xl h-fit"
          >
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 glass-card p-6 rounded-xl"
          >
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-border">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-bold text-primary-foreground">
                      {(profile?.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
                    </div>
                    <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-semibold text-foreground">
                      {profile?.full_name || 'Your Name'}
                    </h2>
                    <p className="text-muted-foreground">{user?.email}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      placeholder="Choose a username"
                      className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border text-muted-foreground cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                </div>

                <button 
                  onClick={handleSaveProfile}
                  disabled={updateProfile.isPending}
                  className="btn-cyber flex items-center gap-2"
                >
                  <Save className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">
                    {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
                  </span>
                </button>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                    Theme
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => handleThemeChange(theme.id)}
                        className={`relative p-4 rounded-xl border-2 transition-all ${
                          currentTheme === theme.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div 
                          className="w-full h-12 rounded-lg mb-3"
                          style={{ background: theme.color }}
                        />
                        <p className="text-sm font-medium text-foreground">{theme.name}</p>
                        {currentTheme === theme.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                    Voice AI
                  </h3>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      {voiceEnabled ? (
                        <Volume2 className="w-5 h-5 text-primary" />
                      ) : (
                        <VolumeX className="w-5 h-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-medium text-foreground">Voice Guide</p>
                        <p className="text-sm text-muted-foreground">Enable AI voice assistant</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setVoiceEnabled(!voiceEnabled)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        voiceEnabled ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <div 
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          voiceEnabled ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                  Notification Preferences
                </h3>
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications' },
                  { key: 'goals', label: 'Goal Reminders', desc: 'Get reminded about your goals' },
                  { key: 'wellness', label: 'Wellness Check-ins', desc: 'Daily wellness reminders' },
                  { key: 'weekly', label: 'Weekly Summary', desc: 'Receive weekly progress reports' },
                ].map((item) => (
                  <div 
                    key={item.key}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications({ 
                        ...notifications, 
                        [item.key]: !notifications[item.key as keyof typeof notifications] 
                      })}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications] ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <div 
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          notifications[item.key as keyof typeof notifications] ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                  Privacy & Security
                </h3>
                
                <div className="p-4 rounded-lg bg-muted/30">
                  <h4 className="font-medium text-foreground mb-2">Data Usage</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your cognitive data is encrypted and used only to improve your experience. 
                    We never sell your personal information.
                  </p>
                  <button className="btn-glass text-sm">
                    Download My Data
                  </button>
                </div>

                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <h4 className="font-medium text-destructive mb-2">Danger Zone</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Once you delete your account, there is no going back.
                  </p>
                  <button className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors text-sm font-medium">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Home Button */}
        <Link
          to="/"
          className="fixed bottom-6 left-6 p-4 rounded-full glass-card hover:bg-primary/10 transition-colors z-50"
        >
          <Home className="w-6 h-6 text-primary" />
        </Link>
      </div>
    </div>
  );
};

export default Settings;
