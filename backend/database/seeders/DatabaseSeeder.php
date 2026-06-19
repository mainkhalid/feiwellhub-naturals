<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Wipe existing products & categories ───────────────
        DB::table('order_items')->delete();
        DB::table('products')->delete();
        DB::table('categories')->delete();

        // ── Categories ────────────────────────────────────────
        $categories = [
            [
                'name'        => 'Immune Support',
                'slug'        => 'immune-support',
                'description' => 'Supplements to strengthen and regulate the immune system',
                'icon'        => 'shield',
            ],
            [
                'name'        => 'Nerve & Pain Relief',
                'slug'        => 'nerve-pain-relief',
                'description' => 'Targeted support for tingling, numbness, burning pain and nerve damage',
                'icon'        => 'zap',
            ],
            [
                'name'        => 'Bone & Joint Health',
                'slug'        => 'bone-joint-health',
                'description' => 'Supplements for joints, cartilage, bones and mobility',
                'icon'        => 'activity',
            ],
            [
                'name'        => 'Respiratory & Allergy',
                'slug'        => 'respiratory-allergy',
                'description' => 'Natural support for asthma, allergies and breathing difficulties',
                'icon'        => 'wind',
            ],
            [
                'name'        => 'Vitamins & Minerals',
                'slug'        => 'vitamins-minerals',
                'description' => 'Essential daily vitamins, minerals and micronutrients',
                'icon'        => 'pill',
            ],
            [
                'name'        => 'Neurological Support',
                'slug'        => 'neurological-support',
                'description' => 'Support for nerve function, brain health and neurological conditions',
                'icon'        => 'brain',
            ],
            [
                'name'        => 'Muscle & Movement',
                'slug'        => 'muscle-movement',
                'description' => 'Supplements for muscle strength, mobility and recovery',
                'icon'        => 'dumbbell',
            ],
            [
                'name'        => 'Bladder & Kidney Health',
                'slug'        => 'bladder-kidney-health',
                'description' => 'Natural support for bladder control, UTIs and kidney function',
                'icon'        => 'droplets',
            ],
        ];

        foreach ($categories as $cat) {
            DB::table('categories')->insertOrIgnore(array_merge($cat, [
                'created_at' => now(), 'updated_at' => now(),
            ]));
        }

        $c = DB::table('categories')->pluck('id', 'slug');

        // ── Products ──────────────────────────────────────────
        $products = [

            // ── IMMUNE SUPPORT ────────────────────────────────
            [
                'category_id'       => $c['immune-support'],
                'name'              => 'Vitamin C 1000mg with Bioflavonoids',
                'slug'              => 'vitamin-c-1000mg-bioflavonoids',
                'short_description' => 'High-potency immune booster with rose hip and citrus bioflavonoids for enhanced absorption.',
                'description'       => 'A therapeutic dose of vitamin C (1000mg) combined with bioflavonoids from citrus peel and rose hip extract. Bioflavonoids act as natural absorption enhancers, increasing vitamin C uptake by up to 35%. Supports white blood cell production, collagen synthesis and antioxidant defence. Time-released formula for sustained blood levels throughout the day. 60 tablets.',
                'price'             => 1800.00, 'stock_qty' => 80,
                'image_url'         => 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600',
                'is_featured'       => true,  'is_active' => true,
            ],
            [
                'category_id'       => $c['immune-support'],
                'name'              => 'Zinc Bisglycinate 25mg',
                'slug'              => 'zinc-bisglycinate-25mg',
                'short_description' => 'Highly bioavailable zinc for immune function, wound healing and inflammation control.',
                'description'       => 'Zinc bisglycinate is the most bioavailable form of zinc — up to 43% better absorbed than zinc oxide. Essential for over 300 enzymatic reactions, zinc directly supports T-cell production, inflammatory response regulation and skin barrier integrity. Critical for patients recovering from illness, surgery or chronic infections. 60 capsules.',
                'price'             => 1600.00, 'stock_qty' => 70,
                'image_url'         => 'https://images.unsplash.com/photo-1550572017-ea058b5c39e6?w=600',
                'is_featured'       => false, 'is_active' => true,
            ],
            [
                'category_id'       => $c['immune-support'],
                'name'              => 'Elderberry & Echinacea Complex',
                'slug'              => 'elderberry-echinacea-complex',
                'short_description' => 'Triple-action immune formula — elderberry, echinacea and propolis extract.',
                'description'       => 'A clinically studied combination of black elderberry (Sambucus nigra) standardised to 17% polyphenols, echinacea purpurea root extract, and propolis. Elderberry reduces cold and flu duration by up to 4 days in clinical trials. Echinacea activates macrophage activity. Propolis provides natural antimicrobial support. 60 capsules.',
                'price'             => 2200.00, 'stock_qty' => 55,
                'image_url'         => 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600',
                'is_featured'       => true,  'is_active' => true,
            ],

            // ── NERVE & PAIN RELIEF ───────────────────────────
            [
                'category_id'       => $c['nerve-pain-relief'],
                'name'              => 'Alpha Lipoic Acid 600mg',
                'slug'              => 'alpha-lipoic-acid-600mg',
                'short_description' => 'Gold standard supplement for peripheral neuropathy — tingling, burning and numbness.',
                'description'       => 'Alpha lipoic acid (ALA) is the most researched supplement for peripheral neuropathy, with over 15 clinical trials supporting its use. At 600mg per day, ALA has been shown to significantly reduce tingling, burning pain and numbness in the hands and feet — particularly in diabetic neuropathy. Acts as a powerful antioxidant in both fat and water-soluble tissues. R-form ALA for maximum bioavailability. 60 capsules.',
                'price'             => 2800.00, 'stock_qty' => 60,
                'image_url'         => 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600',
                'is_featured'       => true,  'is_active' => true,
            ],
            [
                'category_id'       => $c['nerve-pain-relief'],
                'name'              => 'Vitamin B Complex (B1, B6, B12)',
                'slug'              => 'vitamin-b-complex-nerve',
                'short_description' => 'High-dose B vitamins for nerve regeneration, numbness and neuropathic pain.',
                'description'       => 'A therapeutic-dose combination of the three most critical B vitamins for nerve health: Benfotiamine (B1 — fat-soluble form, 150mg), Pyridoxal-5-phosphate (B6 active form, 50mg), and Methylcobalamin (B12 — most bioactive form, 1000mcg). This combination supports myelin sheath repair, reduces nerve inflammation and addresses deficiencies commonly underlying peripheral neuropathy. 60 capsules.',
                'price'             => 2400.00, 'stock_qty' => 65,
                'image_url'         => 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600',
                'is_featured'       => true,  'is_active' => true,
            ],
            [
                'category_id'       => $c['nerve-pain-relief'],
                'name'              => 'Magnesium Glycinate 400mg',
                'slug'              => 'magnesium-glycinate-400mg',
                'short_description' => 'Highly absorbable magnesium for nerve pain, muscle cramps and sleep.',
                'description'       => 'Magnesium glycinate is the most gentle and bioavailable form of magnesium — no laxative effect at therapeutic doses. Magnesium deficiency is linked to peripheral neuropathy, muscle cramps, restless legs, anxiety and poor sleep. At 400mg, this formula supports nerve signal transmission, reduces excitatory nerve firing (pain) and relaxes smooth muscle. Essential for anyone with diabetes, chronic pain or taking diuretics. 60 capsules.',
                'price'             => 2000.00, 'stock_qty' => 75,
                'image_url'         => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
                'is_featured'       => false, 'is_active' => true,
            ],
            [
                'category_id'       => $c['nerve-pain-relief'],
                'name'              => 'Acetyl-L-Carnitine 500mg',
                'slug'              => 'acetyl-l-carnitine-500mg',
                'short_description' => 'Nerve repair supplement for burning pain, weakness and neuropathy recovery.',
                'description'       => 'Acetyl-L-Carnitine (ALCAR) crosses the blood-brain barrier and supports nerve cell energy production and myelin synthesis. Clinical studies show it significantly reduces burning and tingling pain in peripheral neuropathy and supports nerve fibre regeneration over 6–12 months of use. Also supports cognitive function and reduces fatigue. 500mg per capsule, 60 capsules.',
                'price'             => 2600.00, 'stock_qty' => 45,
                'image_url'         => 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600',
                'is_featured'       => false, 'is_active' => true,
            ],

            // ── BONE & JOINT HEALTH ───────────────────────────
            [
                'category_id'       => $c['bone-joint-health'],
                'name'              => 'Glucosamine Sulphate 1500mg + Chondroitin 1200mg',
                'slug'              => 'glucosamine-chondroitin-complex',
                'short_description' => 'The gold standard joint supplement — cartilage repair and pain relief.',
                'description'       => 'The most studied combination for osteoarthritis and joint degeneration. Glucosamine sulphate (1500mg) provides the building blocks for cartilage synthesis, while chondroitin sulphate (1200mg) retains water in cartilage and inhibits cartilage-degrading enzymes. Clinical trials show significant reduction in joint pain and improved mobility after 8–12 weeks. Suitable for knee, hip, spine and hand arthritis. 90 tablets.',
                'price'             => 3200.00, 'stock_qty' => 55,
                'image_url'         => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
                'is_featured'       => true,  'is_active' => true,
            ],
            [
                'category_id'       => $c['bone-joint-health'],
                'name'              => 'Collagen Type II + Boswellia',
                'slug'              => 'collagen-type-2-boswellia',
                'short_description' => 'Undenatured collagen with boswellia for joint inflammation and mobility.',
                'description'       => 'Undenatured type II collagen (UC-II, 40mg) works through oral tolerance to train the immune system to stop attacking joint cartilage — particularly effective for rheumatoid arthritis. Combined with boswellia serrata extract (300mg, standardised to 65% boswellic acids) which inhibits the 5-LOX inflammatory enzyme. Together they address both structural repair and inflammation. 60 capsules.',
                'price'             => 2800.00, 'stock_qty' => 40,
                'image_url'         => 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=600',
                'is_featured'       => false, 'is_active' => true,
            ],
            [
                'category_id'       => $c['bone-joint-health'],
                'name'              => 'Calcium Citrate + Vitamin D3 + K2',
                'slug'              => 'calcium-citrate-d3-k2',
                'short_description' => 'The complete bone health trio — calcium that actually reaches your bones.',
                'description'       => 'Calcium citrate (500mg) is significantly better absorbed than calcium carbonate, especially without food. Vitamin D3 (2000 IU) is essential for calcium absorption — without it, less than 10% of calcium is absorbed. Vitamin K2 (MK-7, 100mcg) directs calcium into bones rather than arteries, preventing calcification. This combination addresses osteoporosis, fracture risk and bone density loss. 60 tablets.',
                'price'             => 2200.00, 'stock_qty' => 65,
                'image_url'         => 'https://images.unsplash.com/photo-1550572017-ea058b5c39e6?w=600',
                'is_featured'       => false, 'is_active' => true,
            ],

            // ── RESPIRATORY & ALLERGY ─────────────────────────
            [
                'category_id'       => $c['respiratory-allergy'],
                'name'              => 'Quercetin + Bromelain 500mg',
                'slug'              => 'quercetin-bromelain-500mg',
                'short_description' => 'Natural antihistamine and anti-inflammatory for asthma and allergies.',
                'description'       => 'Quercetin is a powerful natural mast cell stabiliser — it inhibits histamine release and reduces the inflammatory cascade triggered by allergens. Combined with bromelain (pineapple enzyme) which enhances quercetin absorption and provides its own anti-inflammatory and mucolytic (mucus-thinning) effects. Clinically relevant for allergic rhinitis, asthma, eczema and food sensitivities. 500mg per capsule, 60 capsules.',
                'price'             => 2400.00, 'stock_qty' => 50,
                'image_url'         => 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600',
                'is_featured'       => true,  'is_active' => true,
            ],
            [
                'category_id'       => $c['respiratory-allergy'],
                'name'              => 'Magnesium for Respiratory Support',
                'slug'              => 'magnesium-respiratory-support',
                'short_description' => 'Magnesium bronchodilator support for asthma and breathing difficulties.',
                'description'       => 'Magnesium deficiency is strongly associated with bronchospasm and asthma severity. Magnesium relaxes bronchial smooth muscle, reduces airway hyperreactivity and inhibits mast cell degranulation. This respiratory-specific magnesium formula (malate form, 300mg) is optimised for lung and airway support. Used as an adjunct to conventional asthma management. 60 capsules.',
                'price'             => 1900.00, 'stock_qty' => 45,
                'image_url'         => 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600',
                'is_featured'       => false, 'is_active' => true,
            ],
            [
                'category_id'       => $c['respiratory-allergy'],
                'name'              => 'NAC (N-Acetyl Cysteine) 600mg',
                'slug'              => 'nac-n-acetyl-cysteine-600mg',
                'short_description' => 'Mucolytic and antioxidant for respiratory infections, asthma and COPD.',
                'description'       => 'NAC is a precursor to glutathione, the body\'s master antioxidant, and has direct mucolytic (mucus-thinning) activity. It reduces viscosity of bronchial secretions, making them easier to clear. Used clinically for COPD, bronchitis, asthma and recurrent respiratory infections. Also supports liver detoxification and reduces oxidative stress in lung tissue. 600mg per capsule, 60 capsules.',
                'price'             => 2100.00, 'stock_qty' => 40,
                'image_url'         => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600',
                'is_featured'       => false, 'is_active' => true,
            ],

            // ── VITAMINS & MINERALS ───────────────────────────
            [
                'category_id'       => $c['vitamins-minerals'],
                'name'              => 'Vitamin D3 5000 IU',
                'slug'              => 'vitamin-d3-5000iu',
                'short_description' => 'High-potency D3 for immune function, bone health and neurological support.',
                'description'       => 'Vitamin D deficiency affects over 70% of Africans despite equatorial sun exposure, due to darker skin pigmentation and indoor lifestyles. At 5000 IU, this formula corrects deficiency rapidly (within 8–12 weeks). Vitamin D receptors are found on almost every cell — deficiency is linked to autoimmune disease, depression, muscle weakness, frequent infections and bone loss. Softgels in organic olive oil for optimal fat-soluble absorption. 60 softgels.',
                'price'             => 1800.00, 'stock_qty' => 90,
                'image_url'         => 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=600',
                'is_featured'       => true,  'is_active' => true,
            ],
            [
                'category_id'       => $c['vitamins-minerals'],
                'name'              => 'Omega-3 Fish Oil 2000mg (EPA + DHA)',
                'slug'              => 'omega-3-fish-oil-2000mg',
                'short_description' => 'High-strength omega-3 for inflammation, nerve health and cardiovascular support.',
                'description'       => 'A high-potency fish oil providing 1200mg EPA and 800mg DHA per serving — the therapeutic doses used in clinical trials. EPA reduces systemic inflammation and supports mental health. DHA is the primary structural fat in brain and nerve cells, essential for myelin sheath integrity. Critical for peripheral neuropathy, inflammatory conditions, cardiovascular disease and depression. Molecularly distilled, heavy metal free. Enteric-coated to prevent fishy burps. 60 softgels.',
                'price'             => 2800.00, 'stock_qty' => 75,
                'image_url'         => 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600',
                'is_featured'       => true,  'is_active' => true,
            ],
            [
                'category_id'       => $c['vitamins-minerals'],
                'name'              => 'Iron Bisglycinate 25mg (Non-Constipating)',
                'slug'              => 'iron-bisglycinate-25mg',
                'short_description' => 'Gentle, highly absorbable iron — no constipation or stomach upset.',
                'description'       => 'Iron bisglycinate (also called ferrous bisglycinate or Ferrochel) is absorbed 4x more efficiently than ferrous sulphate with virtually no GI side effects. Severe iron deficiency causes weakness, breathlessness, fatigue, cold intolerance and impaired immune function. This formula includes vitamin C to further enhance absorption. Suitable for anaemia, heavy periods, pregnancy and vegetarians. 60 capsules.',
                'price'             => 1600.00, 'stock_qty' => 60,
                'image_url'         => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
                'is_featured'       => false, 'is_active' => true,
            ],

            // ── NEUROLOGICAL SUPPORT ──────────────────────────
            [
                'category_id'       => $c['neurological-support'],
                'name'              => 'Lion\'s Mane Mushroom + Bacopa Complex',
                'slug'              => 'lions-mane-bacopa-complex',
                'short_description' => 'Nerve growth factor support for neurological recovery and brain health.',
                'description'       => 'Lion\'s Mane (500mg, dual-extracted) stimulates nerve growth factor (NGF) production — the protein responsible for the growth and maintenance of nerve cells. Combined with Bacopa monnieri (300mg, standardised to 50% bacosides) which enhances nerve signal transmission and supports myelin repair. Used as adjunct support for multiple sclerosis, peripheral neuropathy, post-stroke recovery and cognitive decline. 60 capsules.',
                'price'             => 3200.00, 'stock_qty' => 35,
                'image_url'         => 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600',
                'is_featured'       => true,  'is_active' => true,
            ],
            [
                'category_id'       => $c['neurological-support'],
                'name'              => 'CoQ10 (Ubiquinol) 200mg',
                'slug'              => 'coq10-ubiquinol-200mg',
                'short_description' => 'Active form CoQ10 for mitochondrial energy, nerve and heart health.',
                'description'       => 'Ubiquinol is the reduced, active form of CoQ10 — up to 8x better absorbed than standard ubiquinone. CoQ10 is essential for mitochondrial energy production in every cell. Deficiency causes profound muscle weakness, fatigue, nerve dysfunction and cardiovascular decline — particularly in patients on statin medications. At 200mg, this formula supports energy production in nerve and muscle cells. 60 softgels.',
                'price'             => 3800.00, 'stock_qty' => 30,
                'image_url'         => 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600',
                'is_featured'       => false, 'is_active' => true,
            ],

            // ── MUSCLE & MOVEMENT ─────────────────────────────
            [
                'category_id'       => $c['muscle-movement'],
                'name'              => 'Creatine Monohydrate 5g',
                'slug'              => 'creatine-monohydrate-5g',
                'short_description' => 'Clinically proven for muscle strength, recovery and neurological conditions.',
                'description'       => 'Creatine monohydrate is one of the most researched supplements in existence with over 500 published studies. Beyond athletic performance, creatine has demonstrated clinical benefit in neuromuscular conditions including muscular dystrophy, ALS and post-stroke rehabilitation by improving cellular energy availability. 5g per serving supports muscle strength, reduces fatigue and supports neurological energy metabolism. 250g powder.',
                'price'             => 2400.00, 'stock_qty' => 50,
                'image_url'         => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
                'is_featured'       => false, 'is_active' => true,
            ],
            [
                'category_id'       => $c['muscle-movement'],
                'name'              => 'Potassium + Magnesium Electrolyte Complex',
                'slug'              => 'potassium-magnesium-electrolyte',
                'short_description' => 'Essential electrolytes for muscle weakness, cramping and movement control.',
                'description'       => 'Potassium and magnesium work together to regulate nerve and muscle electrical signalling. Deficiency in either causes muscle weakness, cramps, spasms and loss of coordination. This pharmaceutical-grade electrolyte complex (Potassium citrate 300mg + Magnesium glycinate 200mg) addresses the most common deficiencies underlying muscle weakness and impaired movement. 60 capsules.',
                'price'             => 1900.00, 'stock_qty' => 60,
                'image_url'         => 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
                'is_featured'       => false, 'is_active' => true,
            ],

            // ── BLADDER & KIDNEY HEALTH ───────────────────────
            [
                'category_id'       => $c['bladder-kidney-health'],
                'name'              => 'D-Mannose + Cranberry Extract',
                'slug'              => 'd-mannose-cranberry-extract',
                'short_description' => 'Natural bladder support — prevents UTIs and supports bladder lining health.',
                'description'       => 'D-Mannose (2000mg) is a simple sugar that coats the bladder wall, preventing E. coli bacteria from adhering — the mechanism behind most UTIs. Unlike antibiotics, D-Mannose does not disrupt gut flora. Combined with high-potency cranberry extract (PAC standardised, 500mg) for comprehensive bladder protection. Clinically relevant for recurrent UTIs, bladder irritability and post-catheter care. 60 capsules.',
                'price'             => 2600.00, 'stock_qty' => 45,
                'image_url'         => 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600',
                'is_featured'       => true,  'is_active' => true,
            ],
            [
                'category_id'       => $c['bladder-kidney-health'],
                'name'              => 'Pumpkin Seed Oil + Saw Palmetto',
                'slug'              => 'pumpkin-seed-oil-saw-palmetto',
                'short_description' => 'Natural support for bladder control, urgency and pelvic floor function.',
                'description'       => 'Pumpkin seed oil has clinical evidence for improving overactive bladder, urinary urgency and incontinence — including neurogenic bladder dysfunction. Saw palmetto (320mg standardised extract) supports urinary flow and reduces frequency. Together they address both the muscular and hormonal aspects of bladder control. Suitable for both men and women experiencing bladder weakness. 60 softgels.',
                'price'             => 2800.00, 'stock_qty' => 35,
                'image_url'         => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600',
                'is_featured'       => false, 'is_active' => true,
            ],
        ];//end products

        foreach ($products as $product) {
            DB::table('products')->insertOrIgnore(array_merge($product, [
                'created_at' => now(), 'updated_at' => now(),
            ]));
        }

        // Re-seed admin user if missing
        if (!\DB::table('users')->where('email', 'admin@feiwellhub.co.ke')->exists()) {
            \DB::table('users')->insert([
                'name'       => 'Admin',
                'email'      => 'admin@feiwellhub.co.ke',
                'password'   => \Hash::make('admin123'),
                'is_admin'   => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
