# ===========================================================================
#  CADENCIA - baixa fotos e fonte para uso local
#  ---------------------------------------------------------------------------
#  Uso (PowerShell, dentro da pasta 13-estetica-facial-cadencia):
#    powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
#
#  O que faz:
#    1. Baixa as 10 fotos da CDN da Unsplash ja em WebP, nas larguras usadas
#       pelo srcset, e grava em assets/img/<nome>-<largura>.webp.
#    2. Pede ao Google Fonts o CSS da Manrope, baixa o woff2 do subconjunto
#       "latin" (cobre o portugues), grava em assets/fonts/ e gera
#       css/fontes-locais.css.
#
#  Depois:
#    - em js/config.js, mude useLocalImages para true;
#    - no index.html, troque os dois <link rel="preconnect"> das fontes e o
#      <link> do Google Fonts por:
#        <link rel="stylesheet" href="css/fontes-locais.css">
#
#  Fotos: Licenca Unsplash. Fonte: SIL Open Font License 1.1.
#  Este script NAO foi executado no ambiente de desenvolvimento. So grava
#  dentro desta pasta. Se algo falhar, ele avisa e segue.
# ===========================================================================

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$root    = Split-Path -Parent $PSScriptRoot
$imgDir  = Join-Path $root 'assets\img'
$fontDir = Join-Path $root 'assets\fonts'
$cssOut  = Join-Path $root 'css\fontes-locais.css'
New-Item -ItemType Directory -Force -Path $imgDir, $fontDir | Out-Null

$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
$falhas = 0

# --- 1. Fotos (as larguras devem ser as do atributo data-ws de cada <img>) ---
$fotos = @(
  @{ nome = 'abertura';    id = 'photo-1741934023052-26baf5535088'; larguras = 800, 1200, 1600 },
  @{ nome = 'limpeza';     id = 'photo-1761718209708-9ab9ba1c7252'; larguras = 480, 800 },
  @{ nome = 'hidratacao';  id = 'photo-1616394584738-fc6e612e71b9'; larguras = 480, 800, 1200 },
  @{ nome = 'massagem';    id = 'photo-1790244338456-af6194d2436e'; larguras = 480, 800 },
  @{ nome = 'conversa';    id = 'photo-1733685373532-e67c3f68786a'; larguras = 480, 800 },
  @{ nome = 'atendimento'; id = 'photo-1782159981479-5e90597f284a'; larguras = 480, 800 },
  @{ nome = 'orientacoes'; id = 'photo-1655026392641-bf283a5f12d4'; larguras = 480, 800 },
  @{ nome = 'retrato';     id = 'photo-1781888683081-3ac4b43f21db'; larguras = 480, 800 },
  @{ nome = 'espaco';      id = 'photo-1787651343620-8d5303006ecb'; larguras = 480, 800 },
  @{ nome = 'materiais';   id = 'photo-1586220742613-b731f66f7743'; larguras = 480, 800, 1200 }
)

foreach ($f in $fotos) {
  foreach ($w in $f.larguras) {
    $url = "https://images.unsplash.com/$($f.id)?fit=max&q=72&fm=webp&w=$w"
    $destino = Join-Path $imgDir ("{0}-{1}.webp" -f $f.nome, $w)
    try {
      Invoke-WebRequest -Uri $url -OutFile $destino -UserAgent $ua -UseBasicParsing
      Write-Host ("ok   {0}-{1}.webp ({2:N0} KB)" -f $f.nome, $w, ((Get-Item $destino).Length / 1KB))
    } catch {
      $falhas++
      Write-Warning ("falhou {0}-{1}: {2}" -f $f.nome, $w, $_.Exception.Message)
    }
  }
}

# --- 2. Fonte --------------------------------------------------------------
$saida = @("/* Fonte local (subconjunto latin). Gerado por tools/baixar-recursos.ps1.`n   Manrope: SIL Open Font License 1.1. */`n")
try {
  $css = (Invoke-WebRequest -Uri 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap' -UserAgent $ua -UseBasicParsing).Content
  $blocos = [regex]::Matches($css, '/\* latin \*/\s*@font-face\s*\{[^}]*\}')
  if ($blocos.Count -eq 0) { throw 'nenhum bloco latin encontrado no CSS do Google Fonts' }
  $n = 0
  foreach ($b in $blocos) {
    $woff2 = [regex]::Match($b.Value, 'url\((https://[^)]+\.woff2)\)')
    if (-not $woff2.Success) { throw 'URL woff2 nao encontrada' }
    $arquivo = "manrope-latin-{0}.woff2" -f $n
    Invoke-WebRequest -Uri $woff2.Groups[1].Value -OutFile (Join-Path $fontDir $arquivo) -UserAgent $ua -UseBasicParsing
    $saida += ($b.Value -replace 'url\(https://[^)]+\.woff2\)', "url(../assets/fonts/$arquivo)")
    $n++
  }
  Write-Host ("ok   manrope: {0} arquivo(s)" -f $n)
  Set-Content -Path $cssOut -Value ($saida -join "`n`n") -Encoding UTF8
  Write-Host "ok   css/fontes-locais.css gerado"
} catch {
  $falhas++
  Write-Warning ("falhou manrope: {0}" -f $_.Exception.Message)
}

if ($falhas -gt 0) {
  Write-Warning "$falhas item(ns) falharam. O site continua funcionando com a CDN e o Google Fonts."
} else {
  Write-Host "Pronto. Agora ative useLocalImages em js/config.js e troque o link das fontes no index.html."
}
