import { Button } from '@/components/ui/button';
import { GoogleIcon, AppleIcon, FacebookIcon } from '@/components/icons';

export function SocialLogins() {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline" type="button">
          <GoogleIcon className="h-5 w-5" />
          <span className="sr-only">Google</span>
        </Button>
        <Button variant="outline" type="button">
          <AppleIcon className="h-5 w-5" />
          <span className="sr-only">Apple</span>
        </Button>
        <Button variant="outline" type="button">
          <FacebookIcon className="h-5 w-5" />
          <span className="sr-only">Facebook</span>
        </Button>
      </div>
    </>
  );
}
