#!/bin/sh
# generate runtime env file for the SPA
cat > /usr/share/nginx/html/env-config.js <<EOF
window._env_ = {
  REACT_APP_API_URL: "${REACT_APP_API_URL:-}"
};
EOF

# start nginx
exec nginx -g 'daemon off;'
