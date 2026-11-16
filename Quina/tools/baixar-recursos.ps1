# ===========================================================================
#  QUINA · Bolos sob encomenda - baixa fotos e fontes para uso local
#  ---------------------------------------------------------------------------
#  Uso (PowerShell, dentro da pasta 14-confeitaria-quina):
#    powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
#
#  Gera:
#    assets/img/<arquivo>-480.webp, -800.webp e -1200.webp   (fotos)
#    assets/img/abertura-800/1200/1800.webp                   (capa)
#    assets/fonts/zalando-sans-expanded-latin.woff2
#    assets/fonts/dm-sans-latin.woff2
#
#  Depois:
#    - fotos: em js/dados.js, mude imagens.useLocalImages para true;
#    - capa e embalagem: no index.html, troque tambem o src/srcset e o
#      <link rel="preload"> da capa pelos arquivos assets/img/ (o JS troca as
#      fotos da galeria, mas a capa carrega mais cedo se vier direto do HTML);
#    - fontes: troque o <link> do Google Fonts (e os preconnect de
#      fonts.googleapis/gstatic) por <link rel="stylesheet" href="css/fontes-locais.css">.
#
#  Os nomes "arquivo" e os ids das fotos sao os mesmos de js/dados.js.
#  Fotos: Licenca Unsplash. Fontes: SIL Open Font License 1.1.
#  O script so grava dentro desta pasta; nao altera nada fora dela.
# ===========================================================================

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$root    = Split-Path -Parent $PSScriptRoot
$imgDir  = Join-Path $root 'assets\img'
$fontDir = Join-Path $root 'assets\fonts'
New-Item -ItemType Directory -Force -Path $imgDir, $fontDir | Out-Null

$images = @(
  @{ name = "abertura";            id = "photo-1519197462-7755f76e6fbd"; widths = @(800, 1200, 1800) },
  @{ name = "bolo-redondo-flores"; id = "photo-1788240357812-58893f16e148" },
  @{ name = "bolo-retangular";     id = "photo-1695904255931-78b11e1cb049" },
  @{ name = "cobertura-ganache";   id = "photo-1713274788200-3ebde5262387" },
  @{ name = "corte-creme";         id = "photo-1741429385407-b5d5b94f433f" },
  @{ name = "corte-chocolate";     id = "photo-1562585194-aa017445b3ad" },
  @{ name = "embalagem";           id = "photo-1774451853657-a45138796465" }
)

$falhas = 0
foreach ($i in $images) {
  $widths = if ($i.widths) { $i.widths } else { @(480, 800, 1200) }
  foreach ($w in $widths) {
    $url = "https://images.unsplash.com/$($i.id)?fit=max&fm=webp&q=75&w=$w"
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

# Fontes, subconjunto latin - mesmos arquivos servidos pelo Google Fonts (verificados em 16/11/2026)
$fonts = @(
  @{ name = 'zalando-sans-expanded-latin.woff2'; url = 'https://fonts.gstatic.com/s/zalandosansexpanded/v3/JTUJjJci8Cy470GaeFwsix1hi3aTmrgRwU-zrEw7.woff2' },
  @{ name = 'dm-sans-latin.woff2';               url = 'https://fonts.gstatic.com/s/dmsans/v17/rP2Hp2ywxg089UriCZOIHQ.woff2' }
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
  Write-Host 'Pronto. Agora ative useLocalImages em js/dados.js e troque o link das fontes no index.html.'
}
