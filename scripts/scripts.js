const tooltipinfo = {
  warpick: "The Warrior has the highest starting HP and Armor. They also begin play with the 'Repair' initiation ability, which lets you repair broken armor.",
  ranpick: "The Ranger has the highest starting Energy and Damage. They also begin play with the 'Energize' initiation ability, which lets you recover missing energy.",
  magpick: "The Magi starts with a Ward to mitigate magic damage, and their attacks are considered magic damage, which bypasses armor. They also begin play with the 'Protect' initiation ability, which lets you recharge a diminished ward."
};

const condarr = [{
  name: 'burn',
  effect: 'Burning: -2 HP. ',
  html: '<img class="conds condburn" src="images/conditions/condition-burn.gif" />',
}, {
  name: 'curse',
  effect: 'Cursed: reflect 25% damage back on self. ',
  html: '<img class="conds condcurse" src="images/conditions/condition-curse.gif" />',
}, {
  name: 'poison',
  effect: 'Poisoned: -2 HP. ',
  html: '<img class="conds condpoison" src="images/conditions/condition-poison.gif" />',
}, {
  name: 'silence',
  effect: 'Silenced: magic fumble. ',
  html: '<img class="conds condsilence" src="images/conditions/condition-silence.gif" />',
}, {
  name: 'turn',
  effect: 'Turned: auto-fumble. ',
  html: '<img class="conds condturn" alt="Turned: automatically fumble" src="images/conditions/condition-turn.gif" />',
}, ];

var apiurl = '';
var tooltiparr = [];
var displayabils = [];
var heldabil = '';
var droparr = [];
var dropwidth = 0;
var analyzed = [];
var habilarr = ['', '', '', '', ''];
var mabilarr = ['', '', '', '', ''];
var hresultsarr = [];
var mresultsarr = [];
var dhabilarr = ['defaulth', 'defaulth', 'defaulth', 'defaulth', 'defaulth'];
var dmabilarr = ['defaultm', 'defaultm', 'defaultm', 'defaultm', 'defaultm'];
var analyzebool = false;
var clickcount = 0;
var initbool = false;
var mdmgmult = 1;
var currmonster = {};

var heroinfo = {
  name: '',
  illus: 'images/characters/magi.gif',
  level: 1,
  phystier: 0,
  magtier: 0,
  maxhp: 30,
  currhp: 30,
  maxenergy: 24,
  currenergy: 24,
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

function showerr(str) {
  //shows passed error text
  $('#errmessage').text(str);
  $('#errholder').css('display', 'flex');
  $('body').click(errdisplay);
}

function errdisplay() {
  clickcount++;
  if (clickcount > 1) {
    $('#errholder').css('display', 'none');
    $('body').unbind('click');
    clickcount = 0;
  }
}

function mousefollow() {
  //matches tooltips and errors to mouse coordinates
  $('#encounterend').css('top', event.pageY);
  $('#encounterend').css('left', event.pageX - $('#encounterend').width() / 2);
  $('#errholder').css('top', event.pageY - 200);
  $('#errholder').css('left', event.pageX - $('#errholder').width() / 2);
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
    heroinfo['phystier'] = 1;
    addabil('Repair');
    addabil('Block');
    addabil('Combo');
  } else if (this.id === 'ranpick') {
    heroinfo['maxhp'] = 38;
    heroinfo['maxenergy'] = 30;
    heroinfo['basedmg'] = 6;
    heroinfo['maxarmor'] = 1.5;
    heroinfo['phystier'] = 1;
    addabil('Energize');
    addabil('Dodge');
    addabil('Opening-Volley');
  } else if (this.id === 'magpick') {
    heroinfo['dtype'] = 'Magical';
    heroinfo['maxhp'] = 27;
    heroinfo['maxenergy'] = 28;
    heroinfo['maxward'] = 1.5;
    heroinfo['magtier'] = 1;
    addabil('Protect');
    addabil('Lightning-Bolt');
    addabil('Mote-of-Fire');
  }
  maxresources();
  sethstats();
  //temporary monster initialization
  setmonster(monsterarr[Math.floor(Math.random() * monsterarr.length)]);
}

function setmonster(monst) {
  currmonster = monst;
  setmstats();
}

function resethero() {
  //resets hero stats to base values
  heroinfo['name'] = 'Hero';
  heroinfo['level'] = 1;
  heroinfo['phystier'] = 0;
  heroinfo['magtier'] = 0;
  heroinfo['initabils'] = ['Analyze', 'Heal'];
  heroinfo['abils'] = ['Attack'];
  heroinfo['dmgvariance'] = 2;
  heroinfo['basedmg'] = 5;
  heroinfo['maxhp'] = heroinfo['currhp'] = 30;
  heroinfo['maxenergy'] = heroinfo['currenergy'] = 20;
  heroinfo['maxarmor'] = heroinfo['currentarmor'] = 1;
  heroinfo['maxward'] = heroinfo['currentward'] = 0;
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
  sethstats();
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
  $('#hhpbar').prop('style', `width: ${Math.floor(100*(heroinfo['currhp']/heroinfo['maxhp']))}%`)
  $('#henergy').text(`Energy: ${heroinfo['currenergy']}/${heroinfo['maxenergy']}`);
  $('#henergybar').prop('style', `width: ${Math.floor(100*(heroinfo['currenergy']/heroinfo['maxenergy']))}%`)
  $('#hlevel').text(`Level: ${heroinfo['level']}`);
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
  //hides ineligible level up init abilities
  for (let levs in initabilityarr) {
    $('#lev' + initabilityarr[levs].name).css('display', 'inline');
    for (let kinits in heroinfo['initabils']) {
      if (initabilityarr[levs].name === heroinfo['initabils'][kinits]) {
        $('#lev' + initabilityarr[levs].name).css('display', 'none');
      }
    }
    if (initabilityarr[levs].type === 'Magical' && initabilityarr[levs].tier > heroinfo['magtier']) {
      $('#lev' + initabilityarr[levs].name).css('display', 'none');
    } else if (initabilityarr[levs].type === 'Physical' && initabilityarr[levs].tier > heroinfo['phystier']) {
      $('#lev' + initabilityarr[levs].name).css('display', 'none');
    }
  }
  //hides ineligible level up enc abilities
  for (let alevs in abilityarr) {
    $('#lev' + abilityarr[alevs].name).css('display', 'inline');
    for (let kabils in heroinfo['abils']) {
      if (abilityarr[alevs].name === heroinfo['abils'][kabils]) {
        $('#lev' + abilityarr[alevs].name).css('display', 'none');
      }
    }
    if (abilityarr[alevs].type === 'Magical' && abilityarr[alevs].tier > heroinfo['magtier']) {
      $('#lev' + abilityarr[alevs].name).css('display', 'none');
    } else if (abilityarr[alevs].type === 'Physical' && abilityarr[alevs].tier > heroinfo['phystier']) {
      $('#lev' + abilityarr[alevs].name).css('display', 'none');
    }
  }
}

function setmstats() {
  //updates monsters's stat displays
  $('#monster-pic').prop('src', currmonster['illus']);
  $('#monster-name').text(currmonster['name']);
  $('#mhp').text(`HP: ${currmonster['currhp']}/${currmonster['maxhp']}`);
  $('#mhpbar').prop('style', `width: ${Math.floor(100*(currmonster['currhp']/currmonster['maxhp']))}%`)
  $('#menergy').text(`Energy: ${currmonster['currenergy']}/${currmonster['maxenergy']}`);
  $('#menergybar').prop('style', `width: ${Math.floor(100*(currmonster['currenergy']/currmonster['maxenergy']))}%`)
  $('#mdmg').text(`Damage: ${currmonster['basedmg']}+1d${currmonster['dmgvariance']}`);
  $('#mtype').text(`Type: ${currmonster['dtype']}`);
  if (currmonster['maxarmor'] === currmonster['currarmor']) {
    $('#marmor').text(`Armor: ${currmonster['currarmor']}`);
  } else {
    $('#marmor').text(`Armor: ${currmonster['currarmor']}/${currmonster['maxarmor']}`);
  }
  if (currmonster['maxward'] === 0) {
    $('#mward').text(``);
  } else if (currmonster['maxward'] === currmonster['currward']) {
    $('#mward').text(`Ward: ${currmonster['currward']}`);
  } else {
    $('#mward').text(`Ward: ${currmonster['currward']}/${currmonster['maxward']}`);
  }
  mabilarr = currmonster['abilqueue'];
  checkanalyzed(currmonster['name']);
}

function checkanalyzed(name) {
  analyzebool = false;
  for (let t = 0; t < analyzed.length; t++) {
    if (analyzed[t] === name) {
      analyzebool = true;
    }
  }
  if (analyzebool) {
    setabilqueue(6, 'm');
  } else {
    setabilqueue(6, 'md');
  }
}

function setabilqueue(num, type) {
  //sets values for specified ability queue element.
  //if num > 5, sets all elements for queue type
  //if type is md or hd, sets default value
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
    startloop = endloop = num - 1;
  } else {
    endloop = 4;
  }
  for (let v = startloop; v <= endloop; v++) {
    var vv = v + 1;
    for (let x = 0; x < abilityarr.length; x++) {
      if (abilityarr[x].name === abilarr[v]) {
        //found right ability
        var abiltype = 'un';
        if (abilityarr[x].type === 'Physical') {
          abiltype = 'phys';
        } else if (abilityarr[x].type === 'Magical') {
          abiltype = 'mag';
        }
        if (charmod === 'h' && abilityarr[x].roundreq > 0 && abilityarr[x].roundreq !== vv) {
          //round doesn't match ability's roundreq
          showerr('This ability can only be used on round ' + abilityarr[x].roundreq + '.');
        } else if (charmod === 'h' && abilityarr[x].typereq && !matchtype(abilityarr[x].name, abilarr[v - 1], abilityarr[x].type)) {
          //ability's placement prerequisites not met
          if (abilityarr[x].name === 'Flame-Wave') {
            showerr('' + abilityarr[x].name + ' can only be used immediately after the "Mote-of-Fire" ability.');
          } else if (abilityarr[x].name === 'Combo') {
            showerr('' + abilityarr[x].name + ' can only be used immediately after the "Attack" ability.');
          } else if (abilityarr[x].name === 'Counter-Attack') {
            showerr('' + abilityarr[x].name + ' can only be used immediately after the "Block" ability.');
          } else {
            showerr('This ability can only be used immediately after another ' + abilityarr[x].type + ' ability.');
          }
        } else {
          $('#round' + vv + charmod).attr('value', abilityarr[x].name);
          $('#round' + vv + charmod).html(`<i class="ra ${abilityarr[x].icon} ra-3x abil-box ${abiltype}-abil"></i>`);
        }
      }
    }
  }
}

function matchtype(cabilname, pabilname, dtype) {
  //checks for ability dropping prerequisites
  if (cabilname === 'Flame-Wave') {
    if (pabilname === 'Mote-of-Fire') {
      return true;
    } else {
      return false;
    }
  } else if (cabilname === 'Combo') {
    if (pabilname === 'Attack') {
      return true;
    } else {
      return false;
    }
  } else if (cabilname === 'Counter-Attack') {
    if (pabilname === 'Block') {
      return true;
    } else {
      return false;
    }
  } else {
    for (let z = 0; z < abilityarr.length; z++) {
      if (abilityarr[z].name === pabilname) {
        if (abilityarr[z].type === dtype) {
          return true;
        }
      }
      return false;
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
        habilarr[c] = heldabil;
        setabilqueue(cc, 'h');

      }
    }
  }

  heldabil = '';
  $('#pickholder').css('display', 'none');
  $('body').unbind('mouseup');
}

function holdit() {
  //while dragging ability, match it to mouse coordinates
  $('#pickholder').css('top', event.pageY - $('#pickholder').height() / 2);
  $('#pickholder').css('left', event.pageX - $('#pickholder').width() / 2);
}

function checkinitiation() {
  //checks to see if initiation is ready to run, and then does so if it is
  var checked = $('input[name=init-group]:checked').val();
  if (checked !== undefined) {
    var realinit;
    for (var o = 0; o < initabilityarr.length; o++) {
      if (initabilityarr[o].name === checked) {
        realinit = initabilityarr[o];
      }
    }
    if (realinit) {
      if (realinit.energycost > heroinfo['currenergy']) {
        showerr('That ability costs ' + realinit.energycost + ' energy, but your hero only has ' + heroinfo['currenergy'] + '. Please select a different ability.');
      } else {
        runinitiation(realinit);
      }
    }
  } else {
    showerr('Please select an ability to initiate with.');
  }
}

function checkencounter() {
  //checks to see if encounter is ready to run, and then does so if it is
  for (var h in habilarr) {
    if (habilarr[h] === '') {
      var notready = true;
    }
  }
  if (notready) {
    showerr('Make sure you have an ability queued for each round, then try again.');
  } else {
    gethvariance();
    //runencounter();
  }
}

function runinitiation(iabil) {
  //uncheck initiation options
  for (var w = 0; w < initabilityarr.length; w++) {
    var nombre = initabilityarr[w].name.toLowerCase();
    $('#rb-' + nombre)[0].checked = false;
  }
  //processes initiation
  heroinfo['currenergy'] -= iabil.energycost;
  if (heroinfo['currenergy'] < 0) {
    heroinfo['currenergy'] = 0;
  }
  switch (iabil.name) {
    case 'Analyze':
      analyzed.push(currmonster['name']);
      break;
    case 'Energize':
      heroinfo['currenergy'] += iabil.energybump;
      if (heroinfo['currenergy'] > heroinfo['maxenergy']) {
        heroinfo['currenergy'] = heroinfo['maxenergy'];
      }
      break;
    case 'Exhaust':
      currmonster['currenergy'] *= iabil.menergymultiplier;
      break;
    case 'Heal':
      heroinfo['currhp'] += iabil.hpbump;
      if (heroinfo['currhp'] > heroinfo['maxhp']) {
        heroinfo['currhp'] = heroinfo['maxhp'];
      }
      break;
    case 'Intimidate':
      mdmgmult = iabil.mdamagemultiplier;
      break;
    case 'Protect':
      heroinfo['currward'] += iabil.wbump;
      if (heroinfo['currward'] > heroinfo['maxward']) {
        heroinfo['currward'] = heroinfo['maxward'];
      }
      break;
    case 'Repair':
      heroinfo['currarmor'] += iabil.abump;
      if (heroinfo['currarmor'] > heroinfo['maxarmor']) {
        heroinfo['currarmor'] = heroinfo['maxarmor'];
      }
      break;
    case 'Weaken':
      currmonster['basedmg'] -= 1;
      currmonster['dmgvariance'] -= 1;
      break;
  }
  sethstats();
  setmstats();
  //start encounter
}

function runencounter() {
  //auto-analyze
  analyzed.push(currmonster['name']);
  checkanalyzed(currmonster['name']);
  //processes a full encounter, round by round
  var hrealabils = [];
  var mrealabils = [];
  var hdefault = [false, false, false, false, false];
  var mdefault = [false, false, false, false, false];
  var gameover = false;
  var victory = false;
  var hcondtimer = [0, 0, 0, 0, 0];
  var mcondtimer = [0, 0, 0, 0, 0];
  var $condapplier = '';
  for (let a = 0; a < 5; a++) {
    var aa = a + 1;
    //math value setup
    var houtput = '';
    var moutput = '';
    var htaken = 0;
    var mtaken = 0;
    var hdealt = 0;
    var mdealt = 0;
    var hvar = 0;
    var mvar = 0;
    var hespent = 0;
    var mespent = 0;
    var htypematch = 1;
    var mtypematch = 1;
    //get the complete object for each ability
    for (let b = 0; b < abilityarr.length; b++) {
      if (abilityarr[b].name === habilarr[a]) {
        hrealabils.push(abilityarr[b]);
      }
      if (abilityarr[b].name === mabilarr[a]) {
        mrealabils.push(abilityarr[b]);
      }
    }
    //determine non-matching abil type modifier
    if (hrealabils[a].type !== 'Untyped' && hrealabils[a].type !== heroinfo['dtype']) {
      htypematch = .6;
    }
    if (mrealabils[a].type !== 'Untyped' && mrealabils[a].type !== currmonster['dtype']) {
      mtypematch = .6;
    }
    //check and spend energy, default if not enough. fumble if silenced and magic (not Cleanse)
    if (hrealabils[a].name !== 'Cleanse' && hcondtimer[3] > 0 && hrealabils[a].type === 'Magical') {
      //silenced and magic fumble
      for (let abilobjs in abilityarr) {
        if (abilityarr[abilobjs].name === 'Fumble') {
          hrealabils[a] = abilityarr[abilobjs];
        }
      }
      houtput += 'FUMBLED! ';
    } else if (hrealabils[a].energycost > heroinfo['currenergy']) {
      hrealabils[a] = abilityarr[0];
      habilarr[a] = 'Attack';
      hdefault[a] = true;
      houtput += 'Lacking energy - defaulting to "Attack". ';
    } else {
      hespent = hrealabils[a].energycost;
      if (hespent > 0) {
        houtput += '-' + hespent + ' Energy. ';
      }
    }
    if (mrealabils[a].name !== 'Cleanse' && mcondtimer[3] > 0 && mrealabils[a].type === 'Magical') {
      //silenced and magic fumble
      for (let abilobjs in abilityarr) {
        if (abilityarr[abilobjs].name === 'Fumble') {
          mrealabils[a] = abilityarr[abilobjs];
        }
      }
      moutput += 'FUMBLED! ';
    } else if (mrealabils[a].name !== 'Cleanse' && mcondtimer[4] > 0 && currmonster['evil']) {
      //turned
      for (let abilobjs in abilityarr) {
        if (abilityarr[abilobjs].name === 'Fumble') {
          mrealabils[a] = abilityarr[abilobjs];
        }
      }
      moutput += 'FUMBLED! ';
    } else if (mrealabils[a].energycost > currmonster['currenergy']) {
      mrealabils[a] = abilityarr[0];
      mdefault[a] = true;
      moutput += 'Lacking energy - defaulting to "Attack". ';
    } else {
      mespent = mrealabils[a].energycost;
      if (mespent > 0) {
        moutput += '-' + mespent + ' Energy. ';
      }
      //apply armor/ward break and conditions
      if (!mrealabils[a].evade) {
        if (hrealabils[a].abreak > 0) {
          moutput += '-' + hrealabils[a].abreak + ' Armor. ';
        }
        if (hrealabils[a].wbreak > 0) {
          moutput += '-' + hrealabils[a].wbreak + ' Ward. ';
        }
        currmonster['currarmor'] -= hrealabils[a].abreak;
        currmonster['currward'] -= hrealabils[a].wbreak;
        if (currmonster['currarmor'] < 0) {
          currmonster['currarmor'] = 0;
        }
        if (currmonster['currward'] < 0) {
          currmonster['currward'] = 0;
        }
        //condition application:
        if (hrealabils[a].condapply.length > 0) {
          //let condlist = hrealabils[a].condapply;
          for (var c in hrealabils[a].condapply) {
            for (var s in condarr) {
              if (hrealabils[a].condapply[c] === condarr[s].name) {
                mcondtimer[c] = 2;
                if (condarr[s].name === 'curse' || condarr[s].name === 'silence') {
                  mcondtimer[c] += 1;
                }
              }
            }
          }
        }
      } else {
        moutput += 'Evading. ';
      }
      if (!hrealabils[a].evade) {
        if (mrealabils[a].abreak > 0) {
          houtput += '-' + mrealabils[a].abreak + ' Armor. ';
        }
        if (mrealabils[a].wbreak > 0) {
          houtput += '-' + mrealabils[a].wbreak + ' Ward. ';
        }
        heroinfo['currarmor'] -= mrealabils[a].abreak;
        heroinfo['currward'] -= mrealabils[a].wbreak;
        if (heroinfo['currarmor'] < 0) {
          heroinfo['currarmor'] = 0;
        }
        if (heroinfo['currward'] < 0) {
          heroinfo['currward'] = 0;
        }
        //condition application:
        if (mrealabils[a].condapply.length > 0) {
          //var condlist = mrealabils[a].condapply;
          for (var c in mrealabils[a].condapply) {
            for (var s in condarr) {
              if (mrealabils[a].condapply[c] === condarr[s].name) {
                hcondtimer[s] = 2;
                if (condarr[s].name === 'silence') {
                  hcondtimer[c] += 1;
                }
              }
            }
          }
        }
      } else {
        houtput += 'Evading. ';
      }
      //determine damage dealt
      if (hrealabils[a].offense) {
        hvar = hresultsarr[a];
        hdealt = Math.round((heroinfo['basedmg'] + hvar) * hrealabils[a].dmgmultiplier);
      }
      if (mrealabils[a].offense) {
        mvar = mresultsarr[a];
        mdealt = Math.round((currmonster['basedmg'] + mvar) * mrealabils[a].dmgmultiplier);
      }
      //determine damage taken
      if (!mrealabils[a].ignoremit) {
        if (mrealabils[a].type === 'Physical' || (mrealabils[a].type === 'Untyped' && currmonster['dtype'] === 'Physical')) {
          htaken = mdealt * (1 - hrealabils[a].pmitigate);
          htaken -= heroinfo['currarmor'];
        } else {
          htaken = mdealt * (1 - hrealabils[a].mmitigate);
          htaken -= heroinfo['currward'];
        }
      } else {
        htaken = mdealt;
      }
      if (htaken < 0) {
        htaken = 0;
      }
      //monster heal from Drain-Life
      if (mrealabils[a].name === 'Drain-Life') {
        currmonster['currhp'] += htaken;
        if (currmonster['currhp'] > currmonster['maxhp']) {
          currmonster['currhp'] = currmonster['maxhp'];
        }
        moutput += 'Drained ' + htaken + ' HP. ';
      }
      if (!hrealabils[a].ignoremit) {
        if (hrealabils[a].type === 'Physical' || (hrealabils[a].type === 'Untyped' && heroinfo['dtype'] === 'Physical')) {
          mtaken = hdealt * (1 - mrealabils[a].pmitigate);
          mtaken -= currmonster['currarmor'];
        } else {
          mtaken = hdealt * (1 - mrealabils[a].mmitigate);
          mtaken -= currmonster['currward'];
        }
      } else {
        mtaken = hdealt;
      }
      if (mtaken < 0) {
        mtaken = 0;
      }
      //hero heal from Drain-Life
      if (hrealabils[a].name === 'Drain-Life') {
        currmonster['currhp'] += htaken;
        if (currmonster['currhp'] > currmonster['maxhp']) {
          currmonster['currhp'] = currmonster['maxhp'];
        }
        houtput += 'Drained ' + mtaken + ' HP. ';
      }
      //account for reflection
      var htakentemp = htaken;
      var mtakentemp = mtaken;
      if (hrealabils[a].type === 'Physical' || (hrealabils[a].type === 'Untyped' && heroinfo['dtype'] === 'Physical')) {
        htakentemp += (mrealabils[a].preflect * mtaken);
      } else {
        htakentemp += (mrealabils[a].mreflect * mtaken);
      }
      if (mrealabils[a].type === 'Physical' || (mrealabils[a].type === 'Untyped' && currmonster['dtype'] === 'Physical')) {
        mtakentemp += (hrealabils[a].preflect * htaken);
      } else {
        mtakentemp += (hrealabils[a].mreflect * htaken);
      }
      //account for condition damage and display conditions
      for (let y = 0; y < 5; y++) {
        if (hcondtimer[y] > 0) {
          switch (y) {
            case 0:
              htakentemp += 2;
              $condapplier = $(condarr[y].html);
              break;
            case 1:
              htakentemp += (hdealt * .3);
              $condapplier = $(condarr[y].html);
              break;
            case 2:
              htakentemp += 2;
              $condapplier = $(condarr[y].html);
              break;
            case 3:
              $condapplier = $(condarr[y].html);
              break;
            case 4:
              //$condapplier = $(condarr[y].html); //heroes aren't turnable
              break;
          }
          $('#h' + aa + 'cond').append($condapplier);
          $condapplier = '';
          hcondtimer[y]--;
        }
        if (mcondtimer[y] > 0) {
          switch (y) {
            case 0:
              mtakentemp += 2;
              $condapplier = $(condarr[y].html);
              break;
            case 1:
              mtakentemp += (mdealt * .3);
              $condapplier = $(condarr[y].html);
              break;
            case 2:
              mtakentemp += 2;
              $condapplier = $(condarr[y].html);
              break;
            case 3:
              $condapplier = $(condarr[y].html);
              break;
            case 4:
              $condapplier = $(condarr[y].html);
              break;
          }
          $('#m' + aa + 'cond').append($condapplier);
          $condapplier = '';
          mcondtimer[y]--;
        }
      }
      htaken = Math.round(htakentemp);
      mtaken = Math.round(mtakentemp);
      if (htaken > 0) {
        houtput += '-' + htaken + ' HP. ';
      }
      if (mtaken > 0) {
        moutput += '-' + mtaken + ' HP. ';
      }
      //update stats
      heroinfo['currhp'] -= htaken;
      heroinfo['currenergy'] -= hespent;
      currmonster['currhp'] -= mtaken;
      currmonster['currenergy'] -= mespent;
      //check for deados
      if (currmonster['currhp'] <= 0) {
        moutput += 'DEFEATED!';
        currmonster['currhp'] = 0;
        victory = true;
      }
      if (heroinfo['currhp'] <= 0) {
        houtput += 'DEFEATED!';
        heroinfo['currhp'] = 0;
        gameover = true;
      }
      //display results
      $('#h' + aa + 'out').text(houtput);
      $('#m' + aa + 'out').text(moutput);
      sethstats();
      setmstats();
      var title = '';
      var msg = '';
      var func = '';
      if (gameover) {
        //put up game over info
        title = 'Game Over';
        msg = 'Oh no, our mighty hero has fallen in battle! However, all is not lost. Click to restart the game with a new hero.';
        func = defeat;
        break;
      } else if (victory) {
        //put up next encounter/level up
        break;
      } else if (a === 4) {
        //call for another engagement
        title = 'The battle continues...';
        msg = 'No clear victor was determined during this encounter, and the battle must continue. Take a breath and then click to start setting up your game plan for the next round with your opponent.';
        func = reengage;
      }
    }
  }
  endencounter(title, msg, func);
}

function endencounter(title, msg, func) {
  console.log('called endencounter');
  $('#endtitle').text(title);
  $('#endmsg').text(msg);
  $('#encounterend').css('display', 'inline');
  $('body').mouseup(func);
}

function reengage() {
  console.log('called reengage');
  //encounter inconclusive, re-engage for another encounter
  clickcount++;
  if (clickcount > 1) {
    //clear any encounter stuff
    for (var f = 0; f <= 5; f++) {
      $('#h' + f + 'cond').html('');
      $('#m' + f + 'cond').html('');
      $('#h' + f + 'out').text('');
      $('#m' + f + 'out').text('');
    }
    $('#encounterend').css('display', 'none');
    $('body').unbind('mouseup');
    clickcount = 0;
    setabilqueue(6, 'hd');
  }
}

function defeat() {
  console.log('defeated');
  clickcount++;
  if (clickcount > 1) {
    //clear any encounter stuff
    for (var z = 0; z <= 5; z++) {
      $('#h' + z + 'cond').html('');
      $('#m' + z + 'cond').html('');
      $('#h' + z + 'out').text('');
      $('#m' + z + 'out').text('');
    }
    $('#encounterend').css('display', 'none');
    $('body').unbind('mouseup');
    clickcount = 0;
    setabilqueue(6, 'hd');
  }
}

function chooselevelup() {
  //adds the selected init or enc ability to hero's known abilities,
  //increases related tier, grants auto stat bumps, maxs resources, starts next level
  var thisname = this.id.substring(3);
  for (var checkinit in initabilityarr) {
    if (initabilityarr[checkinit].type === 'Physical') {
      heroinfo['phystier'] += 1;
    } else {
      heroinfo['magtier'] += 1;
    }
  }
  for (var checkabil in abilityarr) {
    if (abilityarr[checkabil].type === 'Physical') {
      heroinfo['phystier'] += 1;
    } else {
      heroinfo['magtier'] += 1;
    }
  }
  heroinfo['maxhp'] += 3;
  heroinfo['maxenergy'] += 2;
  heroinfo['level'] += 1;
  addabil(thisname);
  maxresources();
}

//

function gethvariance() {
  //on success for h, call for m. on success for m, start runencounter
  var apiurl = `https://cors-anywhere.herokuapp.com/https://rolz.org/api/?5d${heroinfo['dmgvariance']}.json`;
  fetch(apiurl).then(res => res.json()).then(d => {
    hvarsuccess(d);
  });
}


function hvarsuccess(data) {
  //hero variance data has returned
  var gotobj = data;
  var hresults = gotobj.details;
  hresults = hresults.slice(2, hresults.length - 2); //trim whitespace and parens
  hresultsarr = hresults.split(' +');
  for (var r = 0; r < hresultsarr.length; r++) {
    hresultsarr[r] = parseInt(hresultsarr[r]); //convert to ints
  }
  getmvariance();
}

function getmvariance() {
  var mapiurl = `https://cors-anywhere.herokuapp.com/https://rolz.org/api/?5d${currmonster['dmgvariance']}.json`;
  fetch(mapiurl).then(res => res.json()).then(g => {
    mvarsuccess(g);
  });
}

function mvarsuccess(data) {
  //monster variance data has returned
  var mgotobj = data;
  var mresults = mgotobj.details;
  mresults = mresults.slice(2, mresults.length - 2); //trim whitespace and parens
  mresultsarr = mresults.split(' +');
  for (var r = 0; r < mresultsarr.length; r++) {
    mresultsarr[r] = parseInt(mresultsarr[r]); //convert to ints
  }
  runencounter();
}

$(document).ready(function(event) {
  //sets up tooltip
  tooltiparr = [$('#warpick'), $('#ranpick'), $('#magpick')];
  $('body').mousemove(mousefollow);
  for (let id in tooltiparr) {
    tooltiparr[id].mouseenter(showtooltip);
    tooltiparr[id].mouseleave(hidetooltip);
  }
  $('#warpick').click(heropicked);
  $('#ranpick').click(heropicked);
  $('#magpick').click(heropicked);
  //makes abilities draggable and level-up abilities chooseable
  for (var i = 1; i < abilityarr.length - 1; i++) {
    $('.pick' + i).mousedown(pickupabil);
    $('#lev' + abilityarr[i].name).mousedown(chooselevelup);
  }
  //makes levelup init abilities chooseable
  for (var u = 1; u < initabilityarr.length; u++) {
    $('#lev' + initabilityarr[u].name).click(chooselevelup);
  }
  //sets up initiation button
  $('#init-submit').click(checkinitiation);
  //sets up encounter lockin button
  $('#encounter-lockin').click(checkencounter);
});
