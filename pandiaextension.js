
browser.tabs.onUpdated.addListener(handleUpdated);

function handleUpdated(tabId, changeInfo, tabInfo) 
{
	if(changeInfo.url == null)
	{
		return;
	}
	var regex = new RegExp(`\/\/([^\/]*)`); 
	var resultdirty = regex.exec(changeInfo.url)[0];
	/*take into account country domains that mandate a ccSLD list from https://en.wikipedia.org/wiki/Second-level_domain#Country-code_second-level_domains */
	var hasContryCode = resultdirty.endsWith(".at") || 
						resultdirty.endsWith(".au") || 
						resultdirty.endsWith(".br") || 
						resultdirty.endsWith(".es") || 
						resultdirty.endsWith(".fr") || 
						resultdirty.endsWith(".hu") || 
						resultdirty.endsWith(".il") || 
						resultdirty.endsWith(".in") || 
						resultdirty.endsWith(".jp") || 
						resultdirty.endsWith(".kr") || 
						resultdirty.endsWith(".lk") || 
						resultdirty.endsWith(".nz") || 	
						resultdirty.endsWith(".pk") || 
						resultdirty.endsWith(".ru") || 
						resultdirty.endsWith(".th") || 
						resultdirty.endsWith(".tr") || 
						resultdirty.endsWith(".tt") || 
						resultdirty.endsWith(".ua") || 
						resultdirty.endsWith(".uk") || 
						resultdirty.endsWith(".us") || 
						resultdirty.endsWith(".za") || 
						resultdirty.endsWith(".zm");
		
	var resultclean;
	
	if (hasContryCode) 
	{
		var regexCountryCode = new RegExp(`[^\.]*\.[^\.]*\.[^\.]*$`);
		resultclean = regexCountryCode.exec(resultdirty)[0];
	} 
	else 
	{
		var regexNoCountryCode = new RegExp(`[^\.]*\.[^\.]*$`);
		resultclean = regexNoCountryCode.exec(resultdirty)[0];
	}		
	
	
 
	var token ='1mnvF1nXd3XpEIiUM45HQnkKtLDj5bZeM1SH8ltqnOJCyImlg0';
	var sideId =btoa(resultclean);
	fetch(`https://pandia-hub-api.ascora.eu/v1/policies/websites/${sideId}?lang=de&access_token=${token}`).then(r => r.text()).then(result => {
		if(result.match(`.*true.*`) == null)
		{
			browser.browserAction.setIcon({path: '../icons/logo_pandia_red.png', tabId: tabId});			
		}
		else
		{
			browser.browserAction.setIcon({path: '../icons/logo_pandia_green.png', tabId: tabId});
		}
	})		
}


