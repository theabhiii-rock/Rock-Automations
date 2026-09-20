#!/usr/bin/env bash
# ==============================================================================
# ROCK AUTOMATIONS — 1-CLICK PRODUCTION VPS DEPLOYMENT SCRIPT (UBUNTU 22.04 / 24.04)
# ==============================================================================
set -euo pipefail

DOMAIN="${1:-rockautomations.com}"
APP_DIR="/var/www/rock-automations"

echo "=========================================================="
echo " Starting Production Deployment for: ${DOMAIN}"
echo "=========================================================="

# 1. Update and install base prerequisites
echo "[1/7] Updating system packages..."
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install -y curl wget git ufw nginx certbot python3-certbot-nginx

# 2. Install Node.js 22 LTS
echo "[2/7] Installing Node.js 22 LTS..."
if ! command -v node &> /dev/null || [[ $(node -v | cut -d'.' -f1 | tr -d 'v') -lt 22 ]]; then
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# 3. Install PM2 globally
echo "[3/7] Installing PM2 process manager..."
sudo npm install -g pm2

# 4. Prepare App Directory
echo "[4/7] Setting up application directory..."
sudo mkdir -p "${APP_DIR}"
sudo chown -R $USER:$USER "${APP_DIR}"

# 5. Build and install Next.js app
echo "[5/7] Installing dependencies and building production assets..."
cd "${APP_DIR}"

if [ ! -f "package.json" ]; then
    echo "ERROR: Please copy or git clone the rock-automations code into ${APP_DIR} before running build!"
    exit 1
fi

npm install --legacy-peer-deps
npm run build

# 6. Configure PM2 System Service
echo "[6/7] Starting application with PM2..."
pm2 delete rock-automations || true
pm2 start ecosystem.config.js
pm2 save
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp /home/$USER || true

# 7. Configure Nginx Reverse Proxy
echo "[7/7] Configuring Nginx reverse proxy..."
sudo cp nginx/rockautomations.conf /etc/nginx/sites-available/rockautomations.conf

# Replace placeholder domain with actual domain if different
if [ "${DOMAIN}" != "rockautomations.com" ]; then
    sudo sed -i "s/rockautomations.com/${DOMAIN}/g" /etc/nginx/sites-available/rockautomations.conf
fi

sudo ln -sf /etc/nginx/sites-available/rockautomations.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

# 8. Firewall Configuration
echo "Configuring UFW Firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# 9. Setup Daily DB Backup Cron Job
chmod +x scripts/backup_db.sh
(crontab -l 2>/dev/null | grep -v "backup_db.sh" ; echo "0 2 * * * ${APP_DIR}/scripts/backup_db.sh >> /var/log/rock_backup.log 2>&1") | crontab -

echo "=========================================================="
echo " APPLICATION SUCCESSFULLY DEPLOYED!"
echo " Next step for Free SSL (HTTPS):"
echo " Run:"
echo " sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
echo "=========================================================="
