

let color = '#DAF7A6';
let color2 = '#FFC300';
let color3 = '#FF5733';
var maximo_tabs = 4


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  init()
  console.log('Default background color set to %cgreen', `color: ${color}`);
  console.log('Current Max tabs allowed:', maximo_tabs)

});






var isEnabled = true;
var maxTabs = 5;;
var tabsCount;

function updateBadgeText() {
    var tabsBalance = maxTabs - tabsCount;
    var tabsAllowanceRemaining = (tabsBalance > 0) ? tabsBalance : 0;

 
}

function updateTabsCount() {
    chrome.tabs.query({
        windowType: 'normal',
        pinned: false
    }, function (tabs) {
        tabsCount = tabs.length;
        updateBadgeText();
    });
}

function handleTabCreated(tab) {
    if (tabsCount >= maxTabs) {
        chrome.tabs.remove(tab.id);
    }
    else {
        updateTabsCount();
    }
}

function handleTabRemoved(tab) {
    updateTabsCount();
}

function handleTabUpdated(tab) {
    updateTabsCount();
}

function init() {
    updateTabsCount();
    chrome.tabs.onCreated.addListener(handleTabCreated);
    chrome.tabs.onRemoved.addListener(handleTabRemoved);
    chrome.tabs.onUpdated.addListener(handleTabUpdated);
}

function teardown() {
    chrome.tabs.onCreated.removeListener(handleTabCreated);
    chrome.tabs.onRemoved.removeListener(handleTabRemoved);
    chrome.tabs.onUpdated.removeListener(handleTabUpdated);
}

chrome.browserAction.onClicked.addListener(function (tab) {

	init();
});   



init();












