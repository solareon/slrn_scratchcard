return {
    debug = false, -- Enable debug command
    cooldown = 3000, -- Time between opening scratchers
    prizeArray = { -- list of prize squares, uses font awesome icon names without the fa- prefix
        [1] = { icon = 'money-bill', amount = 2},
        [2] = { icon = 'sack-dollar', amount = 5},
        [3] = { icon = 'money-bill-1', amount = 1},
        [4] = { icon = 'landmark', amount = 10},
        [5] = { icon = 'wallet', amount = 20},
        [6] = { icon = 'coins', amount = 20},
        [7] = { icon = 'vault', amount = 100},
        [8] = { icon = 'piggy-bank', amount = 50},
        [9] = { icon = 'money-bill-wave', amount = 10},
        [10] = { icon = 'money-bill-1-wave', amount = 5},
        [11] = { icon = 'money-bill-transfer', amount = 25}
    },
    cardArray = { -- Card type definitions. Uses item metadata to determine card types.
        sevenxseven = {
            gridSizeX = 7, -- How big the grid is horizontally
            gridSizeY = 7, -- How big the grid is vertically
            winChance = 10, -- Percentage chance out of 100 to give a reward
            multiplier = 8, -- Multiplier of base amount for reward
            minWinSymbol = 10, -- Minimum number of symbols that will be awarded for winners
            cardBgColor = '#00963C' -- Background color for card when generated.
        },
        sixxsix = {
            gridSizeX = 6,
            gridSizeY = 6,
            winChance = 10,
            multiplier = 7,
            minWinSymbol = 10,
            cardBgColor = '#00963C'
        },
        sixxfive = {
            gridSizeX = 5,
            gridSizeY = 6,
            winChance = 10,
            multiplier = 6,
            minWinSymbol = 5,
            cardBgColor = '#00963C'
        },
        fivexfive = {
            gridSizeX = 5,
            gridSizeY = 5,
            winChance = 10,
            multiplier = 5,
            minWinSymbol = 5,
            cardBgColor = '#1B1F3B'
        },
        fivexfour = {
            gridSizeX = 5,
            gridSizeY = 4,
            winChance = 25,
            multiplier = 4,
            minWinSymbol = 4,
            cardBgColor = '#CDC392'
        },
        fourxfour = {
            gridSizeX = 4,
            gridSizeY = 4,
            winChance = 35,
            multiplier = 3,
            minWinSymbol = 4,
            cardBgColor = '#B6DC76'
        },
        fourxthree = {
            gridSizeX = 4,
            gridSizeY = 3,
            winChance = 45,
            multiplier = 2,
            minWinSymbol = 4,
            cardBgColor = '#442B48'
        },
        threexthree = {
            gridSizeX = 3,
            gridSizeY = 3,
            winChance = 45,
            multiplier = 1,
            minWinSymbol = 3,
            cardBgColor = '#E7BB41'
        },
    }
}