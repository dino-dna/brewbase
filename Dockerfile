FROM ruby:2.4-slim

COPY Gemfile* /usr/src/app/

WORKDIR /usr/src/app

RUN gem install bundler && \
    apt-get update && \
    apt-get install -y build-essential git nodejs libpq-dev && \
    bundle install --deployment

COPY . /usr/src/app

RUN ["chmod", "+x", "bin/serve"]
CMD bin/serve
