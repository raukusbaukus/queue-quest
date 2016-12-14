var tooltipinfo = {
  warpick: "The Warrior has the highest starting HP and Armor. They also begin play with the 'Repair' initiation ability, which lets you repair broken armor.",
  ranpick: "The Ranger has the highest starting Energy and Base Damage. They also begin play with the 'Energize' initition ability, which lets you recover missing energy.",
  magpick: "The Magi starts with a Ward to mitigate magic damage, and their attacks are considered magic damage, which bypasses armor. They also begin play with the 'Protect' initiation ability, which lets you recharge a diminished ward."
};

var tooltiparr = [];

var displayabils = [];

var heroinfo = {
  name: '',
  illus: 'images/characters/magi.gif',
  maxhp: 30,
  currhp: 30,
  maxenergy: 20,
  currenergy: 20,
  dtype: 'Physical',
  basedmg: 5,
  dmgvariance: 2,
  maxarmor: 1,
  currarmor: 1,
  maxward: 0,
  currward: 0,
  initabils: [],
  abils: [],
};

function showtooltip() {
  $('#tooltip').text(tooltipinfo[this.id]);
  $('#tooltip').css('display', 'inline');
}

function hidetooltip() {
  $('#tooltip').css('display', 'none');
}

function tooltipfollow() {
  $('#tooltip').css('top', event.pageY);
  $('#tooltip').css('left', event.pageX - $('#tooltip').width() / 2);
}

function heropicked() {
  //initializes hero specific values and calls sethstats
  resethero();
  heroinfo['illus'] = this.src;
  heroinfo['name'] = this.name;
  if (this.id === 'warpick') {
    heroinfo['maxhp'] = 38;
    heroinfo['maxarmor'] = 1.5;
    addabil('Repair');
    addabil('Block');
    addabil('Combo');
  } else if (this.id === 'ranpick') {
    heroinfo['maxhp'] = 34;
    heroinfo['maxenergy'] = 30;
    heroinfo['basedmg'] = 6;
    heroinfo['maxarmor'] = 1.5;
    addabil('Energize');
    addabil('Dodge');
    addabil('Opening-Volley');
  } else if (this.id === 'magpick') {
    heroinfo['dtype'] = 'Magical';
    heroinfo['maxhp'] = 27;
    heroinfo['maxenergy'] = 28;
    heroinfo['maxward'] = 1.5;
    addabil('Protect');
    addabil('Lightning-Bolt');
    addabil('Mote-of-Fire');
  }
  maxresources();
  sethstats();
  //temporary monster initialization
  setmstats(monsterarr[Math.floor(Math.random()*monsterarr.length)]);
}

function resethero() {
  heroinfo['name'] = 'Hero';
  heroinfo['initabils'] = ['Analyze', 'Heal'];
  heroinfo['abils'] = ['Attack'];
  heroinfo['dmgvariance'] = 2;
  heroinfo['basedmg'] = 5;
  heroinfo['maxhp'] = heroinfo['currhp'] = 30;
  heroinfo['maxenergy'] = heroinfo['currenergy'] = 20;
  heroinfo['maxarmor'] = heroinfo['currentarmor'] = 1;
  heroinfo['maxward'] = heroinfo['currentward'] = 0;
  heroinfo['dtype'] = 'Physical';
}

function addabil(aname) {
  //case for an initabil
  for (let initabilobjs in initabilityarr) {
    if (initabilityarr[initabilobjs].name === aname) {
      heroinfo['initabils'].push(aname);
      heroinfo['maxhp'] += initabilityarr[initabilobjs].bonushp;
      heroinfo['maxenergy'] += initabilityarr[initabilobjs].bonusenergy;
      heroinfo['maxarmor'] += initabilityarr[initabilobjs].bonusarmor;
      heroinfo['maxward'] += initabilityarr[initabilobjs].bonusward;
      heroinfo['dmgvariance'] += initabilityarr[initabilobjs].bonusvariance;
      heroinfo['basedmg'] += initabilityarr[initabilobjs].bonusbase;
    }
  }
  //case for an abil
  for (let abilobjs in abilityarr) {
    if (abilityarr[abilobjs].name === aname) {
      heroinfo['abils'].push(aname);
      heroinfo['maxhp'] += abilityarr[abilobjs].bonushp;
      heroinfo['maxenergy'] += abilityarr[abilobjs].bonusenergy;
      heroinfo['maxarmor'] += abilityarr[abilobjs].bonusarmor;
      heroinfo['maxward'] += abilityarr[abilobjs].bonusward;
      heroinfo['dmgvariance'] += abilityarr[abilobjs].bonusvariance;
      heroinfo['basedmg'] += abilityarr[abilobjs].bonusbase;
    }
  }
}

function maxresources() {
  heroinfo['currhp'] = heroinfo['maxhp'];
  heroinfo['currenergy'] = heroinfo['maxenergy'];
  heroinfo['currarmor'] = heroinfo['maxarmor'];
  heroinfo['currward'] = heroinfo['maxward'];
}

function sethstats() {
  //updates hero's stat displays
  $('#hero-pic').prop('src', heroinfo['illus']);
  $('#hero-name').text(heroinfo['name']);
  $('#hhp').text(`HP: ${heroinfo['currhp']}/${heroinfo['maxhp']}`);
  $('#hhpbar').prop('style', `width: ${Math.floor(heroinfo['currhp']/heroinfo['maxhp'])}`)
  $('#henergy').text(`Energy: ${heroinfo['currenergy']}/${heroinfo['maxenergy']}`);
  $('#henergybar').prop('style', `width: ${Math.floor(heroinfo['currenergy']/heroinfo['maxenergy'])}`)
  $('#hdmg').text(`Damage: ${heroinfo['basedmg']}+1d${heroinfo['dmgvariance']}`);
  $('#htype').text(`Type: ${heroinfo['dtype']}`);
  if (heroinfo['maxarmor'] === heroinfo['currarmor']) {
    $('#harmor').text(`Armor: ${heroinfo['currarmor']}`);
  } else {
    $('#harmor').text(`Armor: ${heroinfo['currarmor']}/${heroinfo['maxarmor']}`);
  }
  if (heroinfo['maxward'] === 0) {
    $('#hward').text(``);
  } else if (heroinfo['maxward'] === heroinfo['currward']) {
    $('#hward').text(`Ward: ${heroinfo['currward']}`);
  } else {
    $('#hward').text(`Ward: ${heroinfo['currward']}/${heroinfo['maxward']}`);
  }
  //displays only known initiation abilities
  $('.init-abil').css('display', 'none');
  for (let inits in heroinfo['initabils']) {
    $('#l' + heroinfo['initabils'][inits]).css('display', 'inline-block');
  }
  //displays only known abilities
  $('.pick-abil').css('display', 'none');
  for (let abils in heroinfo['abils']) {
    for (let abilobjs in abilityarr) {
      if (heroinfo['abils'][abils] === abilityarr[abilobjs].name) {
        $('#a' + abilityarr[abilobjs].name).css('display', 'inline');
      }
    }
  }
}

function setmstats(monsterinfo) {
  //updates monsters's stat displays
  $('#monster-pic').prop('src', monsterinfo['illus']);
  $('#monster-name').text(monsterinfo['name']);
  $('#mhp').text(`HP: ${monsterinfo['currhp']}/${monsterinfo['maxhp']}`);
  $('#mhpbar').prop('style', `width: ${Math.floor(monsterinfo['currhp']/monsterinfo['maxhp'])}`)
  $('#menergy').text(`Energy: ${monsterinfo['currenergy']}/${monsterinfo['maxenergy']}`);
  $('#menergybar').prop('style', `width: ${Math.floor(monsterinfo['currenergy']/monsterinfo['maxenergy'])}`)
  $('#mdmg').text(`Damage: ${monsterinfo['basedmg']}+1d${monsterinfo['dmgvariance']}`);
  $('#mtype').text(`Type: ${monsterinfo['dtype']}`);
  if (monsterinfo['maxarmor'] === monsterinfo['currarmor']) {
    $('#marmor').text(`Armor: ${monsterinfo['currarmor']}`);
  } else {
    $('#marmor').text(`Armor: ${monsterinfo['currarmor']}/${monsterinfo['maxarmor']}`);
  }
  if (monsterinfo['maxward'] === 0) {
    $('#mward').text(``);
  } else if (monsterinfo['maxward'] === monsterinfo['currward']) {
    $('#mward').text(`Ward: ${monsterinfo['currward']}`);
  } else {
    $('#mward').text(`Ward: ${monsterinfo['currward']}/${monsterinfo['maxward']}`);
  }
}
// start here wednesday
function makepickable() {
  for (let i = 1; i <= 23; i++) {
    $('.pick' + i).mousedown(pickupabil);
  }
}

function pickupabil() {
  $('#pickholder').contents(this.innerHTML);
  $('#pickholder').mousemove(holdit);
  $('#pickholder').css('display','inline');
console.log('pickup '+$('#pickholder').contents());
  for (let j = 0; j < 5; j++) {
    $('.pick' + j).mouseup(checkdrop);
  }
}

function checkdrop() {

}

function holdit() {
  console.log('holding '+this);
  // this.css('top', event.pageY - this.height() / 2);
  // this.css('left', event.pageX - this.width() / 2);
}
///for wednesday


$(document).ready(function(event) {
  tooltiparr = [$('#warpick'), $('#ranpick'), $('#magpick')];

  $('body').mousemove(tooltipfollow);
  for (let id in tooltiparr) {
    tooltiparr[id].mouseenter(showtooltip);
    tooltiparr[id].mouseleave(hidetooltip);
  }
  $('#warpick').click(heropicked);
  $('#ranpick').click(heropicked);
  $('#magpick').click(heropicked);
  makepickable();
});
