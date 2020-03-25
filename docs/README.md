# DIGITEC technical documentation

Below you will find details regarding technical aspects of the project. The information below is targeting developers who are to develop and maintain the code of the project.

## Architecture overview

The project follows the [JAMstack](https://www.netlify.com/jamstack/) architecture pattern. Everything related the project such as content and code is stored in a Github repository.

The stack is composed of the following:

- [Node.js](https://nodejs.org/en/) language and development framework and tool-chain
- [Gatsby.js](https://www.gatsbyjs.org/) for development of a PWA static website
- [Drone 0.8](https://0-8-0.docs.drone.io/) CI/CD
- [Netlify](https://www.netlify.com/) for staging/test environment
- [Netlify CMS](https://www.netlifycms.org/) for content management

Gatsby.js provides a framework for creating highly-optimised and performant [progressive web application](https://en.wikipedia.org/wiki/Progressive_web_application).

Having the so called JAMstack architecture enables developers to swap core dependencies and maintain content to be separate from code.

For example: Gatsby can be replaced by Jekyll for building a static site making use of same content managed by Netlify CMS. It's also possible to swap Netlify CMS by Drupal and "source" content in Gatsby.js through Drupal's JSON API.

## Branching model

Project code and content of DIGITEC 2018 and later is be hosted in a single Github repository: `https://github.com/ec-europa/digitec`

In order to preserve history and assets through time, the following branching model is to be followed:

- After completion of each event it should have its own branch: `2018` for example. And when 2020 is to be archived, it will be stored at `2020`.
- Gitflow is to be followed during development: `develop` is the starting and most active branch, whereas `master` is what is to be published on `https://europa.eu/digitec`. Development happens on branches off `develop`.
- Content management is based on [Netlify CMS](https://www.netlifycms.org/) and latest content should be committed to `develop` similarly to code changes.

It's important to keep both latest code and content in `develop` branch in order to have a view of the latest "full picture".

## Validation workflows

Regardless whether you need to validate content or code changes, start off `develop` branch and target it for demonstrating your changes.

If you are a developer and you need to preview your code changes, open the pull request details and see the preview built by Drone. (similarly to ECL)

Changes in content done in the Netlify CMS go directly to `develop` branch and Drone builds and deploys these changes to `https://digitec.netlify.com/`.

## Deployment workflows

When code and content changes are accepted on the `develop` branch and its state is ready to go to production, [create a new release](https://github.com/ec-europa/digitec/releases). Drone will build and deliver the validated state to production `https://europa.eu/digitec`.
