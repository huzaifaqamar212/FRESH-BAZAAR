// Category images use working Unsplash CDN links (source.unsplash.com is deprecated).
// Fallback pattern per brief: https://source.unsplash.com/400x400/?grocery,{category}

const IMG = {
  "fruits-vegetables": [
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop", // fruits
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop", // potatoes
    "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=400&h=400&fit=crop", // tomatoes
    "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&h=400&fit=crop", // bananas
    "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&h=400&fit=crop", // onions
    "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop", // mangoes
  ],
  "dairy-eggs": [
    "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop", // milk
    "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop", // eggs
    "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=400&fit=crop", // yogurt
    "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop", // cheese
  ],
  bakery: [
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop", // bread
    "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=400&fit=crop", // buns
    "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop", // cake rusk
  ],
  beverages: [
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop", // tea
    "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=400&fit=crop", // juice
    "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop", // cola
    "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop", // water
  ],
  snacks: [
    "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop", // chips
    "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop", // biscuits
    "https://images.unsplash.com/photo-1575377427642-087cf684f29d?w=400&h=400&fit=crop", // nimko
  ],
  "rice-grains": [
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop", // rice
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop", // atta
    "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=400&h=400&fit=crop", // daal
  ],
  "meat-seafood": [
    "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop", // chicken
    "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&h=400&fit=crop", // beef
    "https://images.unsplash.com/photo-1611089676098-6b0e9a56d1c8?w=400&h=400&fit=crop", // fish
  ],
  household: [
    "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&h=400&fit=crop", // cleaning
    "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop", // detergent
    "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop", // soap
  ],
};

export const CATEGORIES = [
  { id: "fruits-vegetables", name: "Fruits & Vegetables", emoji: "🥭", img: IMG["fruits-vegetables"][0] },
  { id: "dairy-eggs", name: "Dairy & Eggs", emoji: "🥛", img: IMG["dairy-eggs"][0] },
  { id: "bakery", name: "Bakery", emoji: "🍞", img: IMG.bakery[0] },
  { id: "beverages", name: "Beverages", emoji: "🧃", img: IMG.beverages[0] },
  { id: "snacks", name: "Snacks", emoji: "🍪", img: IMG.snacks[0] },
  { id: "rice-grains", name: "Rice, Atta & Daal", emoji: "🌾", img: IMG["rice-grains"][0] },
  { id: "meat-seafood", name: "Meat & Seafood", emoji: "🍗", img: IMG["meat-seafood"][0] },
  { id: "household", name: "Household", emoji: "🧼", img: IMG.household[0] },
];

const p = (id, name, brand, category, imgIdx, price, oldPrice, unit, rating, reviews, stock, desc, tags = []) => ({
  id,
  name,
  brand,
  category,
  image: IMG[category][imgIdx],
  price,
  oldPrice,
  unit,
  rating,
  reviews,
  stock,
  desc,
  tags,
});

export const PRODUCTS = [
  // Fruits & Vegetables
  p("fv-01", "Sindhri Mangoes", "Farm Fresh", "fruits-vegetables", 5, 380, 450, "1 kg", 4.8, 214, 40, "Premium Sindhri mangoes from Mirpurkhas orchards. Hand-picked at peak ripeness — sweet, fibreless, and fragrant.", ["deal", "featured"]),
  p("fv-02", "Fresh Bananas (Dozen)", "Farm Fresh", "fruits-vegetables", 3, 180, null, "12 pcs", 4.6, 168, 60, "Naturally ripened bananas, ideal size for daily use. Rich in potassium and perfect for shakes or lunchboxes."),
  p("fv-03", "Tomatoes", "Local Mandi", "fruits-vegetables", 2, 120, 160, "1 kg", 4.4, 96, 80, "Firm, red desi tomatoes sourced daily from the sabzi mandi. Great for salan, salads, and chutneys.", ["deal"]),
  p("fv-04", "Potatoes", "Local Mandi", "fruits-vegetables", 1, 95, null, "1 kg", 4.5, 142, 120, "Clean, medium-sized potatoes with thin skin. A kitchen staple for fries, bhujia, and biryani."),
  p("fv-05", "Onions", "Local Mandi", "fruits-vegetables", 4, 110, 140, "1 kg", 4.3, 88, 100, "Fresh red onions with strong flavour — the base of every good Pakistani curry.", ["deal"]),
  p("fv-06", "Mixed Fruit Basket", "Farm Fresh", "fruits-vegetables", 0, 1250, 1500, "3.5 kg", 4.7, 54, 15, "Seasonal assortment: apples, oranges, grapes, and bananas. Perfect for gifting or the weekly fruit run.", ["featured", "deal"]),

  // Dairy & Eggs
  p("de-01", "Olper's Full Cream Milk", "Olper's", "dairy-eggs", 0, 370, null, "1.5 L", 4.7, 320, 90, "UHT full cream milk, rich in calcium and protein. No preservatives — great for chai, desserts, and daily use.", ["featured"]),
  p("de-02", "Farm Eggs (Dozen)", "Desi Farms", "dairy-eggs", 1, 340, 380, "12 pcs", 4.6, 187, 70, "Golden-yolk farm eggs, collected fresh every morning and delivered the same day.", ["deal"]),
  p("de-03", "Nestlé Fruit Yogurt", "Nestlé", "dairy-eggs", 2, 95, null, "400 g", 4.5, 133, 55, "Creamy stirred yogurt with real fruit pieces. A quick breakfast or after-iftar treat."),
  p("de-04", "Cheddar Cheese Block", "Adam's", "dairy-eggs", 3, 780, 850, "400 g", 4.6, 76, 30, "Locally produced mature cheddar — melts beautifully on sandwiches, pastas, and parathas.", ["deal"]),

  // Bakery
  p("bk-01", "Dawn Bread Large", "Dawn", "bakery", 0, 190, null, "Large loaf", 4.5, 240, 65, "Soft, fresh white bread baked daily. The classic choice for breakfast toast and sandwiches."),
  p("bk-02", "Burger Buns (6 pack)", "Bake Parlor", "bakery", 1, 160, 190, "6 pcs", 4.4, 91, 45, "Fluffy sesame-topped buns, oven-fresh. Ready for shami burgers and sliders.", ["deal"]),
  p("bk-03", "Cake Rusk", "United King", "bakery", 2, 350, null, "550 g", 4.7, 128, 38, "Crunchy, buttery cake rusk — Karachi's favourite chai companion.", ["featured"]),

  // Beverages
  p("bv-01", "Tapal Danedar Tea", "Tapal", "beverages", 0, 620, 700, "475 g", 4.8, 410, 85, "Pakistan's iconic danedar blend. Strong colour, rich aroma — makes a proper doodh patti.", ["featured", "deal"]),
  p("bv-02", "Nestlé Fruita Vitals Red Grape", "Nestlé", "beverages", 1, 280, null, "1 L", 4.6, 154, 60, "100% red grape nectar with no added preservatives. Chill and serve."),
  p("bv-03", "Pepsi (1.5 L)", "PepsiCo", "beverages", 2, 190, 210, "1.5 L", 4.4, 201, 110, "Family-size Pepsi for dawats and weekend biryani.", ["deal"]),
  p("bv-04", "Nestlé Pure Life Water (6 pack)", "Nestlé", "beverages", 3, 540, null, "6 × 1.5 L", 4.7, 178, 95, "Purified drinking water carton — doorstep hydration for the whole week."),

  // Snacks
  p("sn-01", "Lay's Masala Chips", "Lay's", "snacks", 0, 100, null, "70 g", 4.5, 265, 140, "Crispy potato chips with the classic desi masala kick."),
  p("sn-02", "Sooper Biscuits Family Pack", "Peek Freans", "snacks", 1, 165, 185, "Family pack", 4.7, 342, 120, "Ki khao gay? Sooper! Egg-and-milk biscuits everyone in the house agrees on.", ["deal", "featured"]),
  p("sn-03", "Mixed Nimko", "Karachi Nimko House", "snacks", 2, 420, 480, "500 g", 4.6, 87, 35, "Spicy-crunchy mix of daal moong, chips, and peanuts from a Burns Road-style recipe.", ["deal"]),

  // Rice & Grains
  p("rg-01", "Super Kernel Basmati Rice", "Falak", "rice-grains", 0, 1850, 2100, "5 kg", 4.8, 296, 50, "Extra-long aged basmati grains that stay separate and fragrant — biryani-grade rice.", ["featured", "deal"]),
  p("rg-02", "Chakki Fresh Atta", "Sunridge", "rice-grains", 1, 980, null, "10 kg", 4.7, 232, 65, "Stone-ground whole wheat atta for soft, fluffy rotis and parathas."),
  p("rg-03", "Daal Chana", "Mandi Select", "rice-grains", 2, 380, 420, "1 kg", 4.5, 74, 90, "Cleaned and sorted premium chana daal — cooks evenly, tastes homely.", ["deal"]),

  // Meat & Seafood
  p("ms-01", "Chicken Breast Boneless", "K&N's", "meat-seafood", 0, 950, null, "1 kg", 4.7, 189, 25, "Skinless, boneless chicken breast fillets — hygienically processed and vacuum-packed.", ["featured"]),
  p("ms-02", "Beef Qeema (Mince)", "Meat One", "meat-seafood", 1, 1250, 1350, "1 kg", 4.6, 112, 20, "Fresh lean beef mince, ground in-store. Ready for kababs, qeema aloo, and koftay.", ["deal"]),
  p("ms-03", "Fresh Pomfret Fish", "Karachi Fish Harbour", "meat-seafood", 2, 1600, null, "1 kg", 4.5, 43, 12, "Same-day catch from the harbour, cleaned and cut on request."),

  // Household
  p("hh-01", "Surf Excel Washing Powder", "Unilever", "household", 1, 640, 720, "1 kg", 4.7, 258, 75, "Tough stain removal in one wash — daagh to achay hotay hain.", ["deal"]),
  p("hh-02", "Lemon Max Dishwash Bar (3 pack)", "Lemon Max", "household", 2, 210, null, "3 pcs", 4.5, 146, 100, "Real lemon juice power that cuts through grease fast."),
  p("hh-03", "All-Purpose Surface Cleaner", "Dettol", "household", 0, 480, 540, "1 L", 4.6, 119, 60, "Kills 99.9% of germs on floors and kitchen counters. Pine fresh fragrance.", ["deal"]),
];

export const priceFmt = (n) => "Rs. " + n.toLocaleString("en-PK");
