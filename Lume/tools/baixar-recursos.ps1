# ===========================================================================
#  LUME - baixa fotos e fontes para uso local
#  ---------------------------------------------------------------------------
#  Uso (PowerShell, dentro da pasta 18-marmoraria-lume):
#    powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
#
#  Gera:
#    assets/img/<chave>-<largura>.webp para as 10 fotos (capa, coz1..3, ban1..3,
#    gou1..3), 4 larguras cada -> 40 arquivos
#    assets/fonts/asul-400-latin.woff2
#    assets/fonts/instrument-sans-latin.woff2                      -> 2 arquivos de fonte
#
#  Depois:
#    - fotos: em js/config.js, mude useLocalImages para true
#    - fontes: no index.html, troque o <link> do Google Fonts (e os dois
#      preconnect de fonts.googleapis/gstatic) por
#      <link rel="stylesheet" href="css/fontes-locais.css">
#    - o <link rel="preload"> da capa e o og:image continuam apontando para a
#      Unsplash; ajuste-os para assets/img/capa-1200.webp ao publicar.
#
#  As fotos sao baixadas na proporcao original (o recorte e feito pelo CSS).
#  Fotos: Licenca Unsplash. Fontes: SIL Open Font License 1.1.
#  O script so grava dentro desta pasta; nao altera nada fora dela.
#  (Este script nao foi executado na criacao do modelo.)
# ===========================================================================

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$root    = Split-Path -Parent $PSScriptRoot
$imgDir  = Join-Path $root 'assets\img'
$fontDir = Join-Path $root 'assets\fonts'
New-Item -ItemType Directory -Force -Path $imgDir, $fontDir | Out-Null

# chave (igual a data-foto do HTML e a js/config.js), id da foto na Unsplash e larguras (igual a localWidths)
$images = @(
  @{ name = 'capa'; id = 'photo-1771371854543-bb274762389e'; widths = @(480, 800, 1200, 1600) },
  @{ name = 'coz1'; id = 'photo-1609347744403-2306e8a9ae27'; widths = @(480, 800, 1200, 1600) },
  @{ name = 'coz2'; id = 'photo-1617228069096-4638a7ffc906'; widths = @(480, 800, 1200, 1600) },
  @{ name = 'coz3'; id = 'photo-1556911220-bff31c812dba'; widths = @(480, 800, 1200, 1600) },
  @{ name = 'ban1'; id = 'photo-1763485956164-73506432b990'; widths = @(480, 800, 1200, 1600) },
  @{ name = 'ban2'; id = 'photo-1763485956310-55f3c0e822d5'; widths = @(480, 800, 1200, 1600) },
  @{ name = 'ban3'; id = 'photo-1771681278446-6f8eb0c7323f'; widths = @(480, 800, 1200, 1600) },
  @{ name = 'gou1'; id = 'photo-1762117360871-f11fbad00ee1'; widths = @(480, 800, 1200, 1600) },
  @{ name = 'gou2'; id = 'photo-1762117360868-d4e757073d45'; widths = @(480, 800, 1200, 1600) },
  @{ name = 'gou3'; id = 'photo-1762117361035-5cd4f9c24795'; widths = @(480, 800, 1200, 1600) }
)

$falhas = 0
foreach ($i in $images) {
  foreach ($w in $i.widths) {
    $url = "https://images.unsplash.com/$($i.id)?fit=max&fm=webp&q=72&w=$w"
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

# Fontes: le o CSS do Google Fonts (com agente de navegador moderno, para vir
# woff2) e baixa apenas os blocos "latin".
$ua  = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
$css = 'https://fonts.googleapis.com/css2?family=Asul&family=Instrument+Sans:wght@400..700&display=swap'
try {
  $texto = (Invoke-WebRequest -Uri $css -UserAgent $ua -UseBasicParsing).Content
  $blocos = [regex]::Matches($texto, '/\* latin \*/\s*@font-face\s*\{(?<b>[^}]+)\}')
  foreach ($m in $blocos) {
    $b = $m.Groups['b'].Value
    $fam = [regex]::Match($b, "font-family:\s*'([^']+)'").Groups[1].Value.ToLower() -replace ' ', '-'
    if ($b -match 'font-style:\s*italic') { $fam = "$fam-italic" }
    $peso = [regex]::Match($b, 'font-weight:\s*(\d+)\s*;').Groups[1].Value   # peso unico (Asul): entra no nome
    if ($peso) { $fam = "$fam-$peso" }
    $url = [regex]::Match($b, 'url\(([^)]+)\)').Groups[1].Value
    $nome = "$fam-latin.woff2"
    $out = Join-Path $fontDir $nome
    Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing
    $kb = [math]::Round((Get-Item $out).Length / 1KB)
    Write-Host "ok   $nome ($kb KB)"
  }
  if ($blocos.Count -lt 2) { $falhas++; Write-Warning "Esperava 2 arquivos de fonte, encontrei $($blocos.Count)." }
} catch {
  $falhas++
  Write-Warning "falhou: fontes -> $($_.Exception.Message)"
}

if ($falhas -gt 0) {
  Write-Warning "$falhas item(ns) falharam. Rode o script de novo antes de ativar o modo local."
} else {
  Write-Host ""
  Write-Host "Tudo baixado. Ative useLocalImages em js/config.js e troque o link das fontes no index.html."
}
