# =====================================================================
# VS Services - Generate Android App Icons from car logo
# Run from project root:  powershell -ExecutionPolicy Bypass -File GENERATE_ICONS.ps1
# =====================================================================

Add-Type -AssemblyName System.Drawing

$source = Join-Path $PSScriptRoot "mobile-apk\www\assets\vs-services-logo.png"
if (-not (Test-Path $source)) {
    Write-Host "Source logo not found: $source" -ForegroundColor Red
    exit 1
}

$targets = @(
    @{ app = "mobile-apk"; bg = [System.Drawing.Color]::FromArgb(255,10,25,51) },   # navy
    @{ app = "admin-apk";  bg = [System.Drawing.Color]::FromArgb(255,15,42,71) }    # admin navy
)

$densities = @(
    @{ name="mipmap-mdpi";    size=48 },
    @{ name="mipmap-hdpi";    size=72 },
    @{ name="mipmap-xhdpi";   size=96 },
    @{ name="mipmap-xxhdpi";  size=144 },
    @{ name="mipmap-xxxhdpi"; size=192 }
)

# Foreground sizes for adaptive icon (108dp -> 432px at xxxhdpi)
$fgDensities = @(
    @{ name="mipmap-mdpi";    size=108 },
    @{ name="mipmap-hdpi";    size=162 },
    @{ name="mipmap-xhdpi";   size=216 },
    @{ name="mipmap-xxhdpi";  size=324 },
    @{ name="mipmap-xxxhdpi"; size=432 }
)

foreach ($t in $targets) {
    $resPath = Join-Path $PSScriptRoot "$($t.app)\android\app\src\main\res"
    if (-not (Test-Path $resPath)) {
        Write-Host "Skipping $($t.app) - no android folder yet. Run: cd $($t.app); npx cap add android" -ForegroundColor Yellow
        continue
    }
    Write-Host "`nGenerating icons for $($t.app)..." -ForegroundColor Cyan

    $logo = [System.Drawing.Image]::FromFile($source)

    # ---- Square launcher icons (legacy) ----
    foreach ($d in $densities) {
        $folder = Join-Path $resPath $d.name
        if (-not (Test-Path $folder)) { New-Item -ItemType Directory -Path $folder | Out-Null }

        $bmp = New-Object System.Drawing.Bitmap($d.size, $d.size)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.SmoothingMode = 'AntiAlias'
        $g.InterpolationMode = 'HighQualityBicubic'
        $g.Clear($t.bg)

        # Logo at 80% of canvas, centered
        $logoSize = [int]($d.size * 0.80)
        $offset = [int](($d.size - $logoSize) / 2)
        $g.DrawImage($logo, $offset, $offset, $logoSize, $logoSize)
        $g.Dispose()

        $bmp.Save((Join-Path $folder "ic_launcher.png"), [System.Drawing.Imaging.ImageFormat]::Png)
        $bmp.Save((Join-Path $folder "ic_launcher_round.png"), [System.Drawing.Imaging.ImageFormat]::Png)
        $bmp.Dispose()
        Write-Host "  $($d.name) -> $($d.size)x$($d.size)"
    }

    # ---- Adaptive icon foreground (transparent, larger logo) ----
    foreach ($d in $fgDensities) {
        $folder = Join-Path $resPath $d.name
        if (-not (Test-Path $folder)) { New-Item -ItemType Directory -Path $folder | Out-Null }

        $bmp = New-Object System.Drawing.Bitmap($d.size, $d.size)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.SmoothingMode = 'AntiAlias'
        $g.InterpolationMode = 'HighQualityBicubic'
        $g.Clear([System.Drawing.Color]::Transparent)

        # foreground logo at ~55% of canvas (safe zone)
        $logoSize = [int]($d.size * 0.55)
        $offset = [int](($d.size - $logoSize) / 2)
        $g.DrawImage($logo, $offset, $offset, $logoSize, $logoSize)
        $g.Dispose()

        $bmp.Save((Join-Path $folder "ic_launcher_foreground.png"), [System.Drawing.Imaging.ImageFormat]::Png)
        $bmp.Dispose()
    }

    # ---- adaptive icon XML + colors ----
    $anyDpi = Join-Path $resPath "mipmap-anydpi-v26"
    if (-not (Test-Path $anyDpi)) { New-Item -ItemType Directory -Path $anyDpi | Out-Null }

    $adaptiveXml = @'
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
'@
    $adaptiveXml | Out-File -FilePath (Join-Path $anyDpi "ic_launcher.xml") -Encoding utf8 -Force
    $adaptiveXml | Out-File -FilePath (Join-Path $anyDpi "ic_launcher_round.xml") -Encoding utf8 -Force

    $valuesPath = Join-Path $resPath "values"
    if (-not (Test-Path $valuesPath)) { New-Item -ItemType Directory -Path $valuesPath | Out-Null }
    $hex = "#{0:X2}{1:X2}{2:X2}" -f $t.bg.R, $t.bg.G, $t.bg.B
    $colorXml = @"
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">$hex</color>
</resources>
"@
    $colorXml | Out-File -FilePath (Join-Path $valuesPath "ic_launcher_background.xml") -Encoding utf8 -Force

    $logo.Dispose()
    Write-Host "  Adaptive icon configured ($hex)" -ForegroundColor Green
}

Write-Host "`nDone! Now run BUILD_APK.bat / BUILD_ADMIN_APK.bat to rebuild." -ForegroundColor Green
