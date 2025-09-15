@echo off
setlocal enabledelayedexpansion

:: Set root directory (default to "..\public" if not provided)
set "ROOT_DIR=%~1"
if "%ROOT_DIR%"=="" set "ROOT_DIR=..\public"

:: Set exclusion patterns (space-separated substrings)
set "EXCLUDE_PATTERNS=%~2"

:: Recursively process image files
for /R "%ROOT_DIR%" %%F in (*.jpg *.jpeg *.png *.webp) do (
    set "FILE=%%~fF"
    set "NAME=%%~nxF"
    set "SKIP=false"

    :: Check each exclusion pattern against filename only
    for %%P in (%EXCLUDE_PATTERNS%) do (
        echo !NAME! | findstr /i "%%P" >nul
        if not errorlevel 1 (
            set "SKIP=true"
        )
    )

    if "!SKIP!"=="false" (
        echo Deleting: !FILE!
        del /f /q "!FILE!"
    ) else (
        echo Keeping: !NAME!
    )
)

echo ✅ Cleanup complete. All non-matching files deleted.
