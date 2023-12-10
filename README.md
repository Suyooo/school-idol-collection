# school-idol-collection

## Environment Variables

### Database Connection

Uses `mariadb`. Required for both dev (loaded from `.env` in root folder) and build (not loaded automatically).

- Either `DB_HOST` (hostname or IP address, optionally `DB_PORT` if not default 3306) or `DB_SOCKET` (absolute path to unix socket)
- `DB_USER`
- `DB_PASSWORD`
- `DB_DATABASE`
