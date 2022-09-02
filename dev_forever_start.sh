forever stopall
forever stopall
fuser 3333/tcp -k
fuser 3333/tcp -k
#forever start ace serve --watch
rm -vf ~/.forever/log.log
rm -vf ~/.forever/out.log
rm -vf ~/.forever/err.log
forever start -o out.log -e err.log -l log.log ace serve --watch
