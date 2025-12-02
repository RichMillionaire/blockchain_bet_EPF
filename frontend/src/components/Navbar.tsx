import { Trophy, Wallet, ShieldCheck, UserCircle } from 'lucide-react';
const Navbar = ({ 
  account, 
  connectWallet, 
  contractAddress, 
  setContractAddress, 
  isConnected 
}: any) => {
  return (
    <nav className="w-full flex flex-col md:flex-row justify-between items-center p-6 border-b border-slate-800 max-w-6xl mx-auto bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        <Trophy className="text-cyan-400 w-6 h-6" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Web3 Betting
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center">
        {!isConnected && (
          <input 
            type="text" 
            placeholder="Adresse contrat (0x...)" 
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-sm w-full md:w-80 focus:border-cyan-500 outline-none text-slate-200 transition-all focus:ring-2 focus:ring-cyan-500/20"
          />
        )}
        
        {!account ? (
          <button 
            onClick={connectWallet}
            className="flex items-center gap-2 px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all transform hover:scale-105"
          >
            <Wallet className="w-4 h-4" />
            Connecter Wallet
          </button>
        ) : (
          <div className='flex items-center gap-3'>
             <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-800 border border-slate-700 rounded-full">
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
              <span className="text-xs font-mono text-cyan-400">
                {contractAddress.substring(0,6)}...{contractAddress.substring(38)}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-green-900/20 border border-green-500/30 rounded-full">
              <UserCircle className="w-3 h-3 text-green-400" />
              <span className="text-xs font-mono text-green-400">
                {account.substring(0,6)}...{account.substring(38)}
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;