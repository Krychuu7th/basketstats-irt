@echo off

echo Building package...
call ng build --base-href /basketstats-irt/ --output-path docs

echo Copy content of browser folder...
call xcopy .\docs\browser .\docs\ /s /i /y

echo Delete browser folder...
call rmdir /s /q .\browser

pause