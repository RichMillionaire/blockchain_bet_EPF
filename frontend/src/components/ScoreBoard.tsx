const ScoreBoard = ({ matchInfo }: any) => {
  return (
    <div className="bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 relative overflow-hidden text-center max-w-2xl mx-auto transform hover:border-slate-600 transition-all">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"></div>
      
      <div className="p-8">
        <div className="flex justify-between items-center gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-black text-white mb-1">{matchInfo.teamA}</h1>
            <span className="text-cyan-400 font-mono text-sm">Domicile</span>
          </div>
          <div className="flex flex-col items-center px-4">
            <span className="text-3xl italic text-slate-600 font-serif font-black">VS</span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-black text-white mb-1">{matchInfo.teamB}</h1>
            <span className="text-purple-400 font-mono text-sm">Extérieur</span>
          </div>
        </div>
        
        <div className="bg-slate-900/60 rounded-2xl p-6 mb-8 border border-slate-800/50 backdrop-blur-sm">
          <p className="text-slate-400 uppercase text-xs tracking-[0.2em] mb-2 font-semibold">Pot Total Engagé</p>
          <p className="text-4xl md:text-5xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">
            {matchInfo.pot} <span className="text-xl text-green-600">ETH</span>
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-px bg-slate-700 rounded-xl overflow-hidden border border-slate-700">
          <div className="bg-slate-800/80 p-4 hover:bg-slate-800 transition-colors">
            <span className="block text-xs text-slate-400 mb-1 font-medium">{matchInfo.teamA}</span>
            <strong className="text-2xl text-cyan-300">x{matchInfo.coteA}</strong>
          </div>
          <div className="bg-slate-800/80 p-4 hover:bg-slate-800 transition-colors">
            <span className="block text-xs text-slate-400 mb-1 font-medium">Nul</span>
            <strong className="text-2xl text-slate-200">x{matchInfo.coteNul}</strong>
          </div>
          <div className="bg-slate-800/80 p-4 hover:bg-slate-800 transition-colors">
            <span className="block text-xs text-slate-400 mb-1 font-medium">{matchInfo.teamB}</span>
            <strong className="text-2xl text-purple-300">x{matchInfo.coteB}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ScoreBoard;