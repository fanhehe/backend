# the Server of Fanhehe with `Koa2`

This is a server with nodejs for my own [personal page](http://115.29.49.204/).

- before running, u need start mysql and redis service at your local.
- the service port can be set anyone legal, and u can change configuration at config/

## development flow

* git clone git@github.com/fanhehe/fanhehe.backend && cd fanhehe.backend
* git submodule update --init
* cp config/deploy.json config/local.json
* cnpm install
* npm run compiler
* npm run dev

## deploy flow

`...`
