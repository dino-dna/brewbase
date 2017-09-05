Sequel.migration do
  change do
    create_table(:beers) do
      primary_key :id
      foreign_key :accounts_id, :accounts
      String :name
      String :description
      Float :abv
      Float :gravity
      Integer :ibu
      Float :srm
      String :style
    end

    create_table(:containers) do
      primary_key :id
      foreign_key :accounts_id, :accounts
      foreign_key :beer_id, :beers
      Integer :capacity_ml, null: false
      Integer :volume_ml
      String :gas_type
      Integer :serving_pressure
      String :name
      String :type
    end

    alter_table(:beers){add_foreign_key :container_id, :containers}
    alter_table(:devices){add_foreign_key :container_id, :containers}

    drop_column :devices, :beverage_id

    drop_table :beverages
    drop_table :beverage_types
  end
end
