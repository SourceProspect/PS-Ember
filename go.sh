. ~/.nvm/nvm.sh
nvm i --lts

rm -rf dist docs;
ember build --environment=production
mv dist docs;
git add docs -f;
git commit -am "prod build";
git push;

# serve things
fuser -k 8080/tcp
http-server ./docs & # run in background for fun
surge --domain prospectsource.surge.sh ./docs
