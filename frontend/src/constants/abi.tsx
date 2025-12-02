//App Binary Interface
export const CONTRACT_ABI = [
  "function bet(uint8 _choice) external payable",
  "function defineResult(uint8 _results) external",
  "function claimGain() external",
  "function teamA() view returns (string)",
  "function teamB() view returns (string)",
  "function totalStakes() view returns (uint256)",
  "function seeOdds(uint8 _choice) view returns (uint256)",
  "function isFinished() view returns (bool)",
  "function owner() view returns (address)"
]