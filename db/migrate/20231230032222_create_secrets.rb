class CreateSecrets < ActiveRecord::Migration[7.1]
  def change
    create_table :secrets do |t|
      t.text :message
      t.boolean :burned
      t.datetime :burned_at
      t.string :token

      t.timestamps
    end
    add_index :secrets, :token
  end
end
