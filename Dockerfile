FROM node:16-alpine
WORKDIR /root
COPY ./ ./
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
  && apk update \
  && apk upgrade \
  # && npm config set registry https://registry.npm.taobao.org \
  && npm install \
  && npm run build 
EXPOSE 3001
CMD [ "node", "dist/app.js" ]