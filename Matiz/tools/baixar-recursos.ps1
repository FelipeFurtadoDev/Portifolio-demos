# ===========================================================================
#  MATIZ - Estudio de beleza - baixa fotos e fontes para uso local
#  ---------------------------------------------------------------------------
#  Uso (PowerShell, dentro da pasta 15-estudio-de-beleza-matiz):
#    powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
#
#  O que faz:
#    1. Baixa as 10 fotos da CDN da Unsplash ja em WebP, nas larguras usadas
#       pelo srcset, e grava em assets/img/<nome>-<largura>.webp.
#    2. Pede ao Google Fonts o CSS de Asul e Source Sans 3, baixa os arquivos
#       woff2 do subconjunto "latin" (cobre o portugues), grava em
#       assets/fonts/ e gera css/fontes-locais.css.
#
#  Depois:
#    - em js/config.js, mude useLocalImages para true;
#    - no index.html, troque os dois <link rel="preconnect"> das fontes e o
#      <link> do Google Fonts por:
#        <link rel="stylesheet" href="css/fontes-locais.css">
#
#  Fotos: Licenca Unsplash. Fontes: SIL Open Font License 1.1.
#  Os enderecos usados aqui foram abertos no navegador durante o
#  desenvolvimento, mas este script NAO foi executado (sem terminal na maquina
#  de desenvolvimento). So grava dentro desta pasta. Se algo falhar, ele avisa
#  e segue.
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
  @{ nome = 'capa';         id = 'photo-1748163432725-454f46f68340'; larguras = 480, 800, 1200, 1600 },
  @{ nome = 'olhar';        id = 'photo-1651839633408-3fccd671b832'; larguras = 480, 800, 1200, 1600 },
  @{ nome = 'unhas';        id = 'photo-1754951661104-2a13d50d4741'; larguras = 600, 1000, 1500, 2000 },
  @{ nome = 'cilios';       id = 'photo-1633346152343-5486573d3d50'; larguras = 800, 1200, 1800, 2400 },
  @{ nome = 'sobrancelha';  id = 'photo-1730226995154-efe9e13db300'; larguras = 800, 1200, 1800, 2400 },
  @{ nome = 'espaco';       id = 'photo-1738404643415-69a06d175f80'; larguras = 600, 900, 1200, 1600 },
  @{ nome = 'atendimento';  id = 'photo-1632345031435-8727f6897d53'; larguras = 480, 800, 1200 },
  @{ nome = 'menu-unhas';        id = 'photo-1753285310651-6974a839c992'; larguras = 480, 720, 1000, 1400 },
  @{ nome = 'menu-cilios';       id = 'photo-1589710751893-f9a6770ad71b'; larguras = 480, 720, 1000, 1400 },
  @{ nome = 'menu-sobrancelhas'; id = 'photo-1792679430669-caa0d70a9c52'; larguras = 480, 720, 1000, 1400 }
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
  @{ prefixo = 'asul';             url = 'https://fonts.googleapis.com/css2?family=Asul:wght@400;700&display=swap' },
  @{ prefixo = 'source-sans-3';    url = 'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400..700&display=swap' }
)

$saida = @("/* Fontes locais (subconjunto latin). Gerado por tools/baixar-recursos.ps1.`n   Asul e Source Sans 3: SIL Open Font License 1.1. */`n")

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
