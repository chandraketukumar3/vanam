import Link from "next/link";
import Image from "next/image";
import { FiInstagram, FiTwitter, FiYoutube, FiFacebook } from "react-icons/fi";
import { FaLeaf, FaSeedling, FaTree } from "react-icons/fa";
import { RiLeafLine } from "react-icons/ri";

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "FAQ", href: "/faq" },
      { name: "Support", href: "/support" },
      { name: "Climate Action", href: "/climate-action" },
      { name: "Tree Species", href: "/tree-species" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookies", href: "/cookies" },
      { name: "Security", href: "/security" },
    ],
  },
];

const languages = [
  { name: "English", code: "en" },
  { name: "हिन्दी (Hindi)", code: "hi" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-primary/10 to-primary/20 -z-10" />
      
      {/* Leaf decorations */}
      <div className="absolute top-0 left-[10%] text-primary/20 animate-leaf-fall" style={{ animationDelay: '0s' }}>
        <FaLeaf size={24} />
      </div>
      <div className="absolute top-0 left-[25%] text-primary/15 animate-leaf-fall" style={{ animationDelay: '2s' }}>
        <FaLeaf size={18} />
      </div>
      <div className="absolute top-0 left-[60%] text-primary/20 animate-leaf-fall" style={{ animationDelay: '1s' }}>
        <FaLeaf size={20} />
      </div>
      <div className="absolute top-0 left-[80%] text-primary/15 animate-leaf-fall" style={{ animationDelay: '3s' }}>
        <FaLeaf size={16} />
      </div>
      
      {/* Tree silhouettes */}
      <div className="absolute bottom-0 left-0 text-primary/10">
        <FaTree size={80} />
      </div>
      <div className="absolute bottom-0 right-0 text-primary/10">
        <FaTree size={60} />
      </div>
      <div className="absolute bottom-10 left-1/4 text-primary/10">
        <FaSeedling size={40} />
      </div>
      <div className="absolute bottom-5 right-1/4 text-primary/10">
        <FaSeedling size={30} />
      </div>
      
      {/* Main content */}
      <div className="container relative mx-auto px-4 py-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
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
            <p className="mt-4 text-muted-foreground">
              Turn every sapling into a green future with Vanam. Track your trees, earn rewards, and contribute to a greener planet.
            </p>
            
            {/* Social media */}
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                <FiInstagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                <FiTwitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                <FiYoutube className="w-5 h-5" />
                <span className="sr-only">YouTube</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                <FiFacebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
            
            {/* Language selector */}
            <div className="mt-6">
              <label htmlFor="language-selector" className="text-sm font-medium text-foreground">
                Language
              </label>
              <select 
                id="language-selector"
                className="mt-1 block w-full sm:w-auto rounded-md border border-input bg-background/70 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background focus:ring-2 focus:ring-primary/40 focus:ring-offset-2"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title} className="backdrop-blur-sm bg-background/30 p-5 rounded-lg border border-primary/10">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <FaLeaf className="text-primary/70" size={14} />
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* App store links and copyright */}
        <div className="mt-16 pt-8 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <Link href="/download" className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-3 hover:bg-primary/20 transition-colors">
              <Image src="/apple-store.svg" alt="App Store" width={20} height={20} className="w-5 h-5" />
              <span className="text-sm font-medium">App Store</span>
            </Link>
            <Link href="/download" className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-3 hover:bg-primary/20 transition-colors">
              <Image src="/google-play.svg" alt="Google Play" width={20} height={20} className="w-5 h-5" />
              <span className="text-sm font-medium">Google Play</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <FaSeedling className="text-primary" />
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Vanam. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 