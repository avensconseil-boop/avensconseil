#!/usr/bin/env bash
# =====================================================================
#  Avens Conseil — déploiement du site vers l'espace web IONOS
#  Usage :  ./deploy.sh
#  Prérequis : lftp  (macOS : brew install lftp | Debian/Ubuntu : sudo apt install lftp)
# =====================================================================

set -euo pipefail

# --- Dossier contenant les fichiers du site (par défaut : dossier du script) ---
LOCAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# --- Paramètres IONOS -------------------------------------------------
# Renseignez-les ici, ou exportez-les avant de lancer le script :
#   export IONOS_HOST="accessXXXXX.ftp.ionos.fr"
#   export IONOS_USER="uXXXXXXXX"
#   export IONOS_PASS="votre-mot-de-passe-ftp"
IONOS_HOST="${IONOS_HOST:-}"
IONOS_USER="${IONOS_USER:-}"
IONOS_PASS="${IONOS_PASS:-}"

# Dossier cible sur le serveur (racine du site).
# Chez IONOS c'est souvent "/" ; parfois un sous-dossier lié au domaine.
REMOTE_DIR="${IONOS_REMOTE_DIR:-/}"

# ---------------------------------------------------------------------

if ! command -v lftp >/dev/null 2>&1; then
  echo "Erreur : lftp n'est pas installé."
  echo "  macOS   : brew install lftp"
  echo "  Ubuntu  : sudo apt install lftp"
  exit 1
fi

# Demander les identifiants manquants sans les afficher à l'écran
[ -z "$IONOS_HOST" ] && read -r -p "Hôte FTP IONOS : " IONOS_HOST
[ -z "$IONOS_USER" ] && read -r -p "Utilisateur FTP : " IONOS_USER
if [ -z "$IONOS_PASS" ]; then
  read -r -s -p "Mot de passe FTP : " IONOS_PASS
  echo
fi

echo
echo "Source      : $LOCAL_DIR"
echo "Destination : $IONOS_HOST$REMOTE_DIR"
echo

# Aperçu : liste ce qui serait transféré, sans rien envoyer
echo "--- Simulation (aucun fichier n'est encore envoyé) ---"
lftp -u "$IONOS_USER","$IONOS_PASS" "ftps://$IONOS_HOST" <<EOF
set ftp:ssl-force true
set ssl:verify-certificate true
mirror --reverse --dry-run --verbose \
       --exclude-glob deploy.sh \
       --exclude-glob .git/ \
       --exclude-glob .DS_Store \
       "$LOCAL_DIR" "$REMOTE_DIR"
bye
EOF

echo
read -r -p "Confirmer l'envoi vers le serveur ? (o/N) " CONFIRM
if [[ ! "$CONFIRM" =~ ^[oO]$ ]]; then
  echo "Annulé. Aucun fichier n'a été modifié."
  exit 0
fi

echo
echo "--- Transfert en cours ---"
lftp -u "$IONOS_USER","$IONOS_PASS" "ftps://$IONOS_HOST" <<EOF
set ftp:ssl-force true
set ssl:verify-certificate true
mirror --reverse --verbose --parallel=4 \
       --exclude-glob deploy.sh \
       --exclude-glob .git/ \
       --exclude-glob .DS_Store \
       "$LOCAL_DIR" "$REMOTE_DIR"
bye
EOF

echo
echo "Terminé. Vérifiez https://avensconseil.com"
