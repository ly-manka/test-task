import Link from "next/link";

export default function Home() {
  return (
    <div className="App">
      <div className="min-h-dvh flex gap-6 flex-col justify-center items-center">
        <h1 className="text-3xl">Hi there!</h1>

        <p className="text-2xl">
          Welcome to check out my test task:{" "}
          <Link
            href="/recipes"
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
              border-2 border-gradient-to-r border-pink-500 
              px-2 py-1 rounded-md transition-all duration-300
              hover:shadow-glow"
          >
            Yummy Recipes
          </Link>
        </p>
      </div>
    </div>
  );
}
