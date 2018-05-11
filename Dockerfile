FROM containers.cisco.com/it_gats_it_architecture/bmi-node_bmi-node:lastest

WORKDIR /app
COPY ./package.json /app/
RUN npm install
COPY . /app/

RUN chown -R :root /app &&\  
    chmod -R g+rw /app &&\  
    find /app -type d -exec chmod g+x {} +  
USER node

EXPOSE 3000
ENTRYPOINT ["node", "/app/app.js"]