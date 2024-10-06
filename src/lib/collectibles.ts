// src/lib/collectibles.ts
import type { Collectible } from "$lib/types";

export const collectibles: Collectible[] = [
    {
        set: 'quotes',
        name: 'Quote #1',
        text: '',
        imgPath: '/collectibles/quotes/keepgoing.png',
        thumbPath: '/collectibles/quotes/keepgoing_small.webp',
        rarity: 'blue',
    },
    {
        set: 'quotes',
        name: 'Quote #2',
        text: '',
        imgPath: '/collectibles/quotes/sweetvictory.png',
        thumbPath: '/collectibles/quotes/sweetvictory_small.webp',
        rarity: 'bronze',
    },
    {
        set: 'quotes',
        name: 'Quote #3',
        text: '',
        imgPath: '/collectibles/quotes/consistent.png',
        thumbPath: '/collectibles/quotes/consistent_small.webp',
        rarity: 'silver',
    },
    {
        set: 'quotes',
        name: 'Quote #4',
        text: '',
        imgPath: '/collectibles/quotes/umph.png',
        thumbPath: '/collectibles/quotes/umph_small.webp',
        rarity: 'gold',
    },
    {
        set: 'nuts',
        name: 'Almonds',
        text: '',
        imgPath: '/collectibles/nuts/almonds.png',
        thumbPath: '/collectibles/nuts/almonds_small.webp',
        rarity: 'blue',
    },
    {
        set: 'nuts',
        name: 'Cashews',
        text: '',
        imgPath: '/collectibles/nuts/cashew.png',
        thumbPath: '/collectibles/nuts/cashew_small.webp',
        rarity: 'bronze',
    },
    {
        set: 'nuts',
        name: 'Hazelnuts',
        text: '',
        imgPath: '/collectibles/nuts/hazelnuts.png',
        thumbPath: '/collectibles/nuts/hazelnuts_small.webp',
        rarity: 'silver',
    },
    {
        set: 'nuts',
        name: 'Pecans',
        text: '',
        imgPath: '/collectibles/nuts/pecan.png',
        thumbPath: '/collectibles/nuts/pecan_small.webp',
        rarity: 'gold',
    },
    {
        set: 'sports',
        name: 'Swimming',
        text: 'A dance of strength and grace. Each stroke, a whisper of courage, each breath, a testament to resilience. In the rhythmic symphony of water, athletes find their rhythm, their purpose. As we dive into the depths, we discover the boundless potential within, emerging stronger, more determined, and ever closer to our dreams.',
        imgPath: '/collectibles/sports/swimming.png',
        thumbPath: '/collectibles/sports/swimming_small.webp',
        rarity: 'blue',
    },
    {
        set: 'sports',
        name: 'Hiking',
        text: 'A journey through nature offers a blend of physical challenge and mental clarity. Each step on the trail, whether through forests or up mountains, provides a sense of accomplishment and connection to the natural world. The varied landscapes and scenic views inspire us to explore, challenge ourselves, and grow.',
        imgPath: '/collectibles/sports/hiking.png',
        thumbPath: '/collectibles/sports/hiking_small.webp',
        rarity: 'bronze',
    },
    {
        set: 'sports',
        name: 'Kite Surfing',
        text: 'Kite surfing, a thrilling blend of wind and water, captures the essence of freedom and adventure. As athletes harness the power of the wind, they soar across the waves with grace and precision. Each ride, a dance of balance and control, pushes the limits of human capability.',
        imgPath: '/collectibles/sports/kiting.png',
        thumbPath: '/collectibles/sports/kiting_small.webp',
        rarity: 'silver',
    },
    {
        set: 'sports',
        name: 'Running',
        text: 'The pavement, trail, or track becomes a canvas for our determination and resilience. Each mile, a testament to our endurance and willpower, pushes us to new heights. Running teaches us that with each step, we can conquer challenges, find strength within, and achieve our goals with relentless pursuit.',
        imgPath: '/collectibles/sports/running.png',
        thumbPath: '/collectibles/sports/running_small.webp',
        rarity: 'gold',
    },
    {
        set: 'statues',
        name: 'Amazon',
        text: 'The Amazons, renowned for their fierce independence and martial prowess with the bow, embody unyielding strength and female empowerment. The Amazons\' legacy inspires us to break free from societal constraints, embrace our inner strength, and fight for our beliefs with unwavering determination.',
        imgPath: '/collectibles/statues/amazonian.png',
        thumbPath: '/collectibles/statues/amazonian_small.webp',
        rarity: 'blue',
    },
    {
        set: 'statues',
        name: 'Achilles',
        text: 'Achilles, the Greek hero of the Trojan War, epitomizes unparalleled bravery and martial prowess. His spear, a weapon of unmatched precision, struck fear into the hearts of his enemies. His story is a testament to the power of valor and the enduring spirit of a true hero.',
        imgPath: '/collectibles/statues/achilles.png',
        thumbPath: '/collectibles/statues/achilles_small.webp',
        rarity: 'bronze',
    },
    {
        set: 'statues',
        name: 'Athena',
        text: 'Athena, the Greek goddess of wisdom and war, is renowned for her strategic brilliance and unwavering courage. Athena\'s most famous exploits include aiding Perseus in his quest to slay Medusa and guiding Odysseus on his perilous journey home. Her legacy is one of wisdom, strength, and the enduring belief that intellect can triumph over brute force.',
        imgPath: '/collectibles/statues/athena.png',
        thumbPath: '/collectibles/statues/athena_small.webp',
        rarity: 'silver',
    },
    {
        set: 'statues',
        name: 'Hercules',
        text: 'The Greek demi god Hercules is famous for completing the twelve labours, challenges of extreme difficulty. Among them physical tasks as slaying a lion and a hydra, but also feats of wit and cunning such as stealing 3 golden apples.',
        imgPath: '/collectibles/statues/hercules.png',
        thumbPath: '/collectibles/statues/hercules_small.webp',
        rarity: 'gold',
    },
];

export const filterBySet = (collectibles: Collectible[], set: string) => {
    return collectibles.filter(collectible => collectible.set === set);
}

export const filterByRarity = (collectibles: Collectible[], rarity: string) => {
    return collectibles.filter(collectible => collectible.rarity === rarity);
}

export const getRandomCollectible = (): Collectible => {
    const rarityChances: { [key: string]: number } = {
        blue: 0.60,
        bronze: 0.30,
        silver: 0.095,
        gold: 0.005,
    };

    const random = Math.random();
    let cumulativeChance = 0;
    let selectedRarity: 'blue' | 'bronze' | 'silver' | 'gold' = 'blue';

    for (const rarity in rarityChances) {
        cumulativeChance += rarityChances[rarity];
        if (random < cumulativeChance) {
            selectedRarity = rarity as 'blue' | 'bronze' | 'silver' | 'gold';
            break;
        }
    }

    const filteredCollectibles = collectibles.filter(collectible => collectible.rarity === selectedRarity);
    const randomIndex = Math.floor(Math.random() * filteredCollectibles.length);
    return filteredCollectibles[randomIndex];
};