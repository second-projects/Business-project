export default function MovieCard({
  title,
  posterUrl,
}: {
  title: string;
  posterUrl: string;
}) {
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-md border border-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]">
      <img
        src={posterUrl}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:brightness-75"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
    </div>
  );
}
