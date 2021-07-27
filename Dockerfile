FROM node:16-alpine as builder
WORKDIR /root
COPY ./ ./
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
  && apk update --no-cache \
  && apk upgrade --no-cache \
  && yarn config set registry https://registry.npm.taobao.org \
  && yarn \
  && yarn build \
  && rm -rf node_modules 

FROM node:16-alpine
WORKDIR /root
COPY --from=builder /root/ /root/
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
  && apk update --no-cache \
  && apk upgrade --no-cache \
  && yarn config set registry https://registry.npm.taobao.org \
  && yarn --production
ENV NODE_ENV="production"
EXPOSE 3001
CMD [ "node", "dist/app.js" ]