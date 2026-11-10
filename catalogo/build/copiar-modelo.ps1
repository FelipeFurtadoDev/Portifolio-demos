# ===========================================================================
#  Copia (ou atualiza) um modelo de Portifolio-landing-pages para o catalogo.
#  ---------------------------------------------------------------------------
#  Uso (PowerShell, na pasta Portifolio-demos):
#
#    powershell -ExecutionPolicy Bypass -File catalogo\build\copiar-modelo.ps1 -Origem 06-marmoraria -Destino Orla
#
#    -Origem   nome da pasta em Portifolio-landing-pages (ex.: 06-marmoraria)
#    -Destino  nome da pasta no catalogo, que vira o endereco do site
#              (ex.: Orla -> .../Portifolio-demos/Orla/). Use letras, numeros
#              e hifens, sem acentos nem espacos. Maiusculas contam.
#    -Landing  (opcional) caminho de Portifolio-landing-pages, se ela nao
#              estiver ao lado de Portifolio-demos.
#
#  O que faz:
#    - espelha a pasta de origem no destino (arquivos apagados na origem
#      tambem saem do destino), ignorando .git, node_modules e temporarios;
#    - copia o modelo.json da origem. Se a origem nao tiver um, mantem o do
#      destino; se nenhum dos dois tiver, cria um modelo.json basico;
#    - nao faz commit nem push. Depois de rodar, use o GitHub Desktop.
#
#  Grava somente dentro de Portifolio-demos\<Destino>.
# ===========================================================================

param(
  [Parameter(Mandatory = $true)][string]$Origem,
  [Parameter(Mandatory = $true)][string]$Destino,
  [string]$Landing
)

$ErrorActionPreference = 'Stop'

$demos = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)   # catalogo\build -> raiz do repositorio
if (-not $Landing) { $Landing = Join-Path (Split-Path -Parent $demos) 'Portifolio-landing-pages' }

function Parar($msg) { Write-Host ""; Write-Host "ERRO: $msg" -ForegroundColor Red; exit 1 }

# --- Validacoes -----------------------------------------------------------
$src = Join-Path $Landing $Origem
if (-not (Test-Path -LiteralPath $src -PathType Container)) { Parar "pasta de origem nao encontrada: $src" }
if (-not (Test-Path -LiteralPath (Join-Path $src 'index.html'))) { Parar "a origem nao tem index.html: $src" }

if ($Destino -notmatch '^[A-Za-z0-9][A-Za-z0-9-]*$') {
  Parar "nome de destino invalido: '$Destino'. Use letras sem acento, numeros e hifens (ex.: Bolha-Bento)."
}
$reservados = 'catalogo','assets','css','js','scripts','node_modules','img','imagens','images','fonts','fontes',
              'docs','vendor','dist','build','tools','ferramentas','src','public','static','templates','test',
              'tests','tmp','temp'
if ($reservados -contains $Destino.ToLower()) { Parar "'$Destino' e um nome reservado do catalogo. Escolha outro." }

# Mesma pasta com grafia diferente (Orla x orla) quebraria o endereco publicado.
$existente = Get-ChildItem -LiteralPath $demos -Directory | Where-Object { $_.Name -ieq $Destino }
if ($existente -and $existente.Name -cne $Destino) {
  Parar "ja existe '$($existente.Name)' no catalogo. Use exatamente esse nome (maiusculas contam) ou renomeie a pasta antes."
}

$dst = Join-Path $demos $Destino
$novo = -not (Test-Path -LiteralPath $dst)

# --- Copia ----------------------------------------------------------------
Write-Host "Origem : $src"
Write-Host "Destino: $dst $(if ($novo) { '(novo)' } else { '(atualizacao)' })"

robocopy $src $dst /MIR /XD .git node_modules .vscode /XF modelo.json *.tmp *.log *.bak Thumbs.db desktop.ini /NFL /NDL /NJH /NJS /NP | Out-Null
if ($LASTEXITCODE -ge 8) { Parar "robocopy falhou (codigo $LASTEXITCODE)." }

# --- modelo.json ----------------------------------------------------------
$jsonSrc = Join-Path $src 'modelo.json'
$jsonDst = Join-Path $dst 'modelo.json'
if (Test-Path -LiteralPath $jsonSrc) {
  Copy-Item -LiteralPath $jsonSrc -Destination $jsonDst -Force
  Write-Host "modelo.json copiado da origem."
} elseif (Test-Path -LiteralPath $jsonDst) {
  Write-Host "modelo.json mantido (a origem nao tem um)."
} else {
  $base = @"
{
  "marca": "$Destino",
  "segmento": "Segmento do modelo",
  "descricao": "Uma ou duas frases sobre o negocio e a linguagem visual do modelo.",
  "caracteristicas": [
    "Recurso principal da pagina",
    "Outro recurso"
  ],
  "ordem": 900
}
"@
  [IO.File]::WriteAllText($jsonDst, $base, (New-Object Text.UTF8Encoding($false)))
  Write-Host "modelo.json basico criado. Edite os textos e as cores antes do push." -ForegroundColor Yellow
}

# --- Conferencias -----------------------------------------------------------
try { Get-Content -LiteralPath $jsonDst -Raw -Encoding UTF8 | ConvertFrom-Json | Out-Null }
catch { Write-Host "AVISO: modelo.json com erro de sintaxe: $($_.Exception.Message)" -ForegroundColor Yellow }

$absolutos = Select-String -Path (Join-Path $dst 'index.html') -Pattern '(href|src)="/[^/]' -List
if ($absolutos) { Write-Host "AVISO: index.html tem caminho iniciado por '/', que quebra no GitHub Pages: $($absolutos.Line.Trim())" -ForegroundColor Yellow }

Write-Host ""
Write-Host "Pronto. Proximos passos:" -ForegroundColor Green
Write-Host "  1. (opcional) Live Server: http://127.0.0.1:5500/$Destino/"
Write-Host "  2. GitHub Desktop: Commit to main e Push origin."
Write-Host "  3. Aba Actions do repositorio: aguarde 'Publicar catalogo' terminar e atualize o site com Ctrl+F5."
