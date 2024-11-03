ARG NODE_VERSION

###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:${NODE_VERSION} As development

USER node

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node .npmrc ./

RUN npm i

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:${NODE_VERSION} As build

WORKDIR /usr/src/app

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

ARG NODE_ENV_ARG=production

RUN npm run build

ENV NODE_ENV=$NODE_ENV_ARG

USER node

###################
# PRODUCTION
###################

FROM node:${NODE_VERSION} As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
