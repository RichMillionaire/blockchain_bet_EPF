// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PariSportif {
    
    address public owner;
    string public teamA;
    string public teamB;
    
    bool public isFinished = false;
    
    enum Result { inProgress, VictoryA, VictoryB, draw }
    Result public finalResult;
    
    uint256 public totalBetsA;
    uint256 public totalBetsB;
    uint256 public totalBetsDraw;
    
    uint256 public totalStakes;

    mapping(address => uint256) public betsA;
    mapping(address => uint256) public betsB;
    mapping(address => uint256) public betsDraw;

    event NewBet(address bettor, uint8 choice, uint256 amount);
    event MatchOver(Result results, uint256 totalStakes);

    // choix du match
    constructor(string memory _teamA, string memory _teamB) {
        owner = msg.sender;
        teamA = _teamA;
        teamB = _teamB;
        finalResult = Result.inProgress;
    }

    function bet(uint8 _choice) external payable {
        require(!isFinished, "Les paris sont fermes!");
        require(msg.value > 0, "La mise doit etre > 0");
        require(_choice >= 1 && _choice <= 3, "Choisissez parmi 1, 2 ou 3");

        if (_choice == 1) {
            betsA[msg.sender] += msg.value;
            totalBetsA += msg.value;
        } else if (_choice == 2) {
            betsB[msg.sender] += msg.value;
            totalBetsB += msg.value;
        } else {
            betsDraw[msg.sender] += msg.value;
            totalBetsDraw += msg.value;
        }

        totalStakes += msg.value;
        emit NewBet(msg.sender, _choice, msg.value);
    }

    // pour enregistrer le resultat
    function defineResult(uint8 _results) external {
        require(msg.sender == owner, "Seul l'admin peut definir le resultat");
        require(!isFinished, "Le match est deja fini");
        require(_results >= 1 && _results <= 3, "Choisissez parmi 1, 2 ou 3");

        // verifier si gagnats != 0 ==>  éviter la division par 0 plus tard
        if (_results == 1) require(totalBetsA > 0, "Aucune mise sur A");
        if (_results == 2) require(totalBetsB > 0, "Aucune mise sur B");
        if (_results == 3) require(totalBetsDraw > 0, "Aucune mise sur Nul");

        if (_results == 1) finalResult = Result.VictoryA;
        else if (_results == 2) finalResult = Result.VictoryB;
        else finalResult = Result.draw;

        isFinished = true;
        emit MatchOver(finalResult, totalStakes);
    }

    // Les gagnants doivent appeler cette fonction pour récupérer argent
    function claimGain() external {
        require(isFinished, "Le match n'est pas fini");
        
        uint256 gainedAmount = 0;
        uint256 winningBet = 0;
        uint256 totalWinnerPool = 0;

        if (finalResult == Result.VictoryA) {
            winningBet = betsA[msg.sender];
            totalWinnerPool = totalBetsA;
            betsA[msg.sender] = 0;
        } else if (finalResult == Result.VictoryB) {
            winningBet = betsB[msg.sender];
            totalWinnerPool = totalBetsB;
            betsB[msg.sender] = 0;
        } else if (finalResult == Result.draw) {
            winningBet = betsDraw[msg.sender];
            totalWinnerPool = totalBetsDraw;
            betsDraw[msg.sender] = 0;
        }

        require(winningBet > 0, "Vous n'avez pas parie sur le bon resultat ou deja retire");

        // formule cours: Gain = (Mise / TotalParisGagnats) * TotalTousLesParis
        gainedAmount = (winningBet * totalStakes) / totalWinnerPool;

        payable(msg.sender).transfer(gainedAmount);
    }
    
    // Fonction bonus pour voir la cote estimée en temps réel (ex: x2.5)
    function seeOdds(uint8 _choice) external view returns (uint256) {
        uint256 targetPool;
        if (_choice == 1) targetPool = totalBetsA;
        else if (_choice == 2) targetPool = totalBetsB;
        else targetPool = totalBetsDraw;
        
        if (targetPool == 0) return 0;
        
        // Formule : Cote = TotalTousLesParis / TotalParisResultat
        return (totalStakes) / targetPool;
    }
}