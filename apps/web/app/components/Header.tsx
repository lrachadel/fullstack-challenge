export default function Header() {
  return (
    <header className="bg-jj-red text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-jj-red font-bold text-lg">J&J</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Johnson & Johnson</h1>
              <p className="text-sm text-white/80">Portal de Funcionários</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
