require 'bundler'
Bundler.require(:default)
if ENV['RACK_ENV'] == 'development'
  require 'logger'
  logger = Logger.new($stdout)
end

require_relative 'models'
require_relative 'app.rb'
run Brewbase
