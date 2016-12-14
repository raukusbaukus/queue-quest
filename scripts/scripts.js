var tooltipinfo = {
  warpick: "The Warrior has the highest starting HP and Armor. They also begin play with the 'Repair' initiation ability, which lets you repair broken armor.",
  ranpick: "The Ranger has the highest starting Energy and Base Damage. They also begin play with the 'Energize' initition ability, which lets you recover missing energy.",
  magpick: "The Magi starts with a Ward to mitigate magic damage, and their attacks are considered magic damage, which bypasses armor. They also begin play with the 'Protect' initiation ability, which lets you recharge a diminished ward."
};

var tooltiparr = [];
var displayabils = [];
var heldabil = '';
var droparr = [];
var dropwidth = 0;
var habilarr = ['', '', '', '', ''];
var mabilarr = ['', '', '', '', ''];
var dhabilarr = ['defaulth', 'defaulth', 'defaulth', 'defaulth', 'defaulth'];
var analyzed = ['defaultm', 'defaultm', 'defaultm', 'defaultm', 'defaultm'];
var analyzebool = false;

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
  //shows tooltip if applicable
  $('#tooltip').text(tooltipinfo[this.id]);
  $('#tooltip').css('display', 'inline');
}

function hidetooltip() {
  //hides tooltip
  $('#tooltip').css('display', 'none');
}

function tooltipfollow() {
  //matches tooltip to mouse coordinates
  $('#tooltip').css('top', event.pageY);
  $('#tooltip').css('left', event.pageX - $('#tooltip').width() / 2);
}

function heropicked() {
  //initializes picked hero values
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
  setmstats(monsterarr[Math.floor(Math.random() * monsterarr.length)]);
}

function resethero() {
  //resets hero stats to base values
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
  for (let initabilobjs in initabilityarr) {
    //apply bonus stats from added init ability
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

  for (let abilobjs in abilityarr) {
    //apply bonus stats from added ability
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
  //sets all curr hero values to max
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
  mabilarr = monsterinfo['abilqueue'];
  checkanalyzed(monsterinfo['name']);
}

function checkanalyzed(name) {
  analyzebool = false;
  for (let t = 0; t < analyzed.length; t++) {
    if (analyzed[t] === name) {
      analyzebool = true;
    }
  }
  analyzebool = true; //temporary
  console.log('analyzing');
  if (analyzebool) {
    setabilqueue(6,'m');
  }
}

function setabilqueue(num, type) {
  //sets values for specified ability queue element.
  //if num > 5, sets all elements for queue type
  var startloop = 0;
  var endloop = 0;
  var charmod = 'h';
  var abilarr = habilarr;
  if (type === 'm') {
    charmod = 'm';
    abilarr = mabilarr;
  } else if (type === 'hd') {
    abilarr = dhabilarr;
  } else if (type === 'md') {
    charmod = 'm';
    abilarr = dmabilarr;
  }
  if (num < 6) {
    startloop = endloop = num-1;
  } else {
    endloop = 4;
  }
  for (let v = startloop; v <= endloop; v++) {
    console.log(charmod+v+' '+abilarr);
    var vv = v + 1;
    for (let x = 0; x < abilityarr.length; x++) {
      if (abilityarr[x].name === abilarr[v]) {
        var abiltype = 'un';
        if (abilityarr[x].type === 'Physical') {
          abiltype = 'phys';
        } else if (abilityarr[x].type === 'Magical') {
          abiltype = 'mag';
        }
        $('#round' + vv + charmod).attr('value', abilityarr[x].name);
        $('#round' + vv + charmod).html(`<i class="ra ${abilityarr[x].icon} ra-3x abil-box ${abiltype}-abil"></i>`);
      }
    }
  }
}

function pickupabil() {
  //begin dragging ability
  $('#pickholder').html(this.innerHTML);
  heldabil = this.id.slice(1);
  $('body').mousemove(holdit);
  $('#pickholder').css('display', 'inline');
  droparr = [];
  dropwidth = $('#round1h').width() + 10;
  for (var d = 1; d <= 5; d++) {
    droparr.push($('#round' + d + 'h').position());
    //console.log('here '+ droparr[d-1].top);
    if (d === 5) {
      droparr.push({
        'top': $('#round' + d + 'h').position().top + $('#round' + d + 'h').height() + 5
      });
    }
  }
  $('body').mouseup(checkdrop);
}

function checkdrop() {
  //while dragging, onmouseup, check for and process eligible drop
  let checkx = event.pageX;
  let checky = event.pageY;
  if (checkx > droparr[0].left - 10 && checkx < droparr[0].left + dropwidth) {
    for (let c = 0; c <= 5; c++) {
      var cc = c + 1;
      if (droparr[c].top < checky && droparr[c + 1].top >= checky) {
        //$('#round' + cc + 'h').html($('#pickholder').html());
        habilarr[c] = heldabil;
        setabilqueue(cc,'h');

      }
    }
  }

  heldabil = '';
  $('#pickholder').css('display', 'none');
  console.log('checkdrop true');
  $('body').unbind('mouseup');
}

function holdit() {
  //while dragging ability, match it to mouse coordinates
  $('#pickholder').css('top', event.pageY - $('#pickholder').height() / 2);
  $('#pickholder').css('left', event.pageX - $('#pickholder').width() / 2);
}

$(document).ready(function(event) {
  //sets up tooltip
  tooltiparr = [$('#warpick'), $('#ranpick'), $('#magpick')];
  $('body').mousemove(tooltipfollow);
  for (let id in tooltiparr) {
    tooltiparr[id].mouseenter(showtooltip);
    tooltiparr[id].mouseleave(hidetooltip);
  }
  $('#warpick').click(heropicked);
  $('#ranpick').click(heropicked);
  $('#magpick').click(heropicked);
  //makes abilities draggable
  for (let i = 1; i <= 23; i++) {
    $('.pick' + i).mousedown(pickupabil);
  }
});
