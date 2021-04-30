[![Build Status](https://travis-ci.org/MissingMaps/users.svg?branch=master)](https://travis-ci.org/MissingMaps/users)

# Missing Maps Users Profiles

This repo contains the _User Page_ component of the missingmaps website that are not part of the Jekyll build and can be tested independently.

## Adding New Badges

Documentation on adding new badges to the MissingMaps User pages can be [found here.](https://github.com/AmericanRedCross/osm-stats/blob/master/documentation/Adding_Badges.md)

## Developing

```
npm install
npm start
```

## Building

```
npm run build-dev
```

## Deployment

For the Travis-CI connection, a GitHub personal access token with 'public_repo - Access public repositories' permissions created and added via `travis encrypt GH_TOKEN=my_github_token --add env.matrix` as described in the [Travis-CI docs](https://docs.travis-ci.com/user/environment-variables#Encrypting-environment-variables).