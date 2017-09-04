require_relative '.env.rb'

require 'sequel'

DB = Sequel.connect(ENV.delete('DATABASE_URL'))
DB.extension :freeze_datasets
