# ===========================================================================
#  TRACO STUDIO - baixa imagens e fonte para uso local
#  ---------------------------------------------------------------------------
#  Uso (no PowerShell, dentro da pasta 03-nail-designer):
#    powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
#
#  Gera:
#    assets/img/<nome>-800.webp e <nome>-1200.webp   (14 fotos, 28 arquivos)
#    assets/fonts/archivo-latin-var.woff2             (1 arquivo)
#
#  Depois:
#    - imagens: em js/config.js, mude useLocalImages para true
#    - fonte:   no index.html, troque o <link> do Google Fonts (e os dois
#               preconnect de fonts.googleapis/gstatic) por
#               <link rel="stylesheet" href="css/fontes-locais.css">
#
#  As fotos sao baixadas na proporcao original (o recorte e feito pelo CSS).
#  Fotos: Licenca Unsplash. Fonte Archivo: SIL Open Font License 1.1.
#  O script so faz downloads para dentro desta pasta; nao altera nada fora dela.
# ===========================================================================

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$root    = Split-Path -Parent $PSScriptRoot
$imgDir  = Join-Path $root 'assets\img'
$fontDir = Join-Path $root 'assets\fonts'
New-Item -ItemType Directory -Force -Path $imgDir, $fontDir | Out-Null

# nome (igual ao data-photo do HTML) e id da foto na Unsplash
$images = @(
  @{ name = 'hero'; id = 'photo-1772322586634-9867476143b9' },
  @{ name = 'look01'; id = 'photo-1764069373561-25954ac5a81c' },
  @{ name = 'look02'; id = 'photo-1604654894610-df63bc536371' },
  @{ name = 'look03'; id = 'photo-1683719312734-e31de63957ab' },
  @{ name = 'look04'; id = 'photo-1772322586702-73125782bd99' },
  @{ name = 'look05'; id = 'photo-1645566372784-7d017ad7643b' },
  @{ name = 'look06'; id = 'photo-1567629307995-b9f33097bd30' },
  @{ name = 'look07'; id = 'photo-1772183561023-8d02a5639ef7' },
  @{ name = 'look08'; id = 'photo-1777288390469-828f8816231c' },
  @{ name = 'mapa'; id = 'photo-1698335107935-e2c8287c4947' },
  @{ name = 'unhas'; id = 'photo-1737214475365-e4f06281dcf3' },
  @{ name = 'cilios'; id = 'photo-1735151225764-eac694642dbf' },
  @{ name = 'sobrancelhas'; id = 'photo-1792679430669-caa0d70a9c52' },
  @{ name = 'fim'; id = 'photo-1707429495962-e8d55b4d5ffe' }
)

$widths = @(800, 1200)
$falhas = 0

foreach ($i in $images) {
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

# Archivo variavel (eixos de largura 62-125 e peso 100-900), subconjunto latin
$fontUrl = 'https://fonts.gstatic.com/s/archivo/v25/k3kQo8UDI-1M0wlSfdnoLg.woff2'
$fontOut = Join-Path $fontDir 'archivo-latin-var.woff2'
try {
  Invoke-WebRequest -Uri $fontUrl -OutFile $fontOut -UseBasicParsing
  $kb = [math]::Round((Get-Item $fontOut).Length / 1KB)
  Write-Host "ok   archivo-latin-var.woff2 ($kb KB)"
} catch {
  $falhas++
  Write-Warning "falhou: fonte -> $($_.Exception.Message)"
}

if ($falhas -gt 0) {
  Write-Warning "$falhas arquivo(s) falharam. Rode o script de novo antes de ativar o modo local."
} else {
  Write-Host ""
  Write-Host "Tudo baixado. Ative useLocalImages em js/config.js e troque o link da fonte no index.html."
}
