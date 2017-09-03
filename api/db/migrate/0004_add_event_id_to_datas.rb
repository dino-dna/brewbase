Sequel.migration do
  change do
    add_column :datas, :event_id, String
  end
end
