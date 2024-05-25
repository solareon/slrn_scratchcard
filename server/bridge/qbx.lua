if GetResourceState('qbx_core') ~= 'started' then return end

function GetPlayer(id)
    return exports.qbx_core:GetPlayer(id)
end

function DoNotification(src, text, nType)
    exports.qbx_core:Notify(src, text, nType)
end

function AddMoney(Player, moneyType, amount)
    Player.Functions.AddMoney(moneyType, amount, "scratcher-card")
end