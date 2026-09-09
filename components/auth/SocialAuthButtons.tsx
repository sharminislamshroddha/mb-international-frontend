import FacebookLoginButton from "./FacebookLoginButton";
import GoogleLoginButton from "./GoogleLoginButton";

interface Props {
  onSuccess: () => void;
}

export default function SocialAuthButtons({ onSuccess }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <GoogleLoginButton onSuccess={onSuccess} />
      <FacebookLoginButton onSuccess={onSuccess} />

      <div className="my-1 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">OR</span>
        <div className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}
