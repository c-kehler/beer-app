class CreateJoinTableUserBeer < ActiveRecord::Migration[6.0]
  def change
    create_join_table :users, :beers do |t|
      # t.index [:user_id, :beer_id]
      # t.index [:beer_id, :user_id]
    end
  end
end
