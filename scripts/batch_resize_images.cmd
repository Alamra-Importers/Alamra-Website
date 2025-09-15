@echo off
setlocal enabledelayedexpansion

:: Set root directory (default to "..\public" if not provided)
set "ROOT_DIR=%~1"
if "%ROOT_DIR%"=="" set "ROOT_DIR=..\public"

:: Set exclusion patterns (space-separated substrings)
set "EXCLUDE_PATTERNS=%~2"

:: Recursively process matching image files
for /R "%ROOT_DIR%" %%F in (*_compressed.jpg *_compressed.jpeg *_compressed.png) do (
    set "SKIP=false"
    set "FILE=%%~fF"
    set "DIR=%%~dpF"
    set "NAME=%%~nxF"  :: This is just the filename + extension

    :: Check each exclusion pattern against NAME only
    for %%P in (%EXCLUDE_PATTERNS%) do (
        echo !NAME! | findstr /i "%%P" >nul
        if not errorlevel 1 (
            set "SKIP=true"
        )
    )

    if "!SKIP!"=="false" (
        set "OUT=!DIR!!NAME:_compressed=!.webp"
        echo Converting: !FILE! → !OUT!
        ffmpeg -y -i "!FILE!" -vf scale=1920:1920 -c:v libwebp -qscale:v 75 "!OUT!"
    ) else (
        echo Skipping excluded file: !NAME!
    )
)

echo ✅ Conversion complete. WebP files saved with 1920x1920 resolution.