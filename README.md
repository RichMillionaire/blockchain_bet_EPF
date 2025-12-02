# ⚽ Web3 Betting DApp

Bienvenue sur **Web3 Betting**, une application décentralisée (DApp) permettant de parier de l'Ether (ETH) sur des résultats de matchs sportifs via la Blockchain Ethereum.

Ce projet combine un **Smart Contract Solidity** pour la logique de jeu sécurisée et un **Frontend React** (non fini dû à quelques soucis MetaMask) moderne pour l'interface utilisateur.

PS: Concernant le Frontend, vous avez la possibilité de l'essayer en vous connectant avec le wallet du owner. Tou autre wallet est impossible pour le moment. Pb que sur le Front!! 

## 🚀 Fonctionnalités

### Côté Utilisateur (Parieur)

* **Connexion Wallet :** Connexion via MetaMask ou tout navigateur Web3.

* **Tableau de bord :** Affichage en temps réel des équipes, du pot total et des cotes dynamiques.

* **Pari :** Possibilité de parier de l'ETH sur l'Équipe A, l'Équipe B ou un Match Nul.

* **Retrait des gains :** Si le pari est gagnant, l'utilisateur peut réclamer sa part du pot via le bouton "Récupérer mes gains".

### Côté Administrateur

* **Gestion du match :** L'administrateur (le déployeur du contrat) peut déclarer le résultat final du match.

* **Fin du jeu :** Bloque les paris une fois le résultat déclaré.

## 🛠 Stack Technique

### Frontend

* **Framework :** [React](https://react.dev/) + [Vite](https://vitejs.dev/) (TypeScript)

* **Styling :** [Tailwind CSS](https://tailwindcss.com/)

* **Blockchain Interaction :** [Ethers.js v6](https://docs.ethers.org/v6/)

* **Icônes :** [Lucide React](https://lucide.dev/)

### Smart Contract (Blockchain)

* **Langage :** Solidity

* **Réseau :** Ethereum (Mainnet, Sepolia, ou Localhost avec Hardhat/Anvil)

## 📦 Installation et Démarrage

### 1. Pré-requis

* [Node.js](https://nodejs.org/) (v16 ou supérieur)

* Une extension de portefeuille comme [MetaMask](https://metamask.io/) installée sur votre navigateur.

### 2. Installation du Frontend

Clonez le projet et installez les dépendances :

```bash
git clone https://github.com/votre-utilisateur/web3-betting.git
cd web3-betting
bun install
```

### 3. Lancer l'application

Pour démarrer le serveur de développement local :

```bash
bun run dev
```

Ouvrez votre navigateur sur `http://localhost:5173`.

## 🔗 Comment utiliser l'application

### Étape 1 : Déploiement du Smart Contract

*Note : Le code source du contrat Solidity (`.sol`) doit être déployé au préalable (via Remix, Hardhat ou Foundry).*

Les fonctions clés du contrat attendues par le frontend sont :

* `bet(uint8 _choice)` : `payable`

* `defineResult(uint8 _results)`

* `claimGain()`

* `seeOdds(uint8 _choice)`

* `isFinished()`

### Étape 2 : Configuration dans le Frontend

1. Une fois le contrat déployé, copiez son adresse (ex: `0x123...abc`).

2. Lancez l'application React.

3. Collez l'adresse dans la barre de navigation en haut ("Adresse contrat").

4. Cliquez sur **Connecter Wallet**.

### Étape 3 : Parier

1. Choisissez une issue (Victoire A, Nul, Victoire B).

2. Entrez un montant en ETH (ex: `0.01`).

3. Validez la transaction via MetaMask.

4. *Observez les cotes changer dynamiquement en fonction des mises !*

### Étape 4 : Fin du match (Admin)

1. Connectez-vous avec le wallet qui a déployé le contrat.

2. Dans la zone "ADMIN" en bas de page, cliquez sur le bouton correspondant au résultat réel.

3. Le match est clos.

### Étape 5 : Retrait

Les gagnants verront un bouton **"Récupérer mes gains"** apparaître.

## 📂 Structure du Projet

```text
├── contracts/
│   ├── 1_Storage.sol #Exemple de contrat de stockage simple
│   ├── 2_Owner.sol #Gestion des permissions propriétaire
│   ├── 3_Ballot.sol #Logique de vote
│   └── PariSportif.sol # Smart Contract principal de l'application
├──frontend/
│   ├── src/
│   │   ├── assets/      # Images et ressources statiques
│   │   ├── components/  # Composants React réutilisables
│   │   │   ├── Navbar.tsx       # Barre de navigation et connexion Wallet
│   │   │   ├── ScoreBoard.tsx   # Affichage du score, du pot et des cotes
│   │   │   ├── BettingForm.tsx  # Formulaire de pari et bouton de claim
│   │   │   └── AdminPanel.tsx   # Boutons réservés à l'admin
│   │   ├── constants/   # Données constantes
│   │   │   └── abi.tsx          # L'interface binaire (ABI) du contrat
│   │   ├── App.css      # Styles spécifiques à l'App
│   │   ├── App.tsx      # Logique principale et assemblage
│   │   ├── index.css    # Styles globaux (Tailwind imports)
│   │   └── main.tsx     # Point d'entrée de l'application React
│   ├── index.html       # Fichier HTML racine
│   ├── package.json     # Dépendances et scripts NPM
│   ├── tsconfig.json    # Configuration TypeScript
│   └── vite.config.ts   # Configuration du bundler Vite
├── scripts/             # Scripts d'automatisation/déploiement
├── tests/               # Tests unitaires et d'intégration
├── .prettierrc.json     # Configuration du formateur de code
├── README.md            # Documentation du projet (ce fichier)
└── remix.config.json    # Configuration pour l'IDE Remix
```
🧪 ## Concernant le smart contract

Vous pouvez le tester sur **Remix IDE** pour vérifier la logique avant d'utiliser le frontend.

### Etape 1: Compliler
Allez dans l'onglet "Solidity Compiler" et cliquez sur le bouton bleu **Compile**. Assurez-vous qu'il n'y a pas d'erreurs (check vert).

### Etape 2: Deployer en choisisant les équipes
1. Allez dans l'onglet "Deploy & Run Transactions".

2. Remplissez les noms des équipes dans le constructeur (si demandé) ou cliquez simplement sur Deploy.

3. Note : Vérifiez que vous êtes sur le bon compte (Account).

### Etape 3: Parier dans bet (rouge) en choisissant le numéro de l'équipe
Dans la section "Deployed Contracts", ouvrez votre contrat.
1. Entrez un montant d'Ether dans la case **Value** (en haut, ex: `1` Ether).
2. Cherchez la fonction `bet` (bouton rouge).
3. Entrez le numéro de votre choix :
    `1` = Équipe 1
    `2` = Équipe 2
    `3` = Match nul
4. Cliquez sur **transac**

NB : Pour tester le système de cotes, changez de compte (Account) dans Remix et pariez avec plusieurs wallets différents sur des équipes différentes.

### Etape 4 : Déclarer le résultat et récupérer les gains

Une fois les paris terminés :

1. Reprenez le compte **Owner** (celui qui a déployé le contrat).
2. Appelez la fonction `defineResult` (bouton orange) en entrant le chiffre gagnant (`1`, `2` ou `3`).
3.Reprenez maintenant un compte **Gagnant** (un wallet qui a parié sur le bon résultat).
4. Appelez la fonction `claimGain` (bouton orange).
5. Regardez la balance de votre compte augmenter ! 🤑