import UserForm from "@/components/DetailsForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <UserForm isSignUp={false} />
    </main>
  );
}
