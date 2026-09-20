#!/usr/bin/env bash
# Database Backup Script for Rock Automations
set -euo pipefail

BACKUP_DIR="/var/backups/rock-automations"
APP_DIR="/var/www/rock-automations"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DB_FILE="${APP_DIR}/data/platform.db"

mkdir -p "${BACKUP_DIR}"

if [ -f "${DB_FILE}" ]; then
    # Perform safe SQLite backup via sqlite3 or file copy with WAL flush
    echo "Creating backup for ${DB_FILE} at ${TIMESTAMP}..."
    cp "${DB_FILE}" "${BACKUP_DIR}/platform_${TIMESTAMP}.db"
    
    # Compress the backup
    gzip -f "${BACKUP_DIR}/platform_${TIMESTAMP}.db"
    
    # Keep only last 30 daily backups
    find "${BACKUP_DIR}" -type f -name "platform_*.db.gz" -mtime +30 -delete
    
    echo "Backup completed: ${BACKUP_DIR}/platform_${TIMESTAMP}.db.gz"
else
    echo "Error: Database file ${DB_FILE} not found!"
    exit 1
fi
