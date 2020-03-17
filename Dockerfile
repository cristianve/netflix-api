FROM node:12.2.0-alpine as build

#Create workdir /app
WORKDIR /app
#Variable entonor 
ENV PATH /app/node_modules/.bin:$PATH
#Copy package.json

COPY package.json /app/package.json

#npm install dependecies
RUN npm install 
#npm clean/fix dependecies
RUN npm audit fix

#copy src and public
COPY . /app

#Build
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

# Browser URL : http://localhost:3000/