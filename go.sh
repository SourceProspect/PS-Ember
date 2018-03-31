. ~/.nvm/nvm.sh
nvm i --lts
nvm use --lts

mv dist docs;
git add docs -f;
git commit -am "prod build";
git push;

# serve things
#fuser -k 8080/tcp
#http-server ./docs & # run in background for fun
surge --domain prospectsource.surge.sh ./docs