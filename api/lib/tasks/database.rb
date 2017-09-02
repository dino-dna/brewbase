namespace :db do
  namespace :migrate do
    desc "Perform migration up to latest migration available"
    task :up, [:db_user] => [:app] do |t, args|
      binding.pry
      Sequel.extension(:migration)
      Sequel::Migrator.run(db(user: args.db_user), "db/migrate")
      puts "<= db:migrate:up executed"
    end

    desc "Perform migration down"
    task :down, [:db_user] => [:app] do |t, args|
      Sequel.extension(:migration)
      Sequel::Migrator.run(db(user: args.db_user), "db/migrate", target: 0)
      puts "<= db:migrate:down executed"
    end
  end

  desc "Perform migration up to latest migration available"
  task migrate: "db:migrate:up"

  desc "Create the database"
  task create: :app do
    config = Sequel::Model.db.opts
    config[:charset] = "utf8" unless config[:charset]
    puts "=> Creating database '#{config[:database]}'"
    create_db(config)
    puts "<= db:create executed"
  end

  desc "Drop the database"
  task drop: :app do
    Sequel::Model.db.disconnect
    config = Sequel::Model.db.opts
    puts "=> Dropping database '#{config[:database]}'"
    drop_db(config)
    puts "<= db:drop executed"
  end
end

def self.create_db(config)
  environment = {}
  environment["PGUSER"]     = config[:user]
  environment["PGPASSWORD"] = config[:password]
  arguments = []
  arguments << "--encoding=#{config[:charset]}" if config[:charset]
  arguments << "--host=#{config[:host]}" if config[:host]
  arguments << "--username=#{config[:user]}" if config[:user]
  arguments << config[:database]
  Process.wait Process.spawn(environment, "createdb", *arguments)
end

def self.drop_db(config)
  environment = {}
  environment["PGUSER"]     = config[:user]
  environment["PGPASSWORD"] = config[:password]
  arguments = []
  arguments << "--host=#{config[:host]}" if config[:host]
  arguments << "--username=#{config[:user]}" if config[:user]
  arguments << config[:database]
  Process.wait Process.spawn(environment, "dropdb", *arguments)
end

def self.db(**args)
  args.delete_if { |_,v| v.nil? }
  connection_opts = {
    adapter: 'postgres',
    database: ENV['DB_NAME'],
    host: ENV['DB_HOST'],
    user: ENV['DB_HOST'],
    password: ENV['DB_PASSWORD'],
    port: ENV['DB_PORT']
  }.merge(args)
  Sequel.connect(connection_opts)
end

