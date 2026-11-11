# ===========================================================================
#  LASTRO - baixa fotos e fontes para uso local
#  ---------------------------------------------------------------------------
#  Uso (PowerShell, dentro da pasta 12-marmoraria-lastro):
#    powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
#
#  Gera:
#    assets/img/capa-640|1200|1800.webp
#    assets/img/plano-640|1000|1400.webp
#    assets/img/detalhe-480|800|1200.webp                          -> 9 arquivos
#    assets/fonts/instrument-serif-latin.woff2
#    assets/fonts/geist-latin.woff2                                -> 2 fontes
#
#  Depois:
#    - fotos: em js/config.js, mude useLocalImages para true
#    - fontes: no index.html, troque o <link> do Google Fonts (e os dois
#      preconnect de fonts.googleapis/gstatic) por
#      <link rel="stylesheet" href="css/fontes-locais.css">
#
#  As fotos sao baixadas na proporcao original (o recorte e feito pelo CSS).
#  Fotos: Licenca Unsplash. Fontes: SIL Open Font License 1.1.
#  O script so grava dentro desta pasta; nao altera nada fora dela.
# ===========================================================================

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$root    = Split-Path -Parent $PSScriptRoot
$imgDir  = Join-Path $root 'assets\img'
$fontDir = Join-Path $root 'assets\fonts'
New-Item -ItemType Directory -Force -Path $imgDir, $fontDir | Out-Null

# nome (igual ao data-img do HTML), id da foto na Unsplash e larguras (igual a localWidths do config.js)
$images = @(
  @{ name = 'capa';    id = 'photo-1781249144389-4174c1164955'; widths = @(640, 1200, 1800) },
  @{ name = 'plano';   id = 'photo-1792980191179-67e43ba8d5d4'; widths = @(640, 1000, 1400) },
  @{ name = 'detalhe'; id = 'photo-1637665609537-26857a32f6cd'; widths = @(480, 800, 1200) }
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
$css = 'https://fonts.googleapis.com/css2?family=Geist:wght@400..700&family=Instrument+Serif&display=swap'
try {
  $texto = (Invoke-WebRequest -Uri $css -UserAgent $ua -UseBasicParsing).Content
  $blocos = [regex]::Matches($texto, '/\* latin \*/\s*@font-face\s*\{(?<b>[^}]+)\}')
  foreach ($m in $blocos) {
    $b = $m.Groups['b'].Value
    $fam = [regex]::Match($b, "font-family:\s*'([^']+)'").Groups[1].Value.ToLower() -replace ' ', '-'
    $url = [regex]::Match($b, 'url\(([^)]+)\)').Groups[1].Value
    $nome = "$fam-latin.woff2"
    $out = Join-Path $fontDir $nome
    Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing
    $kb = [math]::Round((Get-Item $out).Length / 1KB)
    Write-Host "ok   $nome ($kb KB)"
  }
  if ($blocos.Count -lt 2) { $falhas++; Write-Warning "Esperava 2 fontes, encontrei $($blocos.Count)." }
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
