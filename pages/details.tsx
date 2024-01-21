import UserForm from "@/components/DetailsForm";
import "./details_styles.css"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <UserForm isSignUp={false} />
    </main>
  );
}
