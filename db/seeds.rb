# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user1 = User.create(username: "AlexThomps",password:"password",email:"alex@mail.com")
user2 = User.create(username: "ChrisThomps",password:"password",email:"chris@mail.com")
beer1 = Beer.create(name: "IPA")
beer2 = Beer.create(name: "PALE")
user1.beers.push(beer1)
user2.beers.push(beer2)