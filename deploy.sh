#!/bin/bash
git checkout main && \
(git branch -D dist || true) && \
git checkout -b dist && \
rm .gitignore && \
python tools/process.py && \
git add projects/treecat/src/app/filters/list_consts.ts || true && \
npm run build-staging && \
cp dist/treecat/browser/index.html dist/treecat/browser/404.html && \
cp CNAME dist/treecat/browser/ || true && \
git add dist/treecat/browser && \
git commit -m dist && \
(git branch -D gh-pages || true) && \
git subtree split --prefix dist/treecat/browser -b gh-pages && \
git push -f origin gh-pages:gh-pages && \
git checkout main && \
git branch -D gh-pages && \
git branch -D dist && \
git checkout . 