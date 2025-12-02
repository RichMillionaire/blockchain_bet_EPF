const BettingForm = ({ 
  matchInfo, 
  choix, 
  setChoix, 
  montant, 
  setMontant, 
  loading, 
  parier, 
  claim 
}: any) => {
  if (matchInfo.fini) {
    return (
      <div className="bg-slate-800/50 p-8 rounded-2xl shadow-lg border-2 border-green-500/30 mt-8 text-center max-w-2xl mx-auto backdrop-blur-sm">
        <div className="inline-block p-4 rounded-full bg-green-500/10 mb-4">
            <Trophy className="w-12 h-12 text-green-400" />
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">Match Terminé</h3>
        <p className="text-slate-400 mb-6">Les résultats sont définitifs. Avez-vous gagné ?</p>
        <button 
          className="w-full py-4 bg-green-500 hover:bg-green-400 text-slate-900 font-bold rounded-xl cursor-pointer shadow-[0_0_20px_rgba(34,197,94,0.4)] disabled:opacity-50 disabled:cursor-not-allowed text-lg transition-all active:scale-95"
          onClick={claim} 
          disabled={loading}
        >
          {loading ? "Traitement..." : "Récupérer les gains hehehe"}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-700 mt-8 max-w-2xl mx-auto">
      <h3 className="text-xl font-bold mb-6 text-slate-200 flex items-center gap-2">
        <span className="w-2 h-8 bg-cyan-500 rounded-full block"></span>
        Placer un pari
      </h3>
      
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <label className="text-sm text-slate-400 font-medium ml-1">Votre Pronostic</label>
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={() => setChoix("1")}
              className={`p-4 rounded-xl border-2 transition-all font-bold ${choix === "1" ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-slate-700 bg-slate-900 text-slate-500 hover:border-slate-600'}`}
            >
              {matchInfo.teamA}
            </button>
            <button 
              onClick={() => setChoix("3")}
              className={`p-4 rounded-xl border-2 transition-all font-bold ${choix === "3" ? 'border-slate-400 bg-slate-400/10 text-slate-200' : 'border-slate-700 bg-slate-900 text-slate-500 hover:border-slate-600'}`}
            >
              Nul
            </button>
            <button 
              onClick={() => setChoix("2")}
              className={`p-4 rounded-xl border-2 transition-all font-bold ${choix === "2" ? 'border-purple-500 bg-purple-500/10 text-purple-400' : 'border-slate-700 bg-slate-900 text-slate-500 hover:border-slate-600'}`}
            >
              {matchInfo.teamB}
            </button>
          </div>
        </div>

        <div className="space-y-2">
           <label className="text-sm text-slate-400 font-medium ml-1">Mise (ETH)</label>
          <div className="relative group">
            <input 
              type="number" 
              placeholder="0.05" 
              value={montant} 
              onChange={(e) => setMontant(e.target.value)} 
              className="w-full p-4 bg-slate-900 border-2 border-slate-700 rounded-xl text-white outline-none focus:border-cyan-500 transition-colors font-mono text-lg" 
            />
            <span className="absolute right-6 top-4 text-slate-500 text-sm font-bold bg-slate-800 px-2 py-1 rounded">ETH</span>
          </div>
        </div>

        <button 
          disabled={loading || !montant} 
          onClick={parier} 
          className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-800 disabled:text-slate-500 text-white font-bold rounded-xl cursor-pointer transition-all shadow-lg active:scale-[0.98]"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin" /> Validation blockchain...
            </span>
          ) : (
            "Valider le Pari"
          )}
        </button>
      </div>
    </div>
  );
};
export default BettingForm;