"use client";

import { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

function PasswordInput({ 
  id, 
  placeholder, 
  value, 
  onChange, 
  required = false,
  minLength,
}: {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <input
      id={id}
      type="password"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      minLength={minLength}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
}

export default function ProfilePage() {
  const { user, updateUserProfile, changePassword, resetPassword } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    bio: user?.bio || ""
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [passwordValidation, setPasswordValidation] = useState({
    isLengthValid: false,
    hasMatch: false,
    isCurrentPasswordFilled: false
  });
  
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    publicProfile: false
  });
  
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user?.avatarUrl || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Update validation state when password fields change
  useEffect(() => {
    setPasswordValidation({
      isLengthValid: passwordData.newPassword.length >= 8,
      hasMatch: passwordData.newPassword === passwordData.confirmPassword && passwordData.newPassword.length > 0,
      isCurrentPasswordFilled: passwordData.currentPassword.length > 0
    });
  }, [passwordData]);

  // Handle profile form input changes
  const handleProfileChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProfileData(prev => ({ ...prev, [id]: value }));
  };
  
  // Handle password form input changes
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let fieldName = id;
    
    // Convert kebab-case to camelCase
    if (id === "current-password") fieldName = "currentPassword";
    else if (id === "new-password") fieldName = "newPassword";
    else if (id === "confirm-password") fieldName = "confirmPassword";
    
    console.log(`Password field changed: ${id} -> ${fieldName}, value: ${value}`);
    
    setPasswordData(prev => ({ ...prev, [fieldName]: value }));
  };
  
  // Handle preference toggles
  const handleToggleChange = (preference: 'emailNotifications' | 'publicProfile') => {
    setPreferences(prev => ({ ...prev, [preference]: !prev[preference] }));
  };
  
  // Handle photo upload
  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);
      setAvatarUrl(objectUrl);
    }
  };
  
  // Handle profile form submission
  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Here you would typically call an API to update the profile
      // For now, we'll simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the user profile in context/state
      if (updateUserProfile) {
        updateUserProfile({
          id: user?.id || "",
          ...user,
          ...profileData,
          avatarUrl: avatarUrl || user?.avatarUrl
        });
      }
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle password form submission
  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("Attempting to change password with current password:", passwordData.currentPassword);
      
      // Call the changePassword function from AuthContext
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      
      toast.success("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error: any) {
      console.error("Failed to update password:", error);
      
      // Show specific error message
      if (error.message === "Current password is incorrect") {
        toast.error("Current password is incorrect. Try using 'password123' or click 'Reset to default password'.");
      } else {
        toast.error(error.message || "Failed to update password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Get border color based on validation state
  const getPasswordFieldClass = (field: 'current' | 'new' | 'confirm') => {
    if (field === 'current') {
      if (!passwordData.currentPassword) return "";
      return passwordValidation.isCurrentPasswordFilled ? "border-green-500 focus-visible:ring-green-500" : "";
    }
    
    if (field === 'new') {
      if (!passwordData.newPassword) return "";
      return passwordValidation.isLengthValid ? "border-green-500 focus-visible:ring-green-500" : "border-red-500 focus-visible:ring-red-500";
    }
    
    if (field === 'confirm') {
      if (!passwordData.confirmPassword) return "";
      return passwordValidation.hasMatch ? "border-green-500 focus-visible:ring-green-500" : "border-red-500 focus-visible:ring-red-500";
    }
    
    return "";
  };
  
  // Handle reset password
  const handleResetPassword = () => {
    resetPassword();
    toast.success("Password reset to default (password123)");
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">My Profile</h1>
      <p className="text-muted-foreground mb-8">
        Manage your personal information and account settings.
      </p>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile details and contact information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSubmit}>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-primary text-4xl overflow-hidden">
                      {avatarUrl ? (
                        <img 
                          src={avatarUrl} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        profileData.name.charAt(0).toUpperCase() || "U"
                      )}
                    </div>
                    <button 
                      type="button"
                      className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary/90"
                      onClick={handlePhotoClick}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </button>
                    <input 
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                  </div>
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    onClick={handlePhotoClick}
                  >
                    Change Photo
                  </Button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={profileData.name}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profileData.email}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        placeholder="Enter your phone number"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        placeholder="City, Country"
                        value={profileData.location}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Tell us about yourself..." 
                      rows={4}
                      value={profileData.bio}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Update your password and account preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <h3 className="font-medium">Change Password</h3>
                <div className="space-y-1 mb-4">
                  <p className="text-sm text-muted-foreground">
                    Default password is <span className="font-mono bg-muted px-1 py-0.5 rounded">password123</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You can reset to the default password using the button below.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <PasswordInput
                      id="current-password"
                      placeholder="Enter your current password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <PasswordInput
                        id="new-password"
                        placeholder="Enter new password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                        minLength={8}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <PasswordInput
                        id="confirm-password"
                        placeholder="Confirm new password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                    <Button 
                      type="submit" 
                      variant="outline"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                    <Button 
                      type="button"
                      variant="link"
                      onClick={handleResetPassword}
                      className="text-muted-foreground text-sm"
                      disabled={isLoading}
                    >
                      Reset to default password
                    </Button>
                  </div>
                </div>
              </form>
              
              <div className="border-t pt-6 space-y-4">
                <h3 className="font-medium">Account Preferences</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates about your tree planting activities</p>
                  </div>
                  <div className="relative" onClick={() => handleToggleChange('emailNotifications')}>
                    <input 
                      type="checkbox" 
                      id="notifications" 
                      className="sr-only" 
                      checked={preferences.emailNotifications}
                      onChange={() => {}}
                    />
                    <div className={`block w-14 h-8 rounded-full transition-colors ${preferences.emailNotifications ? 'bg-primary' : 'bg-muted'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${preferences.emailNotifications ? 'translate-x-6' : ''}`}></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Public Profile</p>
                    <p className="text-sm text-muted-foreground">Allow others to see your tree planting activities</p>
                  </div>
                  <div className="relative" onClick={() => handleToggleChange('publicProfile')}>
                    <input 
                      type="checkbox" 
                      id="public-profile" 
                      className="sr-only" 
                      checked={preferences.publicProfile}
                      onChange={() => {}}
                    />
                    <div className={`block w-14 h-8 rounded-full transition-colors ${preferences.publicProfile ? 'bg-primary' : 'bg-muted'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${preferences.publicProfile ? 'translate-x-6' : ''}`}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 