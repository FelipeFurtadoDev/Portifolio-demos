# ===========================================================================
#  PINGO - Banho & Tosa - baixa fotos e fontes para uso local
#  ---------------------------------------------------------------------------
#  Uso (PowerShell, dentro da pasta 17-estetica-pet-pingo):
#    powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
#
#  O que faz:
#    1. Baixa as 8 fotos da CDN da Unsplash ja em WebP, nas larguras usadas
#       pelo srcset do index.html, e grava em assets/img/<nome>-<largura>.webp.
#    2. Pede ao Google Fonts o CSS de Bricolage Grotesque e DM Sans, baixa os
#       arquivos woff2 do subconjunto "latin" (cobre o portugues), grava em
#       assets/fonts/ e gera css/fontes-locais.css.
#
#  Depois:
#    - em js/config.js, mude useLocalImages para true (se faltar um arquivo,
#      aquela foto volta sozinha para a CDN);
#    - no index.html, troque os dois <link rel="preconnect"> das fontes e o
#      <link> do Google Fonts por:
#        <link rel="stylesheet" href="css/fontes-locais.css">
#
#  Fotos: Licenca Unsplash. Fontes: SIL Open Font License 1.1.
#  Os identificadores das fotos foram conferidos carregando cada imagem na CDN
#  durante o desenvolvimento, mas este script NAO foi executado (o ambiente de
#  trabalho nao tem acesso a CDN nem a Google Fonts). So grava dentro desta
#  pasta. Se algo falhar, ele avisa e segue.
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

# --- 1. Fotos (nomes e larguras iguais aos de imageFiles em js/config.js) ---
$fotos = @(
  @{ nome = 'capa'; id = 'photo-1727681200723-9513e4e3c394'; larguras = 600, 900, 1200, 1600 },
  @{ nome = 'escova'; id = 'photo-1727510190155-51abda425a82'; larguras = 500, 800, 1100 },
  @{ nome = 'banho'; id = 'photo-1647002380351-ba23ff97c428'; larguras = 600, 900, 1200 },
  @{ nome = 'patas'; id = 'photo-1767363592636-6ec7ecd3c06b'; larguras = 600, 900, 1200 },
  @{ nome = 'tosa'; id = 'photo-1719464454959-9cf304ef4774'; larguras = 600, 900, 1200 },
  @{ nome = 'mesa'; id = 'photo-1733210872526-863e2f16cf39'; larguras = 700, 1000, 1400 },
  @{ nome = 'banho2'; id = 'photo-1699215432275-bf47e63f3bfa'; larguras = 500, 800, 1000 },
  @{ nome = 'toalha'; id = 'photo-1733964659477-35534815c626'; larguras = 500, 800, 1000 }
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

# --- 2. Fontes -------------------------------------------------------------
$familias = @(
  @{ prefixo = 'bricolage-grotesque'; url = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&display=swap' },
  @{ prefixo = 'dm-sans';             url = 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..700&display=swap' }
)

$saida = @("/* Fontes locais (subconjunto latin). Gerado por tools/baixar-recursos.ps1.`n   Bricolage Grotesque e DM Sans: SIL Open Font License 1.1. */`n")

foreach ($fam in $familias) {
  try {
    $css = (Invoke-WebRequest -Uri $fam.url -UserAgent $ua -UseBasicParsing).Content
    $blocos = [regex]::Matches($css, '/\* latin \*/\s*@font-face\s*\{[^}]*\}')
    if ($blocos.Count -eq 0) { throw 'nenhum bloco latin encontrado no CSS do Google Fonts' }
    $n = 0
    foreach ($b in $blocos) {
      $estilo = [regex]::Match($b.Value, 'font-style:\s*(\w+)').Groups[1].Value
      $peso   = ([regex]::Match($b.Value, 'font-weight:\s*([\d ]+);').Groups[1].Value).Trim() -replace ' ', '-'
      $woff2  = [regex]::Match($b.Value, 'url\((https://[^)]+\.woff2)\)')
      if (-not $woff2.Success) { throw 'URL woff2 nao encontrada' }
      $arquivo = "{0}-{1}-{2}-latin.woff2" -f $fam.prefixo, $peso, $estilo
      Invoke-WebRequest -Uri $woff2.Groups[1].Value -OutFile (Join-Path $fontDir $arquivo) -UserAgent $ua -UseBasicParsing
      $saida += ($b.Value -replace 'url\(https://[^)]+\.woff2\)', "url(../assets/fonts/$arquivo)")
      $n++
    }
    Write-Host ("ok   {0}: {1} arquivo(s)" -f $fam.prefixo, $n)
  } catch {
    $falhas++
    Write-Warning ("falhou {0}: {1}" -f $fam.prefixo, $_.Exception.Message)
  }
}

if ($saida.Count -gt 1) {
  Set-Content -Path $cssOut -Value ($saida -join "`n`n") -Encoding UTF8
  Write-Host "ok   css/fontes-locais.css gerado"
}

if ($falhas -gt 0) {
  Write-Warning "$falhas item(ns) falharam. O site continua funcionando com a CDN e o Google Fonts."
} else {
  Write-Host "Pronto. Agora ative useLocalImages em js/config.js e troque o link das fontes no index.html."
}
