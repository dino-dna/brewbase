Sequel.migration do
  change do
    create_table(:beverage_types) do
      primary_key :id
      String :type, null: false
    end

    create_table(:beverages) do
      primary_key :id
      foreign_key :account_id, :accounts
      foreign_key :beverage_type_id, :beverage_types
      String :name, null: false
      String :description
    end

    create_table(:devices) do
      primary_key :external_id, String
      foreign_key :beverage_id, :beverages
      String :device_value
    end

    create_table(:datas) do
      primary_key :id
      foreign_key :device_external_id, :devices, type: String
      BigDecimal :value, null: false
      DateTime :timestamp
    end
  end
end
