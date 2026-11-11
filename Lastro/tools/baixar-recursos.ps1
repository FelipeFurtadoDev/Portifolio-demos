# ===========================================================================
#  LASTRO - baixa fotos e fontes para uso local
#  ---------------------------------------------------------------------------
#  Uso (PowerShell, dentro da pasta 12-marmoraria-lastro):
#    powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
#
#  Gera:
#    assets/img/<chave>-<largura>.webp para as 15 fotos (hero, coz1..3, ban1..3,
#    est1..3, det1..5), 3 larguras cada -> 45 arquivos
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

# chave (igual ao data-foto do HTML), id da foto na Unsplash e larguras (igual a localWidths do config.js)
$images = @(
  @{ name = 'hero'; id = 'photo-1608635661512-52c656e0d4e5'; widths = @(640, 1200, 1920) },
  @{ name = 'coz1'; id = 'photo-1723902500173-37fe42ceb22a'; widths = @(480, 960, 1600) },
  @{ name = 'coz2'; id = 'photo-1627383837659-44f198098ab5'; widths = @(480, 960, 1600) },
  @{ name = 'coz3'; id = 'photo-1776935359448-fb11f63c375d'; widths = @(480, 960, 1600) },
  @{ name = 'ban1'; id = 'photo-1792270219154-4178b5ff648a'; widths = @(480, 960, 1600) },
  @{ name = 'ban2'; id = 'photo-1661107259637-4e1c55462428'; widths = @(480, 960, 1600) },
  @{ name = 'ban3'; id = 'photo-1564540579594-0930edb6de43'; widths = @(480, 960, 1600) },
  @{ name = 'est1'; id = 'photo-1785535573662-417e82193598'; widths = @(480, 960, 1600) },
  @{ name = 'est2'; id = 'photo-1772567732985-6fefa2dff56d'; widths = @(480, 960, 1600) },
  @{ name = 'est3'; id = 'photo-1759238136854-a43787126db7'; widths = @(480, 960, 1600) },
  @{ name = 'det1'; id = 'photo-1787539386309-450647434074'; widths = @(480, 800, 1200) },
  @{ name = 'det2'; id = 'photo-1608635661553-4be8b3659ca3'; widths = @(480, 800, 1200) },
  @{ name = 'det3'; id = 'photo-1608635661411-b8de70247ea5'; widths = @(480, 800, 1200) },
  @{ name = 'det4'; id = 'photo-1637665609537-26857a32f6cd'; widths = @(480, 800, 1200) },
  @{ name = 'det5'; id = 'photo-1627383838244-c475fb74b934'; widths = @(480, 800, 1200) }
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
    if ($b -match 'font-style:\s*italic') { $fam = "$fam-italic" }
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
