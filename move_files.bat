@echo off
title Yojanta Documentation Organizer

set SRC=C:\Users\laksh\Downloads\File
set DEST=C:\Users\laksh\OneDrive\Desktop\Projects\MP\Yojanta

echo.
echo ================================
echo   Moving Yojanta Documentation
echo ================================
echo.

:: Root Files
move /Y "%SRC%\Yojanta_README.md" "%DEST%\README.md"
move /Y "%SRC%\CONTRIBUTING.md" "%DEST%\"
move /Y "%SRC%\CHANGELOG.md" "%DEST%\"
move /Y "%SRC%\CODE_OF_CONDUCT.md" "%DEST%\"
move /Y "%SRC%\LICENSE" "%DEST%\"
move /Y "%SRC%\SECURITY.md" "%DEST%\"
move /Y "%SRC%\INSTALLATION.md" "%DEST%\"
move /Y "%SRC%\DEPLOYMENT.md" "%DEST%\"
move /Y "%SRC%\TESTING.md" "%DEST%\"

:: GitHub
move /Y "%SRC%\bug_report.md" "%DEST%\.github\ISSUE_TEMPLATE\"
move /Y "%SRC%\feature_request.md" "%DEST%\.github\ISSUE_TEMPLATE\"
move /Y "%SRC%\PULL_REQUEST_TEMPLATE.md" "%DEST%\.github\"
move /Y "%SRC%\ci.yml" "%DEST%\.github\workflows\"

:: Documentation
move /Y "%SRC%\API.md" "%DEST%\docs\"
move /Y "%SRC%\ARCHITECTURE.md" "%DEST%\docs\"
move /Y "%SRC%\user-manual.md" "%DEST%\docs\"

:: Report
move /Y "%SRC%\Yojanta_Complete_Documentation.docx" "%DEST%\docs\report\"
move /Y "%SRC%\Yojanta_Technical_Docs.md" "%DEST%\docs\report\"

:: Database
move /Y "%SRC%\mongoose-schemas.md" "%DEST%\database\schema\"
move /Y "%SRC%\sample-users.json" "%DEST%\database\sample-data\"
move /Y "%SRC%\sample-schemes.json" "%DEST%\database\sample-data\"

:: API Collection
move /Y "%SRC%\Yojanta.postman_collection.json" "%DEST%\api\postman-collection\"

:: Diagrams
move /Y "%SRC%\activity-diagram.md" "%DEST%\diagrams\activity-diagram\"
move /Y "%SRC%\class-diagram.md" "%DEST%\diagrams\class-diagram\"
move /Y "%SRC%\component-diagram.md" "%DEST%\diagrams\component-diagram\"
move /Y "%SRC%\deployment-diagram.md" "%DEST%\diagrams\deployment-diagram\"
move /Y "%SRC%\er-diagram.md" "%DEST%\diagrams\er-diagram\"
move /Y "%SRC%\flowcharts.md" "%DEST%\diagrams\flowcharts\"
move /Y "%SRC%\sequence-diagrams.md" "%DEST%\diagrams\sequence-diagram\"
move /Y "%SRC%\use-case-diagram.md" "%DEST%\diagrams\use-case\"

:: Assets
move /Y "%SRC%\tech-stack.svg" "%DEST%\assets\"

echo.
echo =========================================
echo All available files have been moved.
echo =========================================
echo.

git -C "%DEST%" status

echo.
pause