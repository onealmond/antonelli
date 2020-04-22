FROM docker.io/nginx:1.17
RUN apt-get update -y && apt-get install -y npm
ENV ANTONELLI_ROOT /opt/antonelli
WORKDIR $ANTONELLI_ROOT
RUN npm install -g npm@latest npm-check-updates \
      @vue/cli \
      @vue/cli-service-global

RUN apt-get install -u unzip

COPY package*.json ./
RUN npm install

#COPY babel.config.js ./
COPY vue.config.js ./
COPY public ./public
COPY src ./src

ADD https://use.fontawesome.com/releases/v5.13.0/fontawesome-free-5.13.0-web.zip /tmp
RUN rm -rf src/css/fontawesome &&\
  unzip -d /tmp /tmp/fontawesome-free-5.13.0-web.zip && \
  mv /tmp/fontawesome-free-5.13.0-web src/css/fontawesome && \
  rm -f /tmp/fontawesome-free-5.13.0-web.zip

ARG PRODUCTION
# npm-check-updates -u
RUN npm run build
RUN rm -rf *.js *.json public src node_modules && \
  mv dist/* . && rmdir dist
COPY config/nginx.conf /etc/nginx/nginx.conf
