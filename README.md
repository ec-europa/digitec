# DIGITEC

Deploys for digitec: https://app.netlify.com/sites/digitec/deploys

## Getting Started (Recommended)

### Access Locally

```
yarn
yarn develop
```

Check the local website at: http://localhost:8000/
Or GraphiQL: http://localhost:8000/___graphql

To test Netlify CMS locally, you'll need run a production build of the site:

```
yarn build
yarn serve
```

Open the admin panel: http://localhost:9000/admin/

### Build a release

Delete the cache and previous build:

```
rm -rf .cache public
```

Build the website with the prefixes:

```
gatsby build --prefix-paths
```
