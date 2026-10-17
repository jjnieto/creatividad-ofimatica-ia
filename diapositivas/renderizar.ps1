# Exporta cada diapositiva de una presentación a PNG con PowerPoint, para revisarlas.
# Uso: powershell -File renderizar.ps1 bloque1.pptx [carpeta_salida]
param(
  [Parameter(Mandatory = $true)][string]$Presentacion,
  [string]$Salida = "render"
)
$src = (Resolve-Path $Presentacion).Path
if (Test-Path $Salida) { Remove-Item -Recurse -Force $Salida -Confirm:$false }
$out = (New-Item -ItemType Directory -Force $Salida).FullName
$pp = New-Object -ComObject PowerPoint.Application
$p = $pp.Presentations.Open($src, $true, $false, $false)
$i = 1
foreach ($s in $p.Slides) {
  $s.Export((Join-Path $out ("s{0:D2}.png" -f $i)), "PNG", 1600, 900)
  $i++
}
$p.Close()
# PowerPoint es una única instancia: si el usuario tiene otras presentaciones abiertas, no se cierra.
if ($pp.Presentations.Count -eq 0) { $pp.Quit() }
Write-Output "$($i - 1) diapositivas en $out"
