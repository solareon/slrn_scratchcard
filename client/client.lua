local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
end

RegisterNetEvent('slrn_scratchcard:client:openScratcher', function(prizeArray, cardData)
  SendReactMessage('cardSetup', cardData)
  SendReactMessage('prizeData', prizeArray)
  Wait(100)
  toggleNuiFrame(true)
end)

RegisterNUICallback('scratcherComplete', function(_, cb)
  TriggerServerEvent('slrn_scratchcard:server:getPrize')
  toggleNuiFrame(false)
  debugPrint('Hide NUI frame')
  cb({})
end)

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('Hide NUI frame')
  cb({})
end)