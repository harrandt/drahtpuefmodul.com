FROM node:18 as builder

ARG APP

RUN npm install -g pnpm@8.5.1
WORKDIR /home/app
COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY libs libs
COPY tsconfig.base.json nx.json ./
COPY apps/${APP} apps/${APP}
RUN pnpm build ${APP}


FROM nginx:1.23-alpine
RUN rm /etc/nginx/conf.d/default.conf
ARG APP
COPY --from=builder /home/app/dist/apps/${APP} /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
USER nginx
