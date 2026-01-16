import { AuthForm } from "@/components/shared/auth-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-[-1]">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
             <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
        </div>
        
      <AuthForm />
    </div>
  );
}
