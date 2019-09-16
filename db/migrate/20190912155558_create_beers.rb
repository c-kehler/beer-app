class CreateBeers < ActiveRecord::Migration[6.0]
  def change
    create_table :beers do |t|
      t.string :breweryname
      t.string :name
      t.string :image
      t.string :abv
      t.string :ibu
      t.string :description
      t.string :rating
      t.float :review
      t.timestamps
    end
  end
end
