export default function TiendaLoading() {
  return (
    <div className="min-h-screen bg-surface animate-pulse">
      <div className="bg-brand h-48 w-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-divider h-80 border-r border-divider" />
        ))}
      </div>
    </div>
  )
}
