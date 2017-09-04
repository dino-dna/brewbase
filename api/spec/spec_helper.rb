ENV['RACK_ENV'] = 'test'

require 'rspec'
require_relative '../models'

RSpec.configure do |config|
  config.before(:suite) do
    DB.transaction(rollback: :always) { self }
  end

  config.around(:each) do |example|
    DB.transaction(rollback: :always,
                   savepoint: true,
                   auto_savepoint: true){ example.run }
  end
end

Bundler.require(:default, :test)
