#!/usr/bin/env bash
# 部署到 Nginx
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

# 如果在 dist/ 下，移到上级目录
if [ "$(basename "$SCRIPT_DIR")" = "dist" ]; then
    echo "==> 从 dist/ 移动到上级目录..."
    cd "$SCRIPT_DIR/.."
    mv dist/* . 2>/dev/null || true
    rmdir dist 2>/dev/null || true
    SCRIPT_DIR=$(pwd)
fi

# 加载 .env
PARENT_DIR=$(cd "$SCRIPT_DIR/.." && pwd)
set -a
if [ -f "$SCRIPT_DIR/.env" ]; then
    source "$SCRIPT_DIR/.env"
elif [ -f "$PARENT_DIR/.env" ]; then
    source "$PARENT_DIR/.env"
fi
set +a

PACKAGE_FILE="$SCRIPT_DIR/www.tar.gz"
_NGINX_SIBLING=$(cd "$SCRIPT_DIR/.." && pwd)
NGINX_DIR=${NGINX_DIR:-"$_NGINX_SIBLING/project-nginx/config/www"}

echo "==> 开始部署..."
echo "部署文件: $PACKAGE_FILE"
echo "目标路径: $NGINX_DIR"

if [ -d "$NGINX_DIR" ]; then
    echo "==> 清空目标目录..."
    rm -rf "${NGINX_DIR:?}"/*
fi

mkdir -p "$NGINX_DIR"

echo "==> 解压文件..."
tar -zxf "$PACKAGE_FILE" -C "$NGINX_DIR" || exit 1

echo "==> 完成: $NGINX_DIR"
ls -lh "$NGINX_DIR"
