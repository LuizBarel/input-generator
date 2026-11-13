#!/usr/bin/env bash
# Gera o ZIP para envio à Chrome Web Store (apenas os arquivos da extensão).
set -euo pipefail
cd "$(dirname "$0")"

OUT="gerador-de-inputs.zip"
rm -f "$OUT"
zip -r "$OUT" manifest.json background.js generators.js menu.js fill.js icons -x '*.DS_Store'
echo "Gerado: $OUT"
unzip -l "$OUT"
