"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export enum AuthModalType {
  None,
  Login,
  Signup
}

export function AuthModals({
  isOpen,
  modalType,
  onClose
}: {
  isOpen: boolean;
  modalType: AuthModalType;
  onClose: () => void;
}) {
  const [currentModalType, setCurrentModalType] = useState<AuthModalType>(AuthModalType.Login);

  // When modalType prop changes, update the internal state
  if (isOpen && modalType !== currentModalType) {
    setCurrentModalType(modalType);
  }

  const handleSuccess = () => {
    onClose();
  };

  const switchToLogin = () => {
    setCurrentModalType(AuthModalType.Login);
  };

  const switchToSignup = () => {
    setCurrentModalType(AuthModalType.Signup);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="sr-only">
          {currentModalType === AuthModalType.Login ? "Login" : "Sign Up"}
        </DialogTitle>
        {currentModalType === AuthModalType.Login ? (
          <LoginForm onSuccess={handleSuccess} onSignupClick={switchToSignup} />
        ) : (
          <SignupForm onSuccess={handleSuccess} onLoginClick={switchToLogin} />
        )}
      </DialogContent>
    </Dialog>
  );
}

// Also export as default for backward compatibility
export default AuthModals; 