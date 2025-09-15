@echo off
setlocal enabledelayedexpansion

:: Set root directory (default to "..\public" if not provided)
set "ROOT_DIR=%~1"
if "%ROOT_DIR%"=="" set "ROOT_DIR=..\public"

:: Recursively process matching image files
for /R "%ROOT_DIR%" %%F in (*_compressed.jpg *_compressed.jpeg *_compressed.png) do (
    set "FILE=%%~fF"
    set "DIR=%%~dpF"
    set "NAME=%%~nF"
    set "OUT=!DIR!!NAME!.webp"

    echo Converting: !FILE! → !OUT!
    ffmpeg -y -i "!FILE!" -c:v libwebp -qscale:v 75 "!OUT!"
)

echo ✅ All matching images converted to WebP and saved in their original subdirectories.
