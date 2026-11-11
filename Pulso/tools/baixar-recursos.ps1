# ===========================================================================
#  PULSO Auto Care - baixa as fontes para uso local
#  ---------------------------------------------------------------------------
#  Uso (PowerShell, dentro da pasta 09-estetica-automotiva-pulso):
#    powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
#
#  O que faz:
#    1. Pede ao Google Fonts o CSS de Anybody e Instrument Sans (como um Chrome
#       atual, para receber arquivos woff2).
#    2. Baixa o subconjunto "latin" (cobre o portugues) de cada familia.
#    3. Grava em assets/fonts/ e gera css/fontes-locais.css apontando para eles.
#
#  Depois, no index.html, troque os dois <link rel="preconnect"> e o <link> do
#  Google Fonts por:
#    <link rel="stylesheet" href="css/fontes-locais.css">
#
#  Fontes: SIL Open Font License 1.1.
#  Este script nao foi executado no ambiente de desenvolvimento (sem acesso a
#  rede); se o Google mudar o formato do CSS, ele avisa e nao altera nada.
#  So grava dentro desta pasta.
# ===========================================================================

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$root    = Split-Path -Parent $PSScriptRoot
$fontDir = Join-Path $root 'assets\fonts'
$cssOut  = Join-Path $root 'css\fontes-locais.css'
New-Item -ItemType Directory -Force -Path $fontDir | Out-Null

$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'

$familias = @(
  @{ arquivo = 'anybody-latin.woff2';          url = 'https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@100..150,500..900&display=swap' },
  @{ arquivo = 'instrument-sans-latin.woff2';  url = 'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400..700&display=swap' }
)

$saida = @("/* Fontes locais (subconjunto latin). Gerado por tools/baixar-recursos.ps1.`n   Anybody e Instrument Sans: SIL Open Font License 1.1. */`n")
$falhas = 0

foreach ($f in $familias) {
  try {
    $css = (Invoke-WebRequest -Uri $f.url -UserAgent $ua -UseBasicParsing).Content
    $bloco = [regex]::Match($css, '/\* latin \*/\s*@font-face\s*\{[^}]*\}')
    if (-not $bloco.Success) { throw 'bloco latin nao encontrado no CSS do Google Fonts' }
    $woff2 = [regex]::Match($bloco.Value, 'url\((https://[^)]+\.woff2)\)')
    if (-not $woff2.Success) { throw 'URL woff2 nao encontrada' }
    $destino = Join-Path $fontDir $f.arquivo
    Invoke-WebRequest -Uri $woff2.Groups[1].Value -OutFile $destino -UseBasicParsing
    $novo = $bloco.Value -replace 'url\(https://[^)]+\.woff2\)', ('url("../assets/fonts/' + $f.arquivo + '")')
    $saida += $novo
    Write-Host ('ok   ' + $f.arquivo + ' (' + [math]::Round((Get-Item $destino).Length / 1KB) + ' KB)')
  } catch {
    $falhas++
    Write-Warning ('falhou: ' + $f.arquivo + ' -> ' + $_.Exception.Message)
  }
}

if ($falhas -eq 0) {
  Set-Content -Path $cssOut -Value ($saida -join "`n`n") -Encoding UTF8
  Write-Host ''
  Write-Host 'Pronto. Em index.html, troque o link do Google Fonts por css/fontes-locais.css.'
} else {
  Write-Warning "$falhas arquivo(s) falharam. Nada foi alterado em css/fontes-locais.css; o site continua usando o Google Fonts."
}
