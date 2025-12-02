const AdminPanel = ({ declarerFin, loading }: any) => {
  return (
    <div className="mt-16 pt-8 border-t border-slate-800/50 text-center max-w-xl mx-auto">
      <p className="text-xs text-slate-600 mb-4 tracking-widest font-bold uppercase">Panel Admin</p>
      <div className="flex justify-center gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800 inline-flex">
        <button disabled={loading} onClick={() => declarerFin(1)} className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-xs font-bold transition-colors">Victoire A</button>
        <button disabled={loading} onClick={() => declarerFin(3)} className="px-4 py-2 bg-slate-500/10 hover:bg-slate-500/20 text-slate-400 border border-slate-500/20 rounded-lg text-xs font-bold transition-colors">Match Nul</button>
        <button disabled={loading} onClick={() => declarerFin(2)} className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/20 rounded-lg text-xs font-bold transition-colors">Victoire B</button>
      </div>
    </div>
  );
}
export default AdminPanel;