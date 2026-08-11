@echo off
echo Starting Monatomic Clock Backup...

:: Get current date in ddmmmyyyy format (e.g., 21jul2026)
FOR /F "tokens=*" %%g IN ('powershell -NoProfile -Command "(Get-Date).ToString('ddMMMyyyy').ToLower()"') do (SET DateStr=%%g)

set "SourceDir=C:\Users\david\monatomic-clock"
set "DestDir=C:\Users\david\OneDrive\David\ArtWork\Monatomic Clock\backups\%DateStr%"

echo Backing up to: %DestDir%
echo.

:: Use robocopy to copy all files and folders
:: /E copies all subdirectories including empty ones
:: /XD .git node_modules excludes the .git folder and node_modules from being copied (optional but recommended)
:: /XF backup.bat excludes this script from the backup
robocopy "%SourceDir%" "%DestDir%" /E /XD .git node_modules /XF backup.bat

:: Robocopy exit codes below 8 indicate success
if %ERRORLEVEL% LSS 8 (
    echo.
    echo Backup completed successfully!
) else (
    echo.
    echo Backup finished, but there may have been some errors.
)

pause
