import React, { useState, useEffect } from 'react';
import { Trophy, RefreshCw } from 'lucide-react';
import { ethers } from 'ethers';

import Navbar from './components/Navbar';
import ScoreBoard from './components/ScoreBoard';
import BettingForm from './components/BettingForm';
import AdminPanel from './components/AdminPanel';
import { CONTRACT_ABI } from './constants/abi';

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const [contractAddress, setContractAddress] = useState(
    localStorage.getItem("lastContractAddr") || ""
  );

  const [matchInfo, setMatchInfo] = useState({
    teamA: "Équipe A", 
    teamB: "Équipe B", 
    pot: "0.0",
    coteA: "1.00", 
    coteB: "1.00", 
    coteNul: "1.00", 
    fini: false
  });

  const [choix, setChoix] = useState("1");
  const [montant, setMontant] = useState("");

  const connectWallet = async () => {
    if (!contractAddress) return alert("Collez l'adresse du contrat");
    
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const addr = await signer.getAddress();
        setAccount(addr);

        localStorage.setItem("lastContractAddr", contractAddress);

        const monContrat = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);
        setContract(monContrat);
        
        loadData(monContrat);

      } catch (err: any) {
        console.error(err);
        alert("Erreur : " + err.message);
      }
    } else {
      alert("Installez MetaMask!");
    }
  };

  const loadData = async (contractInstance = contract) => {
    if (!contractInstance) return;
    try {
      const [tA, tB, pot, fini, cA, cB, cN] = await Promise.all([
        contractInstance.teamA(),
        contractInstance.teamB(),
        contractInstance.totalStakes(),
        contractInstance.isFinished(),
        contractInstance.seeOdds(1),
        contractInstance.seeOdds(2),
        contractInstance.seeOdds(3)
      ]);

      setMatchInfo({
        teamA: tA,
        teamB: tB,
        pot: ethers.formatEther(pot),
        coteA: (Number(cA) / 100).toFixed(2),
        coteB: (Number(cB) / 100).toFixed(2),
        coteNul: (Number(cN) / 100).toFixed(2),
        fini: fini
      });
    } catch (err) {
      console.log("Erreur chargement:", err);
    }
  };

  useEffect(() => {
    if (contract) {
      loadData();
      const interval = setInterval(() => loadData(), 5000);
      return () => clearInterval(interval);
    }
  }, [contract]);

  const parier = async () => {
    if (!montant) return;
    try {
      setLoading(true);
      const tx = await contract.bet(choix, { value: ethers.parseEther(montant) });
      await tx.wait();
      alert("Pari validé sur la blockchain!");
      setMontant("");
      loadData();
    } catch (err: any) { 
        alert("Erreur : " + (err.reason || err.message)); 
    } finally { 
        setLoading(false); 
    }
  };

  const declarerFin = async (res: number) => {
    try {
      setLoading(true);
      const tx = await contract.defineResult(res);
      await tx.wait();
      alert("Match terminé!");
      loadData();
    } catch (err: any) { 
        alert("Erreur Admin : " + (err.reason || err.message)); 
    } finally { 
        setLoading(false); 
    }
  };

  const claim = async () => {
    try {
      setLoading(true);
      const tx = await contract.claimGain();
      await tx.wait();
      alert("Gains retirés avec succès!");
    } catch (err: any) { 
        alert("Erreur : " + (err.reason || "Perdu ou déjà retiré")); 
    } finally { 
        setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-cyan-500/30">
      
      <Navbar 
        account={account} 
        connectWallet={connectWallet} 
        contractAddress={contractAddress}
        setContractAddress={setContractAddress}
        isConnected={!!contract}
      />

      <main className="container mx-auto px-4 py-8 pb-20">
        
        {!contract ? (
          <div className="flex flex-col items-center justify-center mt-20 text-slate-500 animate-fade-in-up">
            <Trophy className="w-24 h-24 mb-6 text-slate-700" />
            <h2 className="text-2xl font-bold text-slate-300 mb-2">Bienvenue sur Web3 Betting</h2>
            <p className="text-lg max-w-md text-center">
              Pour commencer, collez l'adresse du Smart Contract déployé dans la barre ci-dessus et connectez votre wallet.
            </p>
          </div>
        ) : (
          <div className="animate-fade-in">
            <ScoreBoard matchInfo={matchInfo} />
            
            <BettingForm 
              matchInfo={matchInfo}
              choix={choix}
              setChoix={setChoix}
              montant={montant}
              setMontant={setMontant}
              loading={loading}
              parier={parier}
              claim={claim}
            />

            <AdminPanel declarerFin={declarerFin} loading={loading} />
          </div>
        )}

      </main>
    </div>
  );
}
export default App;