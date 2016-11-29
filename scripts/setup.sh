#!/usr/bin/env bash
mkdir gh-pages
cd gh-pages
git clone git@github.com:hayjs/hay.js.org.git .
git checkout origin/gh-pages -b gh-pages
git branch -d master

