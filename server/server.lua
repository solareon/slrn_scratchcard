if not lib then return end

lib.versionCheck('solareon/slrn_scratchcard')

if GetCurrentResourceName() ~= 'slrn_scratchcard' then
    lib.print.error('The resource needs to be named ^5slrn_scratchcard^7.')
    return
end

local config = require 'config.server'

local playerPrizeData = {}
local playerCooldown = {}

local function createScratcher(src, scratcherIndex)
    if not src then return end

    local prizeArray = lib.table.deepclone(config.prizeArray)
    local prizeConfig = config.cardArray[scratcherIndex]
    local prizeSquares = prizeConfig.gridSizeX * prizeConfig.gridSizeY
    local winningSymbol = math.random(#prizeArray)
    local prizeData = {}
    local winner = math.random(100) <= prizeConfig.winChance and true or false
    local prizeAmount = 0
    if winner then
        for i = 1, prizeConfig.minWinSymbol do
            prizeData[#prizeData + 1] = prizeArray[winningSymbol]
            prizeData[#prizeData].color = 'gold'
            prizeAmount = prizeAmount + (prizeArray[winningSymbol].amount * prizeConfig.multiplier)
        end
        prizeSquares = prizeSquares - prizeConfig.minWinSymbol
    end
    for i = 1, prizeSquares do
        prizeData[#prizeData + 1] = prizeArray[math.random(#prizeArray)]
        if prizeData[#prizeData].color == 'gold' then
            prizeAmount = prizeAmount + (prizeArray[winningSymbol].amount * prizeConfig.multiplier)
        end
    end
    playerPrizeData[src] = prizeAmount
    local cardData = {}
    cardData.gridSizeX = prizeConfig.gridSizeX
    cardData.gridSizeY = prizeConfig.gridSizeY
    cardData.cardBgColor = prizeConfig.cardBgColor
    TriggerClientEvent('slrn_scratchcard:client:openScratcher', src, prizeData, cardData)
end

exports('scratcher', function(event, item, inventory, _, _)
    if event == 'usingItem' then
        if playerCooldown[inventory.id] then
            DoNotification(inventory.id, 'You are scratching too fast!', 'error')
            return false
        end
        createScratcher(source, item.metadata.scratcherType)
        return true
    end
 
    if event == 'usedItem' then
        playerCooldown[inventory.id] = true
        SetTimeout(config.cooldown, function()
            playerCooldown[inventory.id] = false
        end)
        return
    end
 
end)

RegisterNetEvent('slrn_scratchcard:server:getPrize', function ()
    local src = source
    if not playerPrizeData[src] or not src then return end
    local success = playerPrizeData[src] > 0 and 'success' or 'error'
    local message = 'You got $%s from the scratcher!'
    DoNotification(src, (message):format(playerPrizeData[src]), success)
    if success then
        local player = GetPlayer(src)
        AddMoney(player, 'cash', playerPrizeData[src])
    end
    playerPrizeData[src] = 0
end)

if config.debug then
    lib.addCommand('getscratcher', {
        help = 'Get a scratch card (admin only)',
        params = {
            { name = 'cardtype', help = 'threexthree' }
        },
        restricted = "group.admin"
    }, function(source, args)
        if not args then return end
        createScratcher(source, args.cardtype)
    end)
end