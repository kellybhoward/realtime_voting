class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
        t.integer :php
        t.integer :javascript
        t.integer :ruby

      t.timestamps
    end
  end
end
