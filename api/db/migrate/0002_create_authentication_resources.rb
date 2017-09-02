require 'rodauth/migrations'

Sequel.migration do
  up do
    extension :date_arithmetic

    # Used by the account verification and close account features
    create_table(:account_statuses) do
      Integer :id, :primary_key=>true
      String :name, :null=>false, :unique=>true
    end
    from(:account_statuses).import([:id, :name], [[1, 'Unverified'], [2, 'Verified'], [3, 'Closed']])

    create_table(:accounts) do
      primary_key :id, :type=>:Bignum
      foreign_key :status_id, :account_statuses, :null=>false, :default=>1
      citext :email, :null=>false
      constraint :valid_email, :email=>/^[^,;@ \r\n]+@[^,@; \r\n]+\.[^,@; \r\n]+$/
      index :email, :unique=>true, :where=>{:status_id=>[1, 2]}
    end

    deadline_opts = proc do |days|
      {:null=>false, :default=>Sequel.date_add(Sequel::CURRENT_TIMESTAMP, :days=>days)}
    end

    # Used by the password reset feature
    create_table(:account_password_reset_keys) do
      foreign_key :id, :accounts, :primary_key=>true, :type=>:Bignum
      String :key, :null=>false
      DateTime :deadline, deadline_opts[1]
    end

    # Used by the account verification feature
    create_table(:account_verification_keys) do
      foreign_key :id, :accounts, :primary_key=>true, :type=>:Bignum
      String :key, :null=>false
      DateTime :requested_at, :null=>false, :default=>Sequel::CURRENT_TIMESTAMP
    end

    # Used by the verify login change feature
    create_table(:account_login_change_keys) do
      foreign_key :id, :accounts, :primary_key=>true, :type=>:Bignum
      String :key, :null=>false
      String :login, :null=>false
      DateTime :deadline, deadline_opts[1]
    end

    # Used by the remember me feature
    create_table(:account_remember_keys) do
      foreign_key :id, :accounts, :primary_key=>true, :type=>:Bignum
      String :key, :null=>false
      DateTime :deadline, deadline_opts[14]
    end

    # Used by the lockout feature
    create_table(:account_login_failures) do
      foreign_key :id, :accounts, :primary_key=>true, :type=>:Bignum
      Integer :number, :null=>false, :default=>1
    end
    create_table(:account_lockouts) do
      foreign_key :id, :accounts, :primary_key=>true, :type=>:Bignum
      String :key, :null=>false
      DateTime :deadline, deadline_opts[1]
    end

    # Used by the recovery codes feature
    create_table(:account_recovery_codes) do
      foreign_key :id, :accounts, :type=>:Bignum
      String :code
      primary_key [:id, :code]
    end

    create_table(:account_password_hashes) do
      foreign_key :id, :accounts, :primary_key=>true, :type=>:Bignum
      String :password_hash, :null=>false
    end

    Rodauth.create_database_authentication_functions(self)

    user = get{Sequel.lit('current_user')}
    run "REVOKE ALL ON account_password_hashes FROM public"
    run "REVOKE ALL ON FUNCTION rodauth_get_salt(int8) FROM public"
    run "REVOKE ALL ON FUNCTION rodauth_valid_password_hash(int8, text) FROM public"
    run "GRANT INSERT, UPDATE, DELETE ON account_password_hashes TO #{user}"
    run "GRANT SELECT(id) ON account_password_hashes TO #{user}"
    run "GRANT EXECUTE ON FUNCTION rodauth_get_salt(int8) TO #{user}"
    run "GRANT EXECUTE ON FUNCTION rodauth_valid_password_hash(int8, text) TO #{user}"

    # Used by the disallow_password_reuse feature
    create_table(:account_previous_password_hashes) do
      primary_key :id, :type=>:Bignum
      foreign_key :account_id, :accounts, :type=>:Bignum
      String :password_hash, :null=>false
    end
    Rodauth.create_database_previous_password_check_functions(self)

    run "REVOKE ALL ON account_previous_password_hashes FROM public"
    run "REVOKE ALL ON FUNCTION rodauth_get_previous_salt(int8) FROM public"
    run "REVOKE ALL ON FUNCTION rodauth_previous_password_hash_match(int8, text) FROM public"
    run "GRANT INSERT, UPDATE, DELETE ON account_previous_password_hashes TO #{user}"
    run "GRANT SELECT(id, account_id) ON account_previous_password_hashes TO #{user}"
    run "GRANT USAGE ON account_previous_password_hashes_id_seq TO #{user}"
    run "GRANT EXECUTE ON FUNCTION rodauth_get_previous_salt(int8) TO #{user}"
    run "GRANT EXECUTE ON FUNCTION rodauth_previous_password_hash_match(int8, text) TO #{user}"
  end

  down do
    Rodauth.drop_database_previous_password_check_functions(self)
    Rodauth.drop_database_authentication_functions(self)
    drop_table(:account_previous_password_hashes, :account_password_hashes)

    drop_table(:account_recovery_codes,
               :account_lockouts,
               :account_login_failures,
               :account_remember_keys,
               :account_login_change_keys,
               :account_verification_keys,
               :account_password_reset_keys,
               :accounts,
               :account_statuses)
  end
end
