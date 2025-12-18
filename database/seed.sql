USE ecommerce_db;

-- Seed data for eCommerce database
-- Based on provided data.json

-- Clear existing data (using DELETE to avoid foreign key issues)
SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM prices;
DELETE FROM product_attributes;
DELETE FROM attribute_items;
DELETE FROM attribute_sets;
DELETE FROM product_gallery;
DELETE FROM products;
DELETE FROM categories;
SET FOREIGN_KEY_CHECKS = 1;

-- Categories
INSERT INTO categories (id, name) VALUES
(1, 'all'),
(2, 'clothes'),
(3, 'tech');

-- Products
INSERT INTO products (id, name, in_stock, description, category_id, brand) VALUES
('huarache-x-stussy-le', 'Nike Air Huarache Le', 1, '<p>Great sneakers for everyday use!</p>', 2, 'Nike x Stussy'),
('jacket-canada-goosee', 'Jacket', 1, '<p>Awesome winter jacket</p>', 2, 'Canada Goose'),
('ps-5', 'PlayStation 5', 1, '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>', 3, 'Sony'),
('xbox-series-s', 'Xbox Series S 512GB', 0, '<div>\n    <ul>\n        <li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li>\n        <li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li>\n        <li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li>\n        <li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li>\n        <li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</span></li>\n        <li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li>\n        <li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li>\n        <li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li>\n        <li><span>Verwende dein Xbox One-Gaming-Zubehör -Loss einschließlich Controller, Headsets und mehr</span></li>\n        <li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies & TV und mehr</span></li>\n    </ul>\n</div>', 3, 'Microsoft'),
('apple-imac-2021', 'iMac 2021', 1, 'The new iMac!', 3, 'Apple'),
('apple-iphone-12-pro', 'iPhone 12 Pro', 1, 'This is iPhone 12. Nothing else to say.', 3, 'Apple'),
('apple-airpods-pro', 'AirPods Pro', 0, '<h3>Magic like you''ve never heard</h3>\n<p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they''re ready to use right out of the case.\n\n<h3>Active Noise Cancellation</h3>\n<p>Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you''re listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls.\n\n<h3>Transparency mode</h3>\n<p>Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Pro to undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when you''re talking to people around you.</p>\n\n<h3>All-new design</h3>\n<p>AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation.</p>\n\n<h3>Amazing audio quality</h3>\n<p>A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience.</p>\n\n<h3>Even more magical</h3>\n<p>The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods. And with Audio Sharing, you and a friend can share the same audio stream on two sets of AirPods — so you can play a game, watch a movie, or listen to a song together.</p>', 3, 'Apple'),
('apple-airtag', 'AirTag', 1, '<h1>Lose your knack for losing things.</h1>\n<p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they''re on your radar in the Find My app. AirTag has your back.</p>', 3, 'Apple');

-- Product Gallery
INSERT INTO product_gallery (product_id, image_url, position) VALUES
-- Nike Air Huarache Le
('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087', 1),
('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087', 2),
('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087', 3),
('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087', 4),
('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087', 5),
-- Canada Goose Jacket
('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg', 1),
('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg', 2),
('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg', 3),
('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg', 4),
('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg', 5),
('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png', 6),
('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png', 7),
-- PlayStation 5
('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg', 1),
('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg', 2),
('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg', 3),
('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg', 4),
('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg', 5),
-- Xbox Series S
('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg', 1),
('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg', 2),
('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg', 3),
('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg', 4),
('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg', 5),
-- iMac 2021
('apple-imac-2021', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000', 1),
-- iPhone 12 Pro
('apple-iphone-12-pro', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1604021663000', 1),
-- AirPods Pro
('apple-airpods-pro', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000', 1),
-- AirTag
('apple-airtag', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000', 1);

-- Attribute Sets (PRODUCT-SPECIFIC - each product gets its own attribute set even if name is same)
INSERT INTO attribute_sets (id, name, type) VALUES
-- Nike Huarache Size (numeric: 40-43)
(1, 'Size', 'text'),
-- Canada Goose Size (text: S/M/L/XL)
(2, 'Size', 'text'),
-- PS5 Color
(3, 'Color', 'swatch'),
-- PS5 Capacity
(4, 'Capacity', 'text'),
-- Xbox Color
(5, 'Color', 'swatch'),
-- Xbox Capacity
(6, 'Capacity', 'text'),
-- iMac Capacity
(7, 'Capacity', 'text'),
-- iMac USB 3 ports
(8, 'With USB 3 ports', 'text'),
-- iMac Touch ID
(9, 'Touch ID in keyboard', 'text'),
-- iPhone Capacity
(10, 'Capacity', 'text'),
-- iPhone Color
(11, 'Color', 'swatch');

-- Attribute Items (specific to each attribute set)
INSERT INTO attribute_items (id, attribute_set_id, display_value, value) VALUES
-- Nike Huarache Size items (attribute_set 1)
(1, 1, '40', '40'),
(2, 1, '41', '41'),
(3, 1, '42', '42'),
(4, 1, '43', '43'),
-- Canada Goose Size items (attribute_set 2)
(5, 2, 'Small', 'S'),
(6, 2, 'Medium', 'M'),
(7, 2, 'Large', 'L'),
(8, 2, 'Extra Large', 'XL'),
-- PS5 Color items (attribute_set 3)
(9, 3, 'Green', '#44FF03'),
(10, 3, 'Cyan', '#03FFF7'),
(11, 3, 'Blue', '#030BFF'),
(12, 3, 'Black', '#000000'),
(13, 3, 'White', '#FFFFFF'),
-- PS5 Capacity items (attribute_set 4)
(14, 4, '512G', '512G'),
(15, 4, '1T', '1T'),
-- Xbox Color items (attribute_set 5)
(16, 5, 'Green', '#44FF03'),
(17, 5, 'Cyan', '#03FFF7'),
(18, 5, 'Blue', '#030BFF'),
(19, 5, 'Black', '#000000'),
(20, 5, 'White', '#FFFFFF'),
-- Xbox Capacity items (attribute_set 6)
(21, 6, '512G', '512G'),
(22, 6, '1T', '1T'),
-- iMac Capacity items (attribute_set 7)
(23, 7, '256GB', '256GB'),
(24, 7, '512GB', '512GB'),
-- iMac USB 3 ports items (attribute_set 8)
(25, 8, 'Yes', 'Yes'),
(26, 8, 'No', 'No'),
-- iMac Touch ID items (attribute_set 9)
(27, 9, 'Yes', 'Yes'),
(28, 9, 'No', 'No'),
-- iPhone Capacity items (attribute_set 10)
(29, 10, '512G', '512G'),
(30, 10, '1T', '1T'),
-- iPhone Color items (attribute_set 11)
(31, 11, 'Green', '#44FF03'),
(32, 11, 'Cyan', '#03FFF7'),
(33, 11, 'Blue', '#030BFF'),
(34, 11, 'Black', '#000000'),
(35, 11, 'White', '#FFFFFF');

-- Product Attributes (link products to their specific attribute sets)
INSERT INTO product_attributes (product_id, attribute_set_id) VALUES
-- Nike Huarache -> Size (numeric)
('huarache-x-stussy-le', 1),
-- Canada Goose -> Size (text)
('jacket-canada-goosee', 2),
-- PS5 -> Color + Capacity
('ps-5', 3),
('ps-5', 4),
-- Xbox -> Color + Capacity
('xbox-series-s', 5),
('xbox-series-s', 6),
-- iMac -> Capacity + USB 3 + Touch ID
('apple-imac-2021', 7),
('apple-imac-2021', 8),
('apple-imac-2021', 9),
-- iPhone -> Capacity + Color
('apple-iphone-12-pro', 10),
('apple-iphone-12-pro', 11);
-- AirPods Pro and AirTag have NO attributes

-- Prices
INSERT INTO prices (product_id, amount, currency_label, currency_symbol) VALUES
('huarache-x-stussy-le', 144.69, 'USD', '$'),
('jacket-canada-goosee', 518.47, 'USD', '$'),
('ps-5', 844.02, 'USD', '$'),
('xbox-series-s', 333.99, 'USD', '$'),
('apple-imac-2021', 1688.03, 'USD', '$'),
('apple-iphone-12-pro', 1000.76, 'USD', '$'),
('apple-airpods-pro', 300.23, 'USD', '$'),
('apple-airtag', 120.57, 'USD', '$');