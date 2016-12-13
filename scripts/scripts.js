var tooltipinfo = {
  warpick: "The Warrior has the highest starting HP and Armor. They also begin play with the 'Repair' initiation ability, which lets you repair broken armor.",
  ranpick: "The Ranger has the highest starting Energy and Base Damage. They also begin play with the 'Energize' initition ability, which lets you recover missing energy.",
  magpick: "The Magi starts with a Ward to mitigate magic damage, and their attacks are considered magic damage, which bypasses armor. They also begin play with the 'Protect' initiation ability, which lets you recharge a diminished ward."
};

var tooltiparr = [];


var heroinfo = {
  maxhp: 30,
  currhp: 30,
  maxenergy: 20,
  currenergy: 20,
  dtype: 'Physical',
  basedmg: 5,
  dmgvariance: [1, 2],
  maxarmor: 1,
  currarmor: 1,
  maxward: 0,
  currward: 0,
  name: '',
  illus: 'images/characters/magi.gif',
  initabils: [],
  abils: []
};

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
})

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
  heroinfo['initabils'] = ['Analyze', 'Heal'];
  heroinfo['abils'] = ['Attack', 'Block'];
  heroinfo['dmgvariance'] = [1,2];
  heroinfo['basedmg'] = 5;
  heroinfo['currarmor'] = heroinfo['maxarmor'] = 1;
  heroinfo['currward'] = heroinfo['maxward'] = 0;
  if (this.id === 'warpick') {
    heroinfo['initabils'].push('Repair');
    heroinfo['currhp'] = heroinfo['maxhp'] = 40;
    heroinfo['currarmor'] = heroinfo['maxarmor'] = 3;
    heroinfo['dmgvariance'] = [1,4];
  } else if (this.id === 'ranpick') {
    heroinfo['initabils'].push('Energize');
    heroinfo['currenergy'] = heroinfo['maxenergy'] = 30;
    heroinfo['basedmg'] = 8;
  } else if (this.id === 'magpick') {
    heroinfo['initabils'].push('Protect');
    heroinfo['dtype'] = 'Magical';
    heroinfo['currward'] = heroinfo['maxward'] = 3;
  }
  heroinfo['illus'] = this.src;
  heroinfo['name'] = this.name;
  sethstats(heroinfo);
}

function sethstats() {
  //updates hero's stat displays
  $('#hero-pic').prop('src', heroinfo['illus']);
  $('#hero-name').text(heroinfo['name']);
  $('#hhp').text(`HP: ${heroinfo['currhp']}/${heroinfo['maxhp']}`);
  $('#hhpbar').prop('style', `width: ${Math.floor(heroinfo['currhp']/heroinfo['maxhp'])}`)
  $('#henergy').text(`Energy: ${heroinfo['currenergy']}/${heroinfo['maxenergy']}`);
  $('#henergybar').prop('style', `width: ${Math.floor(heroinfo['currenergy']/heroinfo['maxenergy'])}`)
  $('#hdmg').text(`Damage: ${heroinfo['basedmg']}+${heroinfo['dmgvariance'][0]}d${heroinfo['dmgvariance'][1]}`);
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
  $('label').css('display', 'none');
  for (let inits in heroinfo['initabils']) {
    $('#l' + heroinfo['initabils'][inits]).css('display', 'inline-block');
  }
}
