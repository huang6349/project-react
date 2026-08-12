#!/usr/bin/env bash
# Node 打包，输出到 dist 目录
WORKDIR=$(cd "$(dirname "$0")" && cd .. && pwd)
DIST_DIR="$WORKDIR/dist"

echo "==> 安装依赖并构建..."
cd "$WORKDIR"
pnpm install && pnpm build || exit 1

echo "==> 打包构建产物..."
tar -zcf www.tar.gz -C "$DIST_DIR" . || exit 1

echo "==> 准备 dist 目录..."
rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

echo "==> 复制 www.tar.gz..."
mv www.tar.gz "$DIST_DIR/"

echo "==> 复制部署脚本..."
cp "$WORKDIR/scripts/start.sh" "$DIST_DIR/"

echo "==> 完成: $DIST_DIR"
ls -lh "$DIST_DIR"
