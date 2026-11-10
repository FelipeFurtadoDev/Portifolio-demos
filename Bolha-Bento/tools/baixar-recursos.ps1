# ===========================================================================
#  BOLHA & BENTO - baixa fotos e fontes para uso local
#  ---------------------------------------------------------------------------
#  Uso (PowerShell, dentro da pasta 05-estetica-pet):
#    powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
#
#  Gera:
#    assets/img/<nome>-640.webp e <nome>-1200.webp  (hero: 800 e 1600)  -> 20 arquivos
#    assets/fonts/fraunces-latin.woff2, fraunces-italic-latin.woff2,
#                 figtree-latin.woff2                                    -> 3 arquivos
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
  @{ name = 'hero';        id = 'photo-1709771818873-57feeea88f41'; widths = @(800, 1600) },
  @{ name = 'banho';       id = 'photo-1597595735781-6a57fb8e3e3d' },
  @{ name = 'tosa';        id = 'photo-1719464454959-9cf304ef4774' },
  @{ name = 'banheira';    id = 'photo-1647002380358-fc70ed2f04e0' },
  @{ name = 'turbante';    id = 'photo-1611173622933-91942d394b04' },
  @{ name = 'toalha';      id = 'photo-1581887936036-3f4f7f0b6679' },
  @{ name = 'gato';        id = 'photo-1589443665283-fcd73c585b01' },
  @{ name = 'salao';       id = 'photo-1528846104175-4fd300ee59da' },
  @{ name = 'ferramentas'; id = 'photo-1559693555-d143b5b713ed' },
  @{ name = 'pelo';        id = 'photo-1588269845464-8993565cac3a' }
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

# Fontes: le o CSS do Google Fonts (com agente de navegador moderno, para vir woff2)
# e baixa apenas os blocos "latin".
$ua  = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
$css = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,500..900,0..100;1,9..144,500..900,0..100&family=Figtree:wght@400..700&display=swap'
try {
  $texto = (Invoke-WebRequest -Uri $css -UserAgent $ua -UseBasicParsing).Content
  $blocos = [regex]::Matches($texto, '/\* latin \*/\s*@font-face\s*\{(?<b>[^}]+)\}')
  foreach ($m in $blocos) {
    $b = $m.Groups['b'].Value
    $fam = [regex]::Match($b, "font-family:\s*'([^']+)'").Groups[1].Value.ToLower()
    $estilo = [regex]::Match($b, 'font-style:\s*(\w+)').Groups[1].Value
    $url = [regex]::Match($b, 'url\(([^)]+)\)').Groups[1].Value
    $nome = if ($estilo -eq 'italic') { "$fam-italic-latin.woff2" } else { "$fam-latin.woff2" }
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
