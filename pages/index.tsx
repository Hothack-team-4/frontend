import UserForm from "@/components/UserForm";
import "./home_styles.css";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1>Welcome to</h1>
        <h2 id="fantasia">Fantasia</h2>
      <UserForm isSignUp={false} />
    </main>
  );
}
