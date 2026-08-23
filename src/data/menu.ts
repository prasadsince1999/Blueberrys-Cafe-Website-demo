export type MenuItem = {
  name: string;
  desc?: string;
  prices: string[];
};

export type MenuCategory = {
  title: string;
  labels?: string[];
  items: MenuItem[];
};

export type MenuSpread = {
  left: MenuCategory[];
  right: MenuCategory[];
};

export const MENU_SPREADS: MenuSpread[] = [
  {
    left: [
      {
        title: "THE APPETITE OPENER",
        items: [
          { name: "CHEESE BALL (6 PIECE)", prices: ["369"] },
          { name: "STUFFED FUNGI", prices: ["379"] },
          { name: "GRILLED PESTO (PANEER, FISH, CHICKEN)", prices: ["459", "479", "489"] },
          { name: "GRILLED PERI PERI (PANEER, FISH, CHICKEN)", prices: ["459", "479", "489"] },
          { name: "CHICKEN POPCORN", prices: ["299"] },
          { name: "SMOKED JAMAICAN CHICKEN", prices: ["379"] },
          { name: "BUFFALO CHICKEN WINGS", prices: ["449"] },
          { name: "FRIED CHICKEN WINGS", prices: ["399"] },
          { name: "BUTTER GARLIC PRAWN", prices: ["499"] },
          { name: "PANKO FRIED COCONUT PRAWN", prices: ["479"] },
          { name: "FISH N CHIPS", prices: ["399"] },
          { name: "THAI FRIED (CHICKEN,PANEER,MUSHROOM)", prices: ["449"] },
          { name: "THAI BASIL (CHICKEN,MUSHROOM)", prices: ["449"] },
          { name: "TERIYAKI (CHICKEN,MUSHROOM)", prices: ["449"] }
        ]
      }
    ],
    right: [
      {
        title: "JUST SNACK IT",
        items: [
          { name: "FRENCH FRIES (SALTED,PERI PERI,CHEESY)", prices: ["199"] },
          { name: "POTATO WEDGES", prices: ["199"] },
          { name: "MEXICAN LOADED NACHOS", prices: ["239"] },
          { name: "CHEESE NACHOS", prices: ["219"] },
          { name: "STIR FRIED VEG", prices: ["319"] },
          { name: "STIR FRIED CHICKEN", prices: ["349"] },
          { name: "BUTTER CROISSANT", prices: ["199"] },
          { name: "MILK CHOCOLATE HAZELNUT CROISSANT", prices: ["229"] }
        ]
      },
      {
        title: "TOAST YOUR MOOD",
        items: [
          { name: "AMERICAN PAN CAKE", prices: ["209"] },
          { name: "FRESH GREEN TOAST", prices: ["219"] },
          { name: "CHEESE GARLIC BREAD", prices: ["229"] },
          { name: "CLASSIC AMERICAN FRENCH TOAST", prices: ["239"] },
          { name: "PESTO CLASSICO", prices: ["249"] }
        ]
      }
    ]
  },
  {
    left: [
      {
        title: "TWO STATES",
        items: [
          { name: "FRIENDS WITH BENEFIT", desc: "1 SMOKEY PANEER/CHICKEN SANDWICH, 2 BLUE LAGOON MOJITO", prices: ["769", "789"] },
          { name: "NO STRINGS ATTACHED", desc: "1 ALFREDO PASTA, ANY 2 MOJITO", prices: ["769", "789"] }
        ]
      },
      {
        title: "LET'S ROME AROUND",
        labels: ["VEG", "CHICKEN"],
        items: [
          { name: "ALFREDO PASTA", prices: ["389", "419"] },
          { name: "CREAMY CHEESE & GARLIC PASTA", prices: ["369", "399"] },
          { name: "RUBI ROMAN PASTA", prices: ["449", "479"] },
          { name: "ITALIAN SUN KISSED PASTA", prices: ["499", "529"] },
          { name: "PESTO PERFECTION PASTA", prices: ["399", "429"] },
          { name: "AGLIO OLIO", prices: ["439", "469"] }
        ]
      },
      {
        title: "MAGGIE MOMENTS ONLY",
        labels: ["VEG", "CHICKEN", "MIX"],
        items: [
          { name: "MASALA MAGGIE", prices: ["189", "209", "229"] },
          { name: "COUNTRY CHEESE MAGGIE", prices: ["209", "229", "249"] }
        ]
      }
    ],
    right: [
      {
        title: "SANDWICH FIX EVERYTHING",
        labels: ["VEG", "CHICKEN"],
        items: [
          { name: "SUPREME CLUB SANDWICH", prices: ["329", "369"] },
          { name: "SMOKY SANDWICH", prices: ["399", "419"] },
          { name: "GRILLED PESTO CHICKEN SANDWICH", prices: ["-", "379"] },
          { name: "HAM & CHEESE CROISSANT", prices: ["-", "319"] },
          { name: "BACON EGG & CHEESE CROISSANT", prices: ["-", "379"] },
          { name: "CHICKEN SALAMI CROISSANT", prices: ["-", "279"] },
          { name: "GRILLED PESTO ZUCCHINI CROISSANT", prices: ["389", "-"] },
          { name: "SUNRISE STACK", prices: ["-", "279"] }
        ]
      },
      {
        title: "JUST PIZZA THINGS",
        labels: ["VEG", "CHICKEN"],
        items: [
          { name: "MARGHERITA PIZZA", desc: "A CLASSIC THIN CRUST PIZZA CHARACTERIZED BY ITS SIMPLICITY", prices: ["329", "349"] },
          { name: "TEX MEX PIZZA", desc: "A POPULAR VEGETARIAN PIZZA FEATURING A SAVORY CRUST", prices: ["349", "-"] },
          { name: "PERI PERI PIZZA", desc: "PANEER/CHICKEN MARINATED IN EYE CHILLI SAUCE", prices: ["369", "399"] },
          { name: "FARM HOUSE PIZZA", desc: "COMBINATION OF ONION, BELLPEPPER, SWEETCORN, MUSHROOM", prices: ["389", "-"] },
          { name: "MEAT LOVER PIZZA", desc: "COMBINATION OF THREE TYPES OF ROAST CHICKEN", prices: ["-", "429"] }
        ]
      }
    ]
  },
  {
    left: [
      {
        title: "FLAVOUR BETWEEN BUNS",
        labels: ["VEG", "NON-VEG"],
        items: [
          { name: "GRILLED PERI PERI PANEER/CHICKEN BURGER", prices: ["289", "319"] },
          { name: "CLASSIC BURGER", prices: ["209", "229"] },
          { name: "AMERICAN BURGER", prices: ["269", "299"] },
          { name: "CRISPY FRIED CHICKEN BURGER", prices: ["-", "299"] },
          { name: "GRILLED PESTO BURGER", prices: ["289", "319"] }
        ]
      },
      {
        title: "COMFORT IN A BOWL",
        items: [
          { name: "AEGEAN BLISH BOWL", desc: "A LUXURIOUS BLEND OF CREAMY GREEK YOGHURT, TOPPING - RICH WHOLESOME", prices: ["289"] },
          { name: "SUNRISE ELIXER BOWL", desc: "DELICIOUS SMOOTHIE WITH MANGO & CHIA SEED TOP", prices: ["289"] }
        ]
      }
    ],
    right: [
      {
        title: "CALORIES DON'T COUNT HERE",
        items: [
          { name: "TIRAMISU", prices: ["399"] },
          { name: "PANNA COTTA", prices: ["179"] },
          { name: "TRES LECHES", prices: ["369"] },
          { name: "SIZZLING BROWNIE", prices: ["329"] },
          { name: "BAKED CHEESE CAKE", prices: ["179"] },
          { name: "BLUEBERRY CHEESE CAKE", prices: ["249"] },
          { name: "BISCOFF CHEESE CAKE", prices: ["279"] },
          { name: "PISTACHIO CHEESE CAKE", prices: ["359"] },
          { name: "VANILLA DELIGHT", prices: ["199"] },
          { name: "CHOCO BROWNIE", prices: ["159"] }
        ]
      },
      {
        title: "MAKE IT EXTRA",
        items: [
          { name: "ICE CREAM SCOOP", prices: ["75"] },
          { name: "WHIPPED CREAM", prices: ["65"] },
          { name: "CHOCO CHIPS", prices: ["65"] },
          { name: "FLAVOURS", desc: "(IRISH, HAZELNUT, VANILLA, CARAMEL)", prices: ["65"] },
          { name: "EXTRA CHEESE", prices: ["45"] },
          { name: "EXTRA VEGGIES", prices: ["95"] },
          { name: "EXTRA FRUIT", prices: ["95"] },
          { name: "CHICKEN SAUSAGE 2PC", prices: ["135"] },
          { name: "EXTRA CHICKEN", desc: "(GRILLED, ROASTED)", prices: ["135"] },
          { name: "BOILED EGG 2PC", prices: ["65"] }
        ]
      }
    ]
  },
  {
    left: [
      {
        title: "KEEP IT ICED",
        items: [
          { name: "CLASSIC LEMON ICE TEA", prices: ["189"] },
          { name: "GREEN APPLE ICE TEA", prices: ["199"] },
          { name: "PEACH ICE TEA", prices: ["199"] },
          { name: "PASION FRUIT ICE TEA", prices: ["199"] }
        ]
      },
      {
        title: "CHILL IN A GLASS",
        items: [
          { name: "CLASSIC MINT MOJITO", prices: ["199"] },
          { name: "BLUE LAGOON MOJITO", prices: ["209"] },
          { name: "GREEN APPLE MOJITO", prices: ["209"] },
          { name: "DOUBLE FLAVOUR MOJITO", prices: ["219"] },
          { name: "JALJEERA LEMONADE", prices: ["199"] },
          { name: "ORANGE AND CRANBERRY FIZZ", prices: ["249"] },
          { name: "BASIL FIZZ MOCKTAIL", prices: ["249"] },
          { name: "SPICY GUAVA TWIST", prices: ["249"] },
          { name: "FRESH LIME SODA", prices: ["179"] }
        ]
      }
    ],
    right: [
      {
        title: "DESSERT IN DISGUISE",
        items: [
          { name: "ROYAL FERRERO SHAKE", prices: ["319"] },
          { name: "KITKAT FREAK SHAKE", prices: ["309"] },
          { name: "OREO FREAK SHAKE", prices: ["309"] },
          { name: "BROWNIE FREAK SHAKE", prices: ["309"] },
          { name: "COCONUT ALMOND CREAM SHAKE", prices: ["299"] }
        ]
      },
      {
        title: "FRESHLY SQUEEZED",
        items: [
          { name: "ORANGE JUICE", prices: ["239"] },
          { name: "GLOW JUICE", desc: "(ORANGE, CARROT, LEMON JUICE, GINGER, HONEY)", prices: ["259"] },
          { name: "ABC DETOX", prices: ["259"] },
          { name: "APPLE JUICE", prices: ["229"] }
        ]
      },
      {
        title: "WARM UP HERE",
        labels: ["VEG", "CHICKEN"],
        items: [
          { name: "CREAMY WILD MUSHROOM SOUP", prices: ["279", "299"] },
          { name: "CREAMY BROCOLLI ALMOND SOUP", prices: ["279", "299"] },
          { name: "IMPERIAL HOT & SOUR SOUP", prices: ["279", "299"] },
          { name: "MINSTRONI SOUP", prices: ["269", "289"] }
        ]
      }
    ]
  },
  {
    left: [
      {
        title: "SIP IT HOT",
        items: [
          { name: "CAPPUCCINO", prices: ["189"] },
          { name: "CAFÉ LATTE", prices: ["199"] },
          { name: "IRISH CAPPUCCINO", prices: ["209"] },
          { name: "HAZELNUT CAPPUCCINO", prices: ["209"] },
          { name: "VANILLA CAPPUCCINO", prices: ["209"] },
          { name: "CARAMEL CAPPUCCINO", prices: ["209"] },
          { name: "CHOCOLATE CAPPUCCINO", prices: ["219"] },
          { name: "HOT CHOCOLATE", prices: ["179"] },
          { name: "CAFÉ MOCHA", prices: ["209"] },
          { name: "HOT SPANISH LATTE", prices: ["219"] }
        ]
      }
    ],
    right: [
      {
        title: "KEEP IT BLACK",
        items: [
          { name: "ESPRESSO SHOT", prices: ["139"] },
          { name: "AMERICANO", prices: ["189"] },
          { name: "IRISH COFFEE", prices: ["199"] },
          { name: "HAZELNUT COFFEE", prices: ["199"] }
        ]
      },
      {
        title: "A CUP OF CALM",
        items: [
          { name: "LEMON TEA", prices: ["159"] },
          { name: "GREEN TEA", prices: ["159"] }
        ]
      },
      {
        title: "FREEZE THE MOMENT",
        items: [
          { name: "TALL N DARK", prices: ["289"] },
          { name: "CAFÉ FRAPPE", prices: ["259"] },
          { name: "IRISH FRAPPE", prices: ["279"] },
          { name: "HAZELNUT FRAPPE", prices: ["279"] },
          { name: "VANILLA FRAPPE", prices: ["279"] },
          { name: "CARAMEL FRAPPE", prices: ["279"] },
          { name: "CHOCOLATE FRAPPE", prices: ["279"] },
          { name: "VIETNAMESE ICED COFFEE", prices: ["259"] }
        ]
      }
    ]
  }
];
