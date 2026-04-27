# =====================================================================
# VS Services - Generate Android App Icons from logo
# Run from project root:  powershell -ExecutionPolicy Bypass -File GENERATE_ICONS.ps1
#
# IMPORTANT: place your logo at:
#   mobile-apk\www\assets\vs-services-logo.png
# This script uses that one file for BOTH apps.
# Best results: square image (1080x1080+), with logo centered.
# If your logo already has its own background (like the new VS SERVICES one),
# the script uses it as-is. Otherwise it adds a navy bg.
# =====================================================================

Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Drawing.Imaging

$source = Join-Path $PSScriptRoot "mobile-apk\www\assets\vs-services-logo.png"
if (-not (Test-Path $source)) {
    Write-Host "Source logo not found: $source" -ForegroundColor Red
    Write-Host "Save your VS SERVICES logo image as: $source" -ForegroundColor Yellow
    exit 1
}

# Detect: does the source already have a colored (non-transparent) background?
$logoForDetection = [System.Drawing.Image]::FromFile($source)
$detectBmp = New-Object System.Drawing.Bitmap($logoForDetection)
# Check corners — if alpha > 200 on all 4, treat as having own background
$pxTL = $detectBmp.GetPixel(2, 2)
$pxTR = $detectBmp.GetPixel($detectBmp.Width - 3, 2)
$pxBL = $detectBmp.GetPixel(2, $detectBmp.Height - 3)
$pxBR = $detectBmp.GetPixel($detectBmp.Width - 3, $detectBmp.Height - 3)
$hasOwnBg = ($pxTL.A -gt 200) -and ($pxTR.A -gt 200) -and ($pxBL.A -gt 200) -and ($pxBR.A -gt 200)
$detectBmp.Dispose()
$logoForDetection.Dispose()

Write-Host "Source has own background: $hasOwnBg" -ForegroundColor Cyan

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
        $g.PixelOffsetMode = 'HighQuality'

        if ($hasOwnBg) {
            # Use the logo image as-is (it has its own bg)
            $g.DrawImage($logo, 0, 0, $d.size, $d.size)
        } else {
            $g.Clear($t.bg)
            # Logo at 80% of canvas, centered
            $logoSize = [int]($d.size * 0.80)
            $offset = [int](($d.size - $logoSize) / 2)
            $g.DrawImage($logo, $offset, $offset, $logoSize, $logoSize)
        }
        $g.Dispose()

        $bmp.Save((Join-Path $folder "ic_launcher.png"), [System.Drawing.Imaging.ImageFormat]::Png)
        $bmp.Save((Join-Path $folder "ic_launcher_round.png"), [System.Drawing.Imaging.ImageFormat]::Png)
        $bmp.Dispose()
        Write-Host "  $($d.name) -> $($d.size)x$($d.size)"
    }

    # ---- Adaptive icon foreground (transparent center, larger logo with safe-zone) ----
    foreach ($d in $fgDensities) {
        $folder = Join-Path $resPath $d.name
        if (-not (Test-Path $folder)) { New-Item -ItemType Directory -Path $folder | Out-Null }

        $bmp = New-Object System.Drawing.Bitmap($d.size, $d.size)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.SmoothingMode = 'AntiAlias'
        $g.InterpolationMode = 'HighQualityBicubic'
        $g.PixelOffsetMode = 'HighQuality'
        $g.Clear([System.Drawing.Color]::Transparent)

        # foreground logo at ~66% of canvas (safe zone for masked icons)
        $logoSize = [int]($d.size * 0.66)
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

Write-Host "`nAll done! Now rebuild the APK:" -ForegroundColor Green
Write-Host "  cd mobile-apk\android && gradlew.bat assembleDebug" -ForegroundColor White
Write-Host "  cd admin-apk\android && gradlew.bat assembleDebug" -ForegroundColor White
