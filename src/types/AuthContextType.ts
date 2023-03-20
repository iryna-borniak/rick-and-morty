export interface AuthContextType {
  user: any;
  handleGoogleLogin?: () => void;
  handleFacebookLogin?: () => void;
  handleLogout?: () => void;
  loggingIn: boolean;
}
