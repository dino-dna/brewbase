Sequel.migration do
  up do
    run <<-SQL
      CREATE EXTENSION citext;
    SQL
  end

  down do
    run <<-SQL
      DROP EXTENSION citext;
    SQL
  end
end
