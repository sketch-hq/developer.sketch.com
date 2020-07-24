rm -rf .jekyll-cache
rm -rf _site
rm .jekyll-metadata
docker run --rm --volume="$PWD:/srv/jekyll" -it jekyll/jekyll jekyll build