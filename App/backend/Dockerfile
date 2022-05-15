FROM node:16-alpine
COPY . /app
WORKDIR  /app
RUN npm install typescript
RUN npm install
EXPOSE 3001
CMD ["npm", "start"]