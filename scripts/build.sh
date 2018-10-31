#!/bin/sh

# Exit the script on any command with non 0 return code
set -e

# Echo every command being executed
set -x

# Get the news website
echo 'Getting news website project ...'
rm -rf static/digitec-news/
git clone git@github.com:ec-europa/digitec-news.git static/digitec-news

# Go and build it
cd static/digitec-news

echo 'Installing dependencies ...'
yarn install

echo 'Removing previous builds ...'
rm -rf .cache public

echo 'Building news website ...'
npx gatsby build --prefix-paths

echo 'Copying assets into events website ...'
cp -r public/* ../news

echo 'Removing assets'
cd ..
rm -rf digitec-news

echo 'Building events website ...'
cd ..
rm -rf .cache public
npx gatsby build --prefix-paths

echo 'Events website with news and newsletter is available at ./public'
