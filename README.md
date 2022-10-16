# SETUP

```
> git clone https://github.com/membagroup/pdwaas.git
> cd pdwaas
> npm i
extract "@porsche.zip" & move into "node_modules"
> yarn story:dev
```

# Google Doc Notes
https://docs.google.com/document/d/1ak_C1qD3l5kU_MgJq4idDFrpEPYOslp0gcsikvX6H6Q/edit?usp=sharing


# DwaaS - Dealer as a Service

> Frontend implementation of DwaaS build with Vue [![npm](https://img.shields.io/npm/v/vue.svg)](https://www.npmjs.com/package/vue) powered with Vite [![npm](https://img.shields.io/npm/v/vite.svg)](https://www.npmjs.com/package/vite)

## Setting up the Dev Environment

### Install packages

To be able to install all packages related to [Porsche Design System](https://designsystem.porsche.com/v2/components/color/usage) please run `npm run setup` first. This will prompt a login to the registry to authenticate.

This command will automatically install all the packages after authentications is done.

### env variables

In order to define the target path of the build output you can add a `.env.local` file to the main dwaas folder. This is ignored by git so this file stays on your machine but it’s not checked in.

You can set the following environment variables there:

| env variable           | default | description                                                                                     |
| :--------------------- | :------ | :---------------------------------------------------------------------------------------------- |
| `VITE_DWAAS_DIST_DIR`  | `dist`  | an absolute or relative path to the output folder of the build process                          |
| `VITE_DWAAS_BASE_PATH` | `/`     | the base path where the script is stored on the server relative to the root path of the server. |

> To test the solution on directly on your Sitecore instance, this env viariables needs to point to `C:\\inetpub\\wwwroot\\<yourinstance>\\public` path

## Develop

You can run the following npm scripts like `npm run <scriptname>`

| script     | description                                                                                                          |
| :--------- | :------------------------------------------------------------------------------------------------------------------- |
| `dev`      | This will create a watchable version of Vite build without minification or bundle analysis under Sitecore instance   |
| `build`    | This will create a local production of Vite build                                                                    |
| `build:CI` | This command is meant to create a production bundle to be use by Sitecore instance, is used in Production deployment |
