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
        text: 'Almonds, nature\'s energy boosters, offer a rich, buttery crunch with every bite. Packed with protein, fiber, and essential vitamins, they support heart health and keep you energized throughout the day.',
        imgPath: '/collectibles/nuts/almonds.png',
        thumbPath: '/collectibles/nuts/almonds_small.webp',
        rarity: 'blue',
    },
    {
        set: 'nuts',
        name: 'Cashews',
        text: 'Cashews, a tropical treat, provide a creamy, buttery flavor. High in healthy fats, protein, and essential minerals, they support heart health and offer a satisfying, crunchy bite.',
        imgPath: '/collectibles/nuts/cashew.png',
        thumbPath: '/collectibles/nuts/cashew_small.webp',
        rarity: 'bronze',
    },
    {
        set: 'nuts',
        name: 'Hazelnuts',
        text: 'Hazelnuts, a European favorite, offer a creamy, nutty delight. Rich in healthy fats, vitamins, and minerals, they add a luxurious touch to recipes while boosting overall nutrition.',
        imgPath: '/collectibles/nuts/hazelnuts.png',
        thumbPath: '/collectibles/nuts/hazelnuts_small.webp',
        rarity: 'silver',
    },
    {
        set: 'nuts',
        name: 'Pecans',
        text: 'Pecans, a Southern classic, bring a sweet, buttery richness to any dish. Loaded with antioxidants and healthy fats, they promote heart health and provide a satisfying, crunchy texture.',
        imgPath: '/collectibles/nuts/pecan.png',
        thumbPath: '/collectibles/nuts/pecan_small.webp',
        rarity: 'gold',
    },
    {
        set: 'sports',
        name: 'Swimming',
        text: 'A dance of strength and grace. Each stroke, a whisper of courage, each breath, a testament to resilience. In the rhythmic symphony of water, athletes find their rhythm, their purpose.',
        imgPath: '/collectibles/sports/swimming.png',
        thumbPath: '/collectibles/sports/swimming_small.webp',
        rarity: 'blue',
    },
    {
        set: 'sports',
        name: 'Hiking',
        text: 'A journey through nature offers a blend of physical challenge and mental clarity. Each step on the trail, whether through forests or up mountains, provides a sense of accomplishment.',
        imgPath: '/collectibles/sports/hiking.png',
        thumbPath: '/collectibles/sports/hiking_small.webp',
        rarity: 'bronze',
    },
    {
        set: 'sports',
        name: 'Kite Surfing',
        text: 'Kite surfing, a thrilling blend of wind and water, captures the essence of freedom and adventure. As athletes harness the power of the wind, they soar across the waves with grace and precision.',
        imgPath: '/collectibles/sports/kiting.png',
        thumbPath: '/collectibles/sports/kiting_small.webp',
        rarity: 'silver',
    },
    {
        set: 'sports',
        name: 'Running',
        text: 'The pavement, trail, or track becomes a canvas for our determination and resilience. Running teaches us that with each step, we can conquer challenges and achieve our goals with relentless pursuit.',
        imgPath: '/collectibles/sports/running.png',
        thumbPath: '/collectibles/sports/running_small.webp',
        rarity: 'gold',
    },
    {
        set: 'statues',
        name: 'Amazon',
        text: 'The Amazons, renowned for their fierce independence and martial prowess with the bow, embody unyielding strength. The Amazons\' legacy inspires us to fight for our beliefs with unwavering determination.',
        imgPath: '/collectibles/statues/amazonian.png',
        thumbPath: '/collectibles/statues/amazonian_small.webp',
        rarity: 'blue',
    },
    {
        set: 'statues',
        name: 'Achilles',
        text: 'Achilles, the Greek hero of the Trojan War, epitomizes unparalleled bravery and martial prowess. His story is a testament to the power of valor and the enduring spirit of a true hero.',
        imgPath: '/collectibles/statues/achilles.png',
        thumbPath: '/collectibles/statues/achilles_small.webp',
        rarity: 'bronze',
    },
    {
        set: 'statues',
        name: 'Athena',
        text: 'Athena, the Greek goddess of wisdom and war, is renowned for her strategic brilliance and unwavering courage. Her legacy is one of wisdom, strength, and the enduring belief that intellect can triumph over brute force.',
        imgPath: '/collectibles/statues/athena.png',
        thumbPath: '/collectibles/statues/athena_small.webp',
        rarity: 'silver',
    },
    {
        set: 'statues',
        name: 'Hercules',
        text: 'The Greek demi god Hercules is famous for completing the twelve labours, challenges of extreme difficulty. Among them tasks as slaying a hydra, but also feats of wit and cunning such as stealing 3 golden apples.',
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