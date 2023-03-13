// this file works to 100% on windows xp! maybe in IE8 but its tested in Firefox 48 on xp!;

function BatteryService(battery,start=false){
	//const batteryLevel=window.batteryLevel||0;
	const batteryLevel=Math.round(battery.level*100);
	const batteryIsCharging=battery.charging;
	const dischargingTime=battery.dischargingTime;
	const chargingTime=battery.chargingTime;
	const p=document.getElementById("battery"); // flash: ⚡;

	if(
		batteryLevel==100&&
		batteryIsCharging&&
		p.className.includes("hidden")
	){
		return; // PC user don't have a battery;
	}
	
	if(batteryLevel<50&&batteryLevel>20){color="orange"}
	else if(batteryLevel<=20){
		color="red";
		if(!batteryIsCharging&&start){alert("WARNUNG BATTERIE FAST LEER!\n\nSie haben "+batteryLevel+"% Verbleibend!")}
	}
	else{color="green"}

	p.innerHTML=`Batterie: <span style="color:${color};"">${batteryLevel}%</span> ${batteryIsCharging?" ⚡":""}${batteryLevel<=20&&!batteryIsCharging?' <img id=img_lowBattery src="/files/img/lowBattery.png" width=40 align=top>':""}`;
	p.className=""; // show the 'p' element;
	if(batteryLevel<=20&&!batteryIsCharging){
		if(!window.interval_img){
			console.log("set!");
			window.interval_img=setInterval(()=>{
				document.getElementById("img_lowBattery").style.opacity=Math.sin(Date.now()/200)*.25 +.75;
			},80);
		}
	}else{
		clearInterval(window.interval_img);
		window.interval_img=undefined;
	}
}
function oldProject(){
	// if user clicked on an old project;
	// if(return == false) {nothing happened};
	// if(return == true) {open project};
	return confirm('WARNUNG DAS PROJEKT IST VERALTET!\n\ndieses Projekt habe ich lange nicht angefasst das heisst das manche Sachen nicht mehr funktionieren können!\n\nTROTZDEM ÖFFNEN?');
}
function spotify_audioToggle(img,audio){
	if(audio.paused){
		try{
			audio.play();
		}catch(e){
			if(confirm("Fehler! Es konnte der Song nicht abgespilt Werden!\nVersuche die seite neu zu laden!\n\nSeite neu laden?")){
				location.reload();
			}else{return false;}
		}
		audio.onended=()=>{
			img.src="/files/img/playBTN.png";
		};
		img.src="/files/img/pauseBTN.png";

	}else{
		audio.pause();
		audio.currentTime=0;
		img.src="/files/img/playBTN.png";

	}
}

if(navigator.getBattery){
	navigator.getBattery().then(b=>BatteryService(b,true));
	setInterval(()=>{navigator.getBattery().then(BatteryService)},2e3);
}else{
	console.log("navigator.getBattery is undefined!");
}
