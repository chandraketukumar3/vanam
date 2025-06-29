"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FiMenu, FiX } from "react-icons/fi";
import { RiPlantLine, RiLeafLine } from "react-icons/ri";
import { useAuth } from "@/contexts/AuthContext";
import UserAccountNav from "@/components/auth/UserAccountNav";
import { AuthModals, AuthModalType } from "@/components/auth/AuthModals";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
];

const dashboardLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Upload & Verify", href: "/dashboard/upload-verify" },
  { name: "Leaderboard", href: "/dashboard/leaderboard" },
  { name: "Tree Health", href: "/dashboard/tree-health" },
  { name: "Rewards", href: "/dashboard/rewards" },
  { name: "Profile", href: "/dashboard/profile" },
];

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [modalType, setModalType] = useState<AuthModalType>(AuthModalType.Login);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [isDashboardMode, setIsDashboardMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    const handleAuthModalEvent = (event: CustomEvent) => {
      const { type, redirect } = event.detail;
      if (type === 'login') {
        setModalType(AuthModalType.Login);
      } else if (type === 'signup') {
        setModalType(AuthModalType.Signup);
      }
      setAuthModalOpen(true);
    };
    
    // Check if we're in dashboard mode
    const checkDashboardMode = () => {
      setIsDashboardMode(document.body.hasAttribute('data-dashboard-mode'));
    };
    
    checkDashboardMode();
    window.addEventListener("scroll", handleScroll);
    document.addEventListener('open-auth-modal', handleAuthModalEvent as EventListener);
    
    // Create a mutation observer to detect dashboard mode changes
    const observer = new MutationObserver(checkDashboardMode);
    observer.observe(document.body, { attributes: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener('open-auth-modal', handleAuthModalEvent as EventListener);
      observer.disconnect();
    };
  }, []);

  const openLoginModal = (redirect?: string) => {
    if (redirect) setRedirectPath(redirect);
    setModalType(AuthModalType.Login);
    setAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setModalType(AuthModalType.Signup);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    // If there was a redirect path and the user is now authenticated, navigate there
    if (redirectPath && isAuthenticated) {
      router.push(redirectPath);
      setRedirectPath(null);
    }
  };

  const handleDashboardClick = () => {
    if (!isAuthenticated) {
      // Open login modal with dashboard as redirect destination
      openLoginModal("/dashboard");
    } else {
      // Navigate directly to dashboard if authenticated
      router.push("/dashboard");
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-primary/20 backdrop-blur-lg border-b border-primary/30 shadow-md"
            : "bg-primary/10 backdrop-blur-md"
        }`}
      >
        {/* Green glow border at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0"></div>
        
        <div className="container mx-auto px-4 py-3 flex items-center justify-between relative">
          {/* Logo with enhanced effect */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 overflow-hidden">
              <div className="absolute inset-0 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Image 
                  src="/vanam-logo.svg" 
                  alt="Vanam Logo" 
                  width={36} 
                  height={36}
                  className="transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3">
                <RiLeafLine className="text-primary/70 animate-bounce" />
              </div>
            </div>
            <span className="font-bold text-2xl text-primary group-hover:text-primary/90 transition-colors duration-300">Vanam</span>
          </Link>

          {/* Desktop navigation with glass effect */}
          <nav className="hidden md:flex items-center space-x-1">
            {isDashboardMode ? (
              // Dashboard navigation links
              dashboardLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    pathname === link.href 
                      ? "text-primary border-b-2 border-primary" 
                      : "hover:text-primary hover:bg-primary/10 rounded-md"
                  }`}
                >
                  {link.name}
                </Link>
              ))
            ) : (
              // Regular navigation links
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
                
                <button
                  onClick={handleDashboardClick}
                  className="px-3 py-2 text-sm font-medium rounded-md text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  Dashboard
                </button>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && user ? (
              <UserAccountNav user={user} />
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => openLoginModal()}
                  className="border-primary/30 hover:border-primary hover:bg-primary/5"
                >
                  Log In
                </Button>
                <Button 
                  size="sm" 
                  onClick={openSignupModal}
                  className="bg-primary hover:bg-primary/90 shadow-sm"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Menu"
                className="hover:bg-primary/10"
              >
                <FiMenu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-10 bg-background/95 backdrop-blur-lg border-l border-primary/20">
              {/* Mobile logo */}
              <div className="flex items-center gap-2 mb-8 px-4">
                <div className="relative w-8 h-8 overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image 
                      src="/vanam-logo.svg" 
                      alt="Vanam Logo" 
                      width={28} 
                      height={28}
                    />
                  </div>
                </div>
                <span className="font-bold text-xl text-primary">Vanam</span>
              </div>
              
              <nav className="flex flex-col gap-4 mt-8">
                {isDashboardMode ? (
                  // Dashboard navigation links for mobile
                  dashboardLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`px-3 py-2 text-base font-medium transition-all duration-200 ${
                        pathname === link.href 
                          ? "text-primary bg-primary/10 rounded-md" 
                          : "hover:bg-primary/5 hover:text-primary rounded-md"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))
                ) : (
                  // Regular navigation links for mobile
                  <>
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="px-3 py-2 text-base font-medium rounded-md hover:bg-primary/5 hover:text-primary transition-all duration-200"
                      >
                        {link.name}
                      </Link>
                    ))}
                    
                    <button
                      onClick={handleDashboardClick}
                      className="px-3 py-2 text-base font-medium rounded-md text-primary hover:bg-primary/5 transition-all duration-200 text-left"
                    >
                      Dashboard
                    </button>
                  </>
                )}
                
                <div className="flex flex-col gap-2 mt-4">
                  {isAuthenticated && user ? (
                    <div className="flex items-center justify-between px-3 py-2 bg-primary/5 rounded-md">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          const { logout } = useAuth();
                          logout();
                        }}
                        className="border-primary/30 hover:border-primary"
                      >
                        Log Out
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full border-primary/30 hover:border-primary hover:bg-primary/5"
                        onClick={() => openLoginModal()}
                      >
                        Log In
                      </Button>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={openSignupModal}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <AuthModals
        isOpen={authModalOpen}
        modalType={modalType}
        onClose={closeAuthModal}
      />
    </>
  );
}