# ===========================================================================
#  ORLA Pedra & Projeto - baixa fotos e fonte para uso local
#  ---------------------------------------------------------------------------
#  Uso (PowerShell, dentro da pasta 06-marmoraria):
#    powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
#
#  Gera:
#    assets/img/<nome>-640.webp e <nome>-1200.webp      (capa: 800, 1600, 2400)
#    assets/fonts/geologica-latin.woff2
#
#  Depois:
#    - fotos: em js/config.js, mude useLocalImages para true
#    - fonte: no index.html, troque o <link> do Google Fonts (e os dois
#      preconnect de fonts.googleapis/gstatic) por
#      <link rel="stylesheet" href="css/fontes-locais.css">
#    - capa: no index.html, troque tambem o src/srcset da <img id="capa-img">
#      e o <link rel="preload"> pelos arquivos assets/img/capa-*.webp
#      (o JS ja faz essa troca, mas o HTML direto carrega mais rapido).
#
#  As fotos sao baixadas na proporcao original (o recorte e feito pelo CSS).
#  Fotos: Licenca Unsplash. Fonte: SIL Open Font License 1.1.
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
  @{ name = 'capa';                 id = 'photo-1610276099118-c929abaaa80a'; widths = @(800, 1600, 2400) },
  @{ name = 'cozinha';              id = 'photo-1772567732923-5ba1956dcd07' },
  @{ name = 'banheiro';             id = 'photo-1754788358645-d6e6cca12e25' },
  @{ name = 'gourmet';              id = 'photo-1762117360868-d4e757073d45' },
  @{ name = 'escada';               id = 'photo-1781047884697-53a3dc4d7eee' },
  @{ name = 'lavatorio';            id = 'photo-1763485956243-50068d04a1ad' },
  @{ name = 'textura-branco';       id = 'photo-1694378061058-bb6532de3bba' },
  @{ name = 'aplicacao-branco';     id = 'photo-1762304817469-1d6c808324ee' },
  @{ name = 'textura-quartzito';    id = 'photo-1603369425250-b276f2006ec0' },
  @{ name = 'aplicacao-quartzito';  id = 'photo-1772567732983-447c7db0ce4e' },
  @{ name = 'textura-travertino';   id = 'photo-1784652587224-062bd5f231bf' },
  @{ name = 'aplicacao-travertino'; id = 'photo-1754127321614-6daec4680c04' },
  @{ name = 'textura-verde';        id = 'photo-1532644440111-bc94f97955c1' },
  @{ name = 'aplicacao-verde';      id = 'photo-1738748444653-2fb1388aef1a' },
  @{ name = 'textura-granito';      id = 'photo-1776278515692-87e1ba3f4d34' },
  @{ name = 'aplicacao-granito';    id = 'photo-1793905228745-958077009bb2' }
)

$falhas = 0
foreach ($i in $images) {
  $widths = if ($i.widths) { $i.widths } else { @(640, 1200) }
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

# Geologica (variavel, subconjunto latin) - mesmo arquivo servido pelo Google Fonts
$fontUrl = 'https://fonts.gstatic.com/s/geologica/v5/oY1P8evIr7j9P3TN9YwNAdyBtzSCKUKdAGOJrVkN3Q.woff2'
$fontOut = Join-Path $fontDir 'geologica-latin.woff2'
try {
  Invoke-WebRequest -Uri $fontUrl -OutFile $fontOut -UseBasicParsing
  Write-Host "ok   geologica-latin.woff2"
} catch {
  $falhas++
  Write-Warning "falhou: geologica-latin.woff2 -> $($_.Exception.Message)"
}

if ($falhas -gt 0) {
  Write-Warning "$falhas arquivo(s) falharam. O site continua funcionando com as versoes remotas."
} else {
  Write-Host ''
  Write-Host 'Pronto. Agora ative useLocalImages em js/config.js e troque o link da fonte no index.html.'
}
