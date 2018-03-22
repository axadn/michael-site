# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(email: 'admin@example.com', first_name: 'Michael', last_name: 'Lee',
    password: 'password', is_admin: true)

Product.create(title: "Default Underwear", description: "sexy underwear. comfortable underwear",
    category: "underwear", price: 30.5, active: true)

Product.create(title: "Invisible Underwear", description: "sexy underwear. comfortable underwear",
    category: "underwear", price: 30.5, active: false)
