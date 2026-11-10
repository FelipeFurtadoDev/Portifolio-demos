# ===========================================================================
#  NEXO / Estudio Facial - baixa fotos e fontes para uso local
#  ---------------------------------------------------------------------------
#  Uso (PowerShell, dentro da pasta 07-estetica-facial-nexo):
#    powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
#
#  Gera:
#    assets/img/<nome>-800.webp e <nome>-1200.webp   (capa: 800, 1200, 1800)
#    assets/fonts/funnel-display-latin.woff2
#    assets/fonts/funnel-sans-latin.woff2
#    assets/fonts/geist-mono-latin.woff2
#
#  Depois:
#    - fotos: em js/config.js, mude useLocalImages para true;
#    - capa: no index.html, troque tambem o srcset das 5 <img> da capa e o
#      <link rel="preload"> pelos arquivos assets/img/capa-*.webp (o JS faz
#      a troca, mas no HTML a foto principal carrega mais cedo);
#    - fontes: troque o <link> do Google Fonts (e os preconnect de
#      fonts.googleapis/gstatic) por <link rel="stylesheet" href="css/fontes-locais.css">.
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

# nome do arquivo (igual ao "file" do js/config.js) e id da foto na Unsplash
$images = @(
  @{ name = 'capa';       id = 'photo-1551184451-76b762941ad6'; widths = @(800, 1200, 1800) },
  @{ name = 'limpeza';    id = 'photo-1791714390214-f6ff43e6262e' },
  @{ name = 'hidratacao'; id = 'photo-1693004925174-d9e06209d0ee' },
  @{ name = 'argila';     id = 'photo-1794151882454-48112934c4bc' },
  @{ name = 'massagem';   id = 'photo-1561228987-8e7379dde477' },
  @{ name = 'renovacao';  id = 'photo-1659007747376-3811b34e458f' },
  @{ name = 'estudio';    id = 'photo-1677441564461-1b3e5bff781c' }
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

# Fontes variaveis, subconjunto latin - mesmos arquivos servidos pelo Google Fonts
$fonts = @(
  @{ name = 'funnel-display-latin.woff2'; url = 'https://fonts.gstatic.com/s/funneldisplay/v3/B50WF7FGv37QNVWgE0ga--4Pbb6dDYs.woff2' },
  @{ name = 'funnel-sans-latin.woff2';    url = 'https://fonts.gstatic.com/s/funnelsans/v3/OpNIno8Dg9bX6Bsp3Wq69Tpyfhg.woff2' },
  @{ name = 'geist-mono-latin.woff2';     url = 'https://fonts.gstatic.com/s/geistmono/v6/or3nQ6H-1_WfwkMZI_qYFrcdmg.woff2' }
)
foreach ($f in $fonts) {
  $out = Join-Path $fontDir $f.name
  try {
    Invoke-WebRequest -Uri $f.url -OutFile $out -UseBasicParsing
    Write-Host "ok   $($f.name)"
  } catch {
    $falhas++
    Write-Warning "falhou: $($f.name) -> $($_.Exception.Message)"
  }
}

if ($falhas -gt 0) {
  Write-Warning "$falhas arquivo(s) falharam. O site continua funcionando com as versoes remotas."
} else {
  Write-Host ''
  Write-Host 'Pronto. Agora ative useLocalImages em js/config.js e troque o link das fontes no index.html.'
}
