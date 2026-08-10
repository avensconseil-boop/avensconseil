# Avens Conseil — déploiement et mises à jour

Site statique (HTML/CSS/JS). Aucune base de données, aucun build.
Domaine : **avensconseil.com** — Hébergeur : **IONOS**

---

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil |
| `ia.html` | IA & souveraineté (page phare) |
| `services.html` | Expertises |
| `apropos.html` | À propos |
| `contact.html` | Contact |
| `404.html` | Page d'erreur |
| `style.css` | Feuille de style unique |
| `script.js` | Menu mobile, animations, formulaire |
| `favicon.svg` | Icône d'onglet |
| `robots.txt` | Indexation moteurs de recherche |
| `sitemap.xml` | Plan du site |
| `.htaccess` | 404, HTTPS forcé, redirection www, cache |
| `deploy.sh` | Script de déploiement FTP (à ne pas mettre en ligne) |

> Le fichier `.htaccess` commence par un point : il est masqué par défaut.
> macOS : `Cmd + Maj + .` — Windows : Affichage → Éléments masqués.

---

## Option A — GitHub + IONOS Deploy Now (recommandé)

Mise en place une seule fois, puis chaque modification se publie toute seule.

**Installation**
1. Espace IONOS → **Deploy Now** → nouveau projet
2. Lier le compte GitHub, autoriser le dépôt
3. Type **Static site**, branche `main`, aucune commande de build, dossier de publication `/`
4. Onglet **Domains** → rattacher `avensconseil.com` (SSL automatique)

**Mise à jour ensuite**
- Dépôt GitHub → **Add file** → **Upload files** → glisser les fichiers → **Commit changes**
- Le site se met à jour seul en 1 à 2 minutes

---

## Option B — Script FTP (`deploy.sh`)

Pour publier depuis votre machine sans passer par GitHub.

**Prérequis :** `lftp`
- macOS : `brew install lftp`
- Ubuntu/Debian : `sudo apt install lftp`

**Récupérer les identifiants FTP**
Espace IONOS → Hébergement → **FTP, SSH & fichiers Web** → créer ou consulter un accès.
Notez l'hôte (`accessXXXXX.ftp.ionos.fr`), l'utilisateur et le mot de passe.

**Lancer**
```bash
cd /chemin/vers/le/dossier
./deploy.sh
```

Le script affiche d'abord une simulation, puis demande confirmation avant tout envoi.

Pour éviter de retaper les identifiants :
```bash
export IONOS_HOST="accessXXXXX.ftp.ionos.fr"
export IONOS_USER="uXXXXXXXX"
export IONOS_PASS="votre-mot-de-passe"
./deploy.sh
```

> Ne versionnez jamais ces identifiants dans GitHub.

---

## Option C — Sans ligne de commande

Espace IONOS → Hébergement → **Webfiles** → **Ouvrir** → **Upload**
Déposez les fichiers à la racine du webspace.

---

## Vérifications après mise en ligne

- [ ] Les 5 pages s'ouvrent
- [ ] Le menu fonctionne sur mobile
- [ ] Une URL inexistante (`/test`) affiche la page 404
- [ ] Le cadenas HTTPS est présent
- [ ] `www.avensconseil.com` redirige vers `avensconseil.com`
- [ ] Le formulaire ouvre la messagerie et le message arrive sur **contact@avensconseil.com**
- [ ] `avensconseil.com/sitemap.xml` s'affiche

---

## Points restés ouverts

- **Logo** : recréé en SVG, en attente d'un fichier vectoriel définitif
- **Textes** : rédigés en l'état, à valider ou remplacer
- **Formulaire** : ouvre la messagerie du visiteur (`mailto`), sans envoi côté serveur
- **Mentions légales** : page absente, obligatoire pour un site professionnel en France
