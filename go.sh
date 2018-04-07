echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

rm -rf dist docs;
ember build --environment=production
mv dist docs;
git add docs -f;
git commit -am "prod build";
git push;

npm i -g http-server surge
# serve things
fuser -k 8080/tcp
http-server ./docs & # run in background for fun
surge --domain prospectsource.surge.sh ./docs
