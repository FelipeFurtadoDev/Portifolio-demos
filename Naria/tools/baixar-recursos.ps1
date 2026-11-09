# ===========================================================================
#  NARIA - baixa imagens e fontes para uso local
#  ---------------------------------------------------------------------------
#  Uso (no PowerShell, dentro da pasta 01-estetica-facial):
#    powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
#
#  Gera:
#    assets/img/<nome>-800.webp e <nome>-1200.webp   (9 fotos, 18 arquivos)
#    assets/fonts/*.woff2                             (3 arquivos)
#
#  Depois:
#    - imagens: em js/config.js, mude useLocalImages para true
#    - fontes:  no index.html, troque os <link> do Google Fonts por
#               <link rel="stylesheet" href="css/fontes-locais.css">
#
#  Os recortes e o enquadramento sao os mesmos usados pelo site hoje.
#  Fotos: Unsplash License. Fontes: SIL Open Font License 1.1.
# ===========================================================================

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$root  = Split-Path -Parent $PSScriptRoot
$imgDir  = Join-Path $root 'assets\img'
$fontDir = Join-Path $root 'assets\fonts'
New-Item -ItemType Directory -Force -Path $imgDir, $fontDir | Out-Null

# nome, id da foto na Unsplash, proporcao (largura:altura), foco do recorte
$images = @(
  @{ name = 'hero';                  id = 'photo-1643684391140-c5056cfd3436'; rw = 4; rh = 5; focus = 'top' },
  @{ name = 'proposta';              id = 'photo-1585945037805-5fd82c2e60b1'; rw = 5; rh = 4; focus = '' },
  @{ name = 'ritual';                id = 'photo-1706795033728-9232ef548a16'; rw = 4; rh = 5; focus = '' },
  @{ name = 'espaco-principal';      id = 'photo-1787651343620-8d5303006ecb'; rw = 4; rh = 5; focus = 'bottom' },
  @{ name = 'espaco-detalhe';        id = 'photo-1706795033855-eee02f726868'; rw = 3; rh = 4; focus = 'bottom' },
  @{ name = 'servico-limpeza';       id = 'photo-1761718209708-9ab9ba1c7252'; rw = 4; rh = 5; focus = '' },
  @{ name = 'servico-hidratacao';    id = 'photo-1570172619644-dfd03ed5d881'; rw = 4; rh = 5; focus = '' },
  @{ name = 'servico-massagem';      id = 'photo-1706795034830-de41aee06afa'; rw = 4; rh = 5; focus = '' },
  @{ name = 'servico-personalizado'; id = 'photo-1608571423902-eed4a5ad8108'; rw = 4; rh = 5; focus = '' }
)

$widths = @(800, 1200)
$falhas = 0

foreach ($i in $images) {
  foreach ($w in $widths) {
    $h = [math]::Round($w * $i.rh / $i.rw)
    $url = "https://images.unsplash.com/$($i.id)?fit=crop&fm=webp&q=72&w=$w&h=$h"
    if ($i.focus) { $url = "$url&crop=$($i.focus)" }
    $out = Join-Path $imgDir "$($i.name)-$w.webp"
    try {
      Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing
      $kb = [math]::Round((Get-Item $out).Length / 1KB)
      Write-Host "ok   $($i.name)-$w.webp ($kb KB)"
    } catch {
      $falhas++
      Write-Warning "falhou: $($i.name)-$w.webp -> $($_.Exception.Message)"
    }
  }
}

$fonts = @(
  @{ file = 'bodoni-moda-latin.woff2';        url = 'https://fonts.gstatic.com/s/bodonimoda/v28/aFTQ7PxzY382XsXX63LUYJSKSKg.woff2' },
  @{ file = 'bodoni-moda-italic-latin.woff2'; url = 'https://fonts.gstatic.com/s/bodonimoda/v28/aFTS7PxzY382XsXX63LUYJSPeKrcWw.woff2' },
  @{ file = 'hanken-grotesk-latin.woff2';     url = 'https://fonts.gstatic.com/s/hankengrotesk/v12/ieVn2YZDLWuGJpnzaiwFXS9tYtpd59A.woff2' }
)

foreach ($f in $fonts) {
  $out = Join-Path $fontDir $f.file
  try {
    Invoke-WebRequest -Uri $f.url -OutFile $out -UseBasicParsing
    $kb = [math]::Round((Get-Item $out).Length / 1KB)
    Write-Host "ok   $($f.file) ($kb KB)"
  } catch {
    $falhas++
    Write-Warning "falhou: $($f.file) -> $($_.Exception.Message)"
  }
}

Write-Host ''
if ($falhas -eq 0) {
  Write-Host 'Concluido. Agora ative useLocalImages no config.js e troque o link das fontes no index.html.'
} else {
  Write-Warning "$falhas arquivo(s) falharam. Rode o script novamente ou baixe manualmente (ver DESIGN_NOTES.md)."
}
