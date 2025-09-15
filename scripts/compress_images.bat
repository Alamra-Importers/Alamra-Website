@echo off
setlocal enabledelayedexpansion

:: Set root directory (default to "..\" if not provided)
set "ROOT_DIR=%~1"
if "%ROOT_DIR%"=="" set "ROOT_DIR=..\"

:: Recursively process image files
for /R "%ROOT_DIR%" %%F in (*.jpg *.jpeg *.png) do (
    set "FILE=%%~fF"
    set "DIR=%%~dpF"
    set "NAME=%%~nF"
    set "EXT=%%~xF"
    set "OUT=!DIR!!NAME!_compressed!EXT!"

    echo Compressing: !FILE! → !OUT!
    ffmpeg -i "!FILE!" -q:v 20 "!OUT!"
)

echo All images compressed and saved with "_compressed" suffix.
