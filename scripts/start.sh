#!/usr/bin/env bash
# 部署到 Nginx
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
PARENT_DIR=$(cd "$SCRIPT_DIR/.." && pwd)

# 加载 .env
set -a
if [ -f "$SCRIPT_DIR/.env" ]; then
    source "$SCRIPT_DIR/.env"
elif [ -f "$PARENT_DIR/.env" ]; then
    source "$PARENT_DIR/.env"
fi
set +a

PACKAGE_FILE="$SCRIPT_DIR/www.tar.gz"
NGINX_DIR=${NGINX_DIR:-"$PARENT_DIR/project-nginx/config/www"}

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
