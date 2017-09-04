require_relative 'models'
require_relative '.env.rb'
require 'roda'
require 'rodauth'
require 'securerandom'
require 'sequel'
require 'jwt'

class Brewbase < Roda
  secret = ENV.fetch('SEKRETZ', SecureRandom.random_bytes(30))
  use Rack::Session::Cookie, secret: secret, key: '_beer_stream'

  plugin :rodauth, json: :only do
    db DB
    enable :create_account, :login, :logout, :jwt
    require_login_confirmation? { false }
    require_password_confirmation? { false }
    jwt_secret secret
  end
  plugin :symbol_status

  route do |r|
    r.on 'api' do
      r.rodauth
      rodauth.require_authentication

      r.on 'beverage', Integer, method: :get do |beverage_id|
        @beverage = Beverage.first(id: beverage_id)

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
