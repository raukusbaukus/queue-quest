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
  type: 'Physical',
  basedmg: 5,
  dmgvariance: [1, 2],
  maxarmor: 3,
  currarmor: 3,
  maxward: 0,
  currward: 0,
  name: '',
  illus: 'images/characters/magi.gif'
}

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
  $('#tooltip').css("display", "inline");
}

function hidetooltip() {
  $('#tooltip').css("display", "none");
}

function tooltipfollow() {
  $('#tooltip').css("top", event.pageY);
  $('#tooltip').css("left", event.pageX - $('#tooltip').width() / 2);
}

function heropicked() {
  heroinfo['illus'] = this.src;
  heroinfo['name'] = this.name;
  console.log();
  sethstats(heroinfo);
}

function sethstats() {
  $('#hero-pic').prop('src', heroinfo['illus']);
  $('#hero-name').text(heroinfo['name']);
  $('#hhp').text(`HP: ${heroinfo['currhp']}/${heroinfo['maxhp']}`);
$('#hhpbar').prop('style',`width: ${Math.floor(heroinfo['currhp']/heroinfo['maxhp'])}`)
  $('#henergy').text(`Energy: ${heroinfo['currenergy']}/${heroinfo['maxenergy']}`);
  $('#henergybar').prop('style',`width: ${Math.floor(heroinfo['currenergy']/heroinfo['maxenergy'])}`)
  $('#hdmg').text(`Damage: ${heroinfo['basedmg']}+${heroinfo['dmgvariance'][0]}d${heroinfo['dmgvariance'][1]}`);
  $('#htype').text(`Type: ${heroinfo['type']}`);
  if (heroinfo['maxarmor'] === heroinfo['currarmor']) {
    $('#harmor').text(`Armor: ${heroinfo['currarmor']}`);
  } else {
      $('#harmor').text(`Armor: ${heroinfo['currarmor']}/${heroinfo['maxarmor']}`);
  }
  if (heroinfo['maxward'] === 0) {
    $('#hward').text(``);
  } else if (heroinfo['maxward'] === heroinfo['currward']) {
    $('#hward').text(`Ward: ${heroinfo['currarmor']}`);
  } else {
      $('#hward').text(`Ward: ${heroinfo['currward']}/${heroinfo['maxward']}`);
  }
}
