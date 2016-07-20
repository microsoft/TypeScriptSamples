@echo off & setlocal EnableDelayedExpansion

if "%1"=="" (
   goto :Help
) 

goto :Start


:Help
Echo **********************************************************
Echo Usage:
Echo         buildall.cmd tscPath
Echo Example:
Echo         buildall c:\typescript\built\local\tsc.js
Echo **********************************************************
goto :Done


:Start
set tscPath=%1
set CURRENTDIR=%~dp0

call :buildProject "amd" "--sourcemap --module amd %CURRENTDIR%amd\app.ts"
call :buildProject "d3" "--sourcemap %CURRENTDIR%d3\data.ts"
call :buildProject "greeter" "--sourcemap %CURRENTDIR%greeter\greeter.ts"
call :buildProject "imageboard" "--sourcemap --module commonjs %CURRENTDIR%imageboard\app.ts"
call :buildProject "interfaces" "--sourcemap %CURRENTDIR%interfaces\interfaces.ts"
call :buildProject "jquery" "--sourcemap --target ES5 %CURRENTDIR%jquery\parallax.ts"
call :buildProject "mankala" "Driver.ts --sourcemap -out %CURRENTDIR%mankalagame.js"
call :buildProject "node" "--sourcemap --module commonjs %CURRENTDIR%node\HttpServer.ts"
call :buildProject "node" "--sourcemap --module commonjs %CURRENTDIR%node\TcpServer.ts"
call :buildProject "raytracer" "--sourcemap %CURRENTDIR%raytracer\raytracer.ts"
call :buildProject "simple" "--sourcemap %CURRENTDIR%simple\animals.ts"
call :buildProject "todomvc" "--sourcemap %CURRENTDIR%todomvc\js\todos.ts"
call :buildProject "warship" "--sourcemap --target ES5 %CURRENTDIR%warship\warship.ts"

goto :Done

:buildProject
pushd %CURRENTDIR%%~1
echo Running %~1 using node...

echo on
call node "%tscPath%" %~2
echo off

if not %errorlevel%==0 (
    echo Failed!
) else (
    echo Done.
)

echo Running %~1 using cscript...

echo on
call cscript /nologo "%tscPath%" %~2
echo off

if not %errorlevel%==0 (
    echo Failed!
) else (
    echo Done.
)

popd
goto :eof


:Done
ENDLOCAL