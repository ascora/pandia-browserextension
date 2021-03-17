browser.tabs.query({currentWindow: true, active: true}, (tabs) => {
	document.write(`<h3>Current active url:</h3>`);  
	document.write(tabs[0].url);  
	
  
	var regex = new RegExp(`\/\/([^\/]*)`); 
	var resultdirty = regex.exec(tabs[0].url)[0];
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
	
	document.write(`<h3>Base URL:</h3>`); 
	document.write(resultclean);
 
	var token ='Y75Y9F0fOC59fPZe1cdCbBw0LJtMX4ZWOdiO2xrNLihUiWUOKn';
	var sideId =btoa(resultclean);
	document.write(`<h3>SideId:</h3>`); 
    document.write(sideId);
	document.write(`<h3>Response:</h3>`); 
	fetch(`https://pandia-hub-api.ascora.eu/v1/policies/websites/${sideId}?lang=de&access_token=${token}`).then(r => r.text()).then(result => {
		document.write(`${result}`);
	})
});

