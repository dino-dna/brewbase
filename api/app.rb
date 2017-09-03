require 'roda'
require 'rodauth'
require 'dotenv/load'
require 'securerandom'
require 'sequel'
require 'jwt'
require 'pry'

DB = Sequel.connect(ENV['DATABASE_URL'])
Sequel::Model.db = DB
DB.freeze

Dir['./*.rb'].each { |file| require file }
Dir['./models/*.rb'].each { |file| require file }

class App < Roda
  secret = ENV['SEKRETZ'] || SecureRandom.random_bytes(30)
  use Rack::Session::Cookie, secret: secret, key: '_beer_stream'

  # plugin :render, check_paths: true
  plugin :rodauth, json: :only do
    db DB
    enable :create_account, :login, :logout, :jwt
    jwt_secret secret
  end
  plugin :symbol_status

  route do |r|
    r.rodauth

    r.on 'beverage' do
      rodauth.require_authentication
      r.is ':id' do
        @beverage = 'testing'

        r.get do
          @beverage.to_json
        end
      end
    end

    r.on 'particle' do
      r.post do
        webhook_data = JSON.parse(r.body.read)
        Webhook.process(webhook_data)
        response.status = :accepted
      end
    end
  end
end
