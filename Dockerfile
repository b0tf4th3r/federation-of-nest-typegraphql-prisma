FROM node:18 AS base
RUN apt-get update -y
RUN apt-get install -y git
WORKDIR /app
COPY apps ./
COPY run.sh ./
RUN chmod 777 run.sh \
  && ln -s run.sh /
CMD [ "./run.sh" ]
