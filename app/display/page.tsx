import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";

const mockMovies = Array.from({ length: 12 }, (_, i) => ({
  title: `Movie Title ${i + 1}`,
  posterUrl: `https://via.placeholder.com/500x750.png?text=Movie+${i + 1}`,
}));

export default function DisplayPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {mockMovies.map((movie, index) => (
            <MovieCard
              key={index}
              title={movie.title}
              posterUrl={movie.posterUrl}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
