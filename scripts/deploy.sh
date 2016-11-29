#!/usr/bin/env bash
cd gh-pages
git rm -rf .
git clean -fxd

cd ../
hay bale
cp -R build/* gh-pages/
rm -rf build/
cd gh-pages
git add --all
git commit -m "Release at $(date)"
git push
