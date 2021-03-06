# Build Stage
FROM node:lts as build

RUN mkdir /tmp/app

WORKDIR /tmp/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Bundle app source
COPY . .

RUN chown -R node ./

USER node

# Run App build within container context
RUN npm install && npm run build

RUN npm prune --production

# Deployable Stage
FROM node:lts

# Create app directory
WORKDIR /usr/src/app

COPY --from=build /tmp/app/node_modules ./node_modules
COPY --from=build /tmp/app/public ./public
COPY --from=build /tmp/app/build ./build
COPY --from=build /tmp/app/package.json ./package.json

EXPOSE 3030

CMD [ "node", "./build/.core/index.js" ]
