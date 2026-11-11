# ===========================================================================
#  AVELA / Atelier de Confeitaria - baixa fotos e fontes para uso local
#  ---------------------------------------------------------------------------
#  Uso (PowerShell, dentro da pasta 08-confeitaria-avela):
#    powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
#
#  Gera:
#    assets/img/<nome>-480.webp, -960.webp e -1440.webp  (pecas da carta)
#    assets/img/abertura-800/1400/2200.webp              (abertura)
#    assets/img/atelie-*.webp                            (fotos do atelie)
#    assets/fonts/gloock-latin.woff2
#    assets/fonts/commissioner-latin.woff2
#
#  Depois:
#    - fotos: em js/config.js, mude images.useLocalImages para true;
#    - abertura: no index.html, troque tambem o srcset da foto da abertura e o
#      <link rel="preload"> pelos arquivos assets/img/abertura-*.webp (o JS faz
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
  @{ name = "abertura"; id = "photo-1600631343437-07520abddc68"; widths = @(800, 1400, 2200) },
  @{ name = "bolo-pistache"; id = "photo-1694837493185-d92e727c6346" },
  @{ name = "bolo-red-velvet"; id = "photo-1779885580435-949062b1abb3" },
  @{ name = "bolo-chocolate-framboesa"; id = "photo-1567009349827-ab242f2c96e6" },
  @{ name = "torta-chocolate-figo"; id = "photo-1626803775151-61d756612f97" },
  @{ name = "torta-frutas-vermelhas"; id = "photo-1771556621626-353ce8ecb5e9" },
  @{ name = "torta-noz-peca"; id = "photo-1767065584339-5d58fb4d8a04" },
  @{ name = "sobremesa-entremet"; id = "photo-1632134964015-9300cf2314cf" },
  @{ name = "sobremesa-tortinha-pistache"; id = "photo-1702745284748-59c103941c41" },
  @{ name = "sobremesa-caramelo"; id = "photo-1547414368-ac947d00b91d" },
  @{ name = "presente-bombons"; id = "photo-1481391319762-47dff72954d9" },
  @{ name = "presente-macarons"; id = "photo-1771333313844-9b335e73cef9" },
  @{ name = "presente-trufas"; id = "photo-1763700667398-24ae7f2289fc" },
  @{ name = "atelie-ganache"; id = "photo-1646082192921-272df4780996"; widths = @(960, 1440) },
  @{ name = "atelie-trufas"; id = "photo-1545015451-f05567aa6bcc"; widths = @(480, 960) }
)

$falhas = 0
foreach ($i in $images) {
  $widths = if ($i.widths) { $i.widths } else { @(480, 960, 1440) }
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

# Fontes, subconjunto latin - mesmos arquivos servidos pelo Google Fonts (verificados em 11/11/2026)
$fonts = @(
  @{ name = 'gloock-latin.woff2';       url = 'https://fonts.gstatic.com/s/gloock/v8/Iurb6YFw84WUY4NJiBak.woff2' },
  @{ name = 'commissioner-latin.woff2'; url = 'https://fonts.gstatic.com/s/commissioner/v24/tDbw2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8m0akXa.woff2' }
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
