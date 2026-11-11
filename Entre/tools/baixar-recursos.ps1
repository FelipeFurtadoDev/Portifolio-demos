# ===========================================================================
#  ENTRE. Atelier de Olhar & Maos - baixa fotos e fontes para uso local
#  ---------------------------------------------------------------------------
#  Uso (PowerShell, dentro da pasta 10-entre-beauty-atelier):
#    powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
#
#  O que faz:
#    1. Baixa as 6 fotos da CDN da Unsplash ja em WebP, nas larguras usadas
#       pelo srcset, e grava em assets/img/<nome>-<largura>.webp.
#    2. Pede ao Google Fonts o CSS de Instrument Serif e Familjen Grotesk,
#       baixa os arquivos woff2 do subconjunto "latin" (cobre o portugues),
#       grava em assets/fonts/ e gera css/fontes-locais.css.
#
#  Depois:
#    - em js/config.js, mude useLocalImages para true;
#    - no index.html, troque os dois <link rel="preconnect"> das fontes e o
#      <link> do Google Fonts por:
#        <link rel="stylesheet" href="css/fontes-locais.css">
#
#  Fotos: Licenca Unsplash. Fontes: SIL Open Font License 1.1.
#  Este script NAO foi executado no ambiente de desenvolvimento (sem acesso a
#  rede). So grava dentro desta pasta. Se algo falhar, ele avisa e segue.
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

# --- 1. Fotos --------------------------------------------------------------
$fotos = @(
  @{ nome = 'capa';         id = 'photo-1582456206605-c4b1a33aae62'; larguras = 480, 800, 1200, 1600 },
  @{ nome = 'maos';         id = 'photo-1618606679166-7f313aa5b26f'; larguras = 480, 800, 1200 },
  @{ nome = 'cilios';       id = 'photo-1639629509821-c54cdd984227'; larguras = 480, 800, 1200, 1600 },
  @{ nome = 'sobrancelhas'; id = 'photo-1612864271882-5107e9e3b0ce'; larguras = 480, 800, 1200 },
  @{ nome = 'gesto';        id = 'photo-1753285310651-6974a839c992'; larguras = 480, 800, 1200 },
  @{ nome = 'detalhe';      id = 'photo-1581003250898-36050e78fcd3'; larguras = 480, 800 }
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
  @{ prefixo = 'instrument-serif'; url = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap' },
  @{ prefixo = 'familjen-grotesk'; url = 'https://fonts.googleapis.com/css2?family=Familjen+Grotesk:ital,wght@0,400..700;1,400..700&display=swap' }
)

$saida = @("/* Fontes locais (subconjunto latin). Gerado por tools/baixar-recursos.ps1.`n   Instrument Serif e Familjen Grotesk: SIL Open Font License 1.1. */`n")

foreach ($fam in $familias) {
  try {
    $css = (Invoke-WebRequest -Uri $fam.url -UserAgent $ua -UseBasicParsing).Content
    $blocos = [regex]::Matches($css, '/\* latin \*/\s*@font-face\s*\{[^}]*\}')
    if ($blocos.Count -eq 0) { throw 'nenhum bloco latin encontrado no CSS do Google Fonts' }
    $n = 0
    foreach ($b in $blocos) {
      $estilo = [regex]::Match($b.Value, 'font-style:\s*(\w+)').Groups[1].Value
      $woff2 = [regex]::Match($b.Value, 'url\((https://[^)]+\.woff2)\)')
      if (-not $woff2.Success) { throw 'URL woff2 nao encontrada' }
      $arquivo = "{0}-{1}-latin.woff2" -f $fam.prefixo, $estilo
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
