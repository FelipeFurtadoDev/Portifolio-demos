# ===========================================================================
#  VAO - baixa fotos e fontes para uso local
#  ---------------------------------------------------------------------------
#  Uso (PowerShell, dentro da pasta 11-estetica-pet-vao):
#    powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
#
#  Gera:
#    assets/img/capa-800.webp e capa-1600.webp
#    assets/img/<chegada|cuidado|retirada>-800.webp e -1200.webp  -> 8 fotos
#    assets/fonts/barlow-condensed-600|700-latin.woff2
#    assets/fonts/instrument-sans-latin.woff2                     -> 3 fontes
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

# nome (igual ao data-img do HTML) e id da foto na Unsplash
$images = @(
  @{ name = 'capa';     id = 'photo-1609098245951-f1872318dd21'; widths = @(800, 1600) },
  @{ name = 'chegada';  id = 'photo-1530700131180-d43d9b8cc41f' },
  @{ name = 'cuidado';  id = 'photo-1632236705239-ac6f4908638d' },
  @{ name = 'retirada'; id = 'photo-1579119134757-5c38803f34fc' }
)

$falhas = 0
foreach ($i in $images) {
  $widths = if ($i.widths) { $i.widths } else { @(800, 1200) }
  foreach ($w in $widths) {
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
$css = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Instrument+Sans:wght@400..700&display=swap'
try {
  $texto = (Invoke-WebRequest -Uri $css -UserAgent $ua -UseBasicParsing).Content
  $blocos = [regex]::Matches($texto, '/\* latin \*/\s*@font-face\s*\{(?<b>[^}]+)\}')
  foreach ($m in $blocos) {
    $b = $m.Groups['b'].Value
    $fam = [regex]::Match($b, "font-family:\s*'([^']+)'").Groups[1].Value.ToLower() -replace ' ', '-'
    $peso = [regex]::Match($b, 'font-weight:\s*([0-9 ]+);').Groups[1].Value.Trim()
    $url = [regex]::Match($b, 'url\(([^)]+)\)').Groups[1].Value
    $nome = if ($fam -eq 'barlow-condensed') { "$fam-$peso-latin.woff2" } else { "$fam-latin.woff2" }
    $out = Join-Path $fontDir $nome
    Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing
    $kb = [math]::Round((Get-Item $out).Length / 1KB)
    Write-Host "ok   $nome ($kb KB)"
  }
  if ($blocos.Count -lt 3) { $falhas++; Write-Warning "Esperava 3 fontes, encontrei $($blocos.Count)." }
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
