export const RANK_DICT = {
    wood: {
        range: {
            male: {
                min: 20,
                max: 100,
                label: '>20%'
            },
            female: {
                min: 27,
                max: 100,
                label: '>27%'
            }
        }
    },
    bronze: {
        range: {
            male: {
                min: 15,
                max: 20,
                label: '15-20%'
            },
            female: {
                min: 21,
                max: 27,
                label: '21-27%'
            }
        }
    },
    silver: {
        range: {
            male: {
                min: 12,
                max: 15,
                label: '12-15%'
            },
            female: {
                min: 17,
                max: 21,
                label: '17-21%'
            }
        }
    },
    gold: {
        range: {
            male: {
                min: 10,
                max: 12,
                label: '10-12%'
            },
            female: {
                min: 14,
                max: 17,
                label: '14-17%'
            }
        }
    },
    platinum: {
        range: {
            male: {
                min: 0,
                max: 10,
                label: '<10%'
            },
            female: {
                min: 0,
                max: 14,
                label: '<14%'
            }
        }
    }
}
