REM echo off

REM get timestamp for naming the output files
set yyyy=%date:~6,4%
set mm=%date:~3,2%
set dd=%date:~0,2%
set hh=%time:~0,2%
if %hh% lss 10 (set hh=0%time:~1,1%)
set nn=%time:~3,2%
set ss=%time:~6,2%
set datestamp=%yyyy%%mm%%dd%
set timestamp=%yyyy%%mm%%dd%
set appname=usw.vocabularymatchingtool

REM combine scripts into single (datestamped) file 
REM done in stages as longer command fell over (probably because of 256 char limit??) 
copy usw.uri.js + usw.util.js + usw.aatlist.js + usw.aatnarrower.js + usw.aatbroader.js + usw.aatrelated.js %appname%.%datestamp%-1.js

copy usw.aatpreflabels.js + usw.aataltlabels.js + usw.aatscopenotes.js + usw.aatconceptdetails.js + usw.aatsearch.js %appname%.%datestamp%-2.js

copy usw.skoslist.js + usw.skosconceptschemes.js + usw.skosnarrower.js + usw.skosbroader.js + usw.skosrelated.js %appname%.%datestamp%-3.js

copy usw.skospreflabels.js + usw.skosaltlabels.js + usw.skosscopenotes.js + usw.skosconceptdetails.js + usw.skossearch.js %appname%.%datestamp%-4.js

copy usw.skosmapping.js + usw.mappingstable.js + usw.fileselect.js + usw.languageselect.js + usw.skosschemeselect.js %appname%.%datestamp%-5.js

copy %appname%.%datestamp%-1.js + %appname%.%datestamp%-2.js + %appname%.%datestamp%-3.js + %appname%.%datestamp%-4.js + %appname%.%datestamp%-5.js %appname%.%datestamp%.js

REM remove intermediate files
del %appname%.%datestamp%-1.js
del %appname%.%datestamp%-2.js
del %appname%.%datestamp%-3.js
del %appname%.%datestamp%-4.js
del %appname%.%datestamp%-5.js

REM minify combined script
jsmin.exe < %appname%.%datestamp%.js > %appname%.%datestamp%-min.js
   