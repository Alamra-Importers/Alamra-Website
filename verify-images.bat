@echo off
echo Verifying WebP image files...

echo.
echo Checking main logo files:
if exist "public\alamra_compressed.webp" (
    echo ✓ alamra_compressed.webp exists
) else (
    echo ✗ alamra_compressed.webp missing
)

if exist "public\logo-black_compressed.webp" (
    echo ✓ logo-black_compressed.webp exists
) else (
    echo ✗ logo-black_compressed.webp missing
)

if exist "public\logo-gold-small_compressed.webp" (
    echo ✓ logo-gold-small_compressed.webp exists
) else (
    echo ✗ logo-gold-small_compressed.webp missing
)

echo.
echo Checking product category images:
set /a count=0

for %%d in (bullion_crests patches aiguillette braids flags banners) do (
    echo Checking %%d directory:
    for %%f in ("public\%%d\*_compressed.webp") do (
        echo   ✓ %%~nxf
        set /a count+=1
    )
)

echo.
echo Total WebP images found: %count%
echo.
echo If any files are missing, run compress-images.bat to regenerate them.
pause