var tooltipinfo = {
  warpick: "The Warrior has the highest starting HP and Armor. They also begin play with the 'Repair' initiation ability, which lets you repair broken armor.",
  ranpick: "The Ranger has the highest starting Energy and Damage. They also begin play with the 'Energize' initiation ability, which lets you recover missing energy.",
  magpick: "The Magi's starts with a Ward to mitigate magic damage, and their attacks are considered magic damage, which bypasses armor. They also begin play with the 'Protect' initiation ability, which lets you recharge a diminished ward."
};

var tooltiparr = [];
var displayabils = [];
var heldabil = '';
var droparr = [];
var dropwidth = 0;
var analyzed = [];
var habilarr = ['', '', '', '', ''];
var mabilarr = ['', '', '', '', ''];
var dhabilarr = ['defaulth', 'defaulth', 'defaulth', 'defaulth', 'defaulth'];
var dmabilarr = ['defaultm', 'defaultm', 'defaultm', 'defaultm', 'defaultm'];
var analyzebool = false;
var clickcount = 0;
var initbool = false;
var currmonster = {};

var heroinfo = {
  name: '',
  illus: 'images/characters/magi.gif',
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

function mousefollow() {
  //matches tooltip to mouse coordinates
  $('#errholder').css('top', event.pageY - 200);
  $('#errholder').css('left', event.pageX - $('#errholder').width() / 2);
  $('#tooltip').css('top', event.pageY);
  $('#tooltip').css('left', event.pageX - $('#tooltip').width() / 2);
}

function errfollow() {
  //matches tooltip to mouse coordinates
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
    heroinfo['maxhp'] = 38;
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
  setmonster(monsterarr[Math.floor(Math.random() * monsterarr.length)]);
}

function setmonster(monst) {
  currmonster = monst;
  setmstats();
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
  $('#hhpbar').prop('style', `width: ${Math.floor(100*(heroinfo['currhp']/heroinfo['maxhp']))}%`)
  $('#henergy').text(`Energy: ${heroinfo['currenergy']}/${heroinfo['maxenergy']}`);
  $('#henergybar').prop('style', `width: ${Math.floor(100*(heroinfo['currenergy']/heroinfo['maxenergy']))}%`)
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
  analyzebool = true; //temporary
  if (analyzebool) {
    setabilqueue(6, 'm');
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
  //makes abilities draggable
  for (let i = 1; i <= 23; i++) {
    $('.pick' + i).mousedown(pickupabil);
  }
  $('#init-submit').click(checkinitiation);
  //sets up encounter lockin button
  $('#encounter-lockin').click(checkencounter);
});

function checkinitiation() {
  console.log($('input[checked=true]').value);
  //checks to see if initiation is ready to run, and then does so if it is
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
    runencounter();
  }
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

function runencounter() {
  //processes a full encounter, round by round
  var hrealabils = [];
  var mrealabils = [];
  var hdefault = [false, false, false, false, false];
  var mdefault = [false, false, false, false, false];
  var gameover = false;
  var victory = false;
  for (let a = 0; a < 5; a++) {
    var aa = a + 1;
    //math value setup
    var houtput = '';
    var moutput = '';
    var apiurl = '';
    var apiobj = {};
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
    //check and spend energy, default if not enough
    if (hrealabils[a].energycost > heroinfo['currenergy']) {
      hrealabils[a] = abilityarr['Attack'];
      habilarr[a] = 'Attack';
      hdefault[a] = true;
      houtput += 'Lacking energy - defaulting to "Attack". ';
    } else {
      hespent = hrealabils[a].energycost;
      heroinfo['currenergy'] -= hespent;
      if (hespent > 0) {
        houtput += '-' + hespent + ' Energy. ';
      }
    }
    if (mrealabils[a].energycost > currmonster['currenergy']) {
      mrealabils[a] = abilityarr[0];
      mdefault[a] = true;
      moutput += 'Lacking energy - defaulting to "Attack". ';
    } else {
      mespent = mrealabils[a].energycost;
      currmonster['currenergy'] -= mespent; //was incorrectly hespent
      if (mespent > 0) {
        moutput += '-' + mespent + ' Energy. ';
      }
    }
    //apply armor and ward break
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
    } else {
      moutput += 'Evading ';
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
    } else {
      houtput += 'Evading. ';
    }
    //determine damage dealt
    if (hrealabils[a].offense) {
      hvar = Math.ceil(Math.random() * heroinfo['dmgvariance']);
      hdealt = Math.round((heroinfo['basedmg'] + hvar) * hrealabils[a].dmgmultiplier);
    }
    if (mrealabils[a].offense) {
      mvar = Math.ceil(Math.random() * currmonster['dmgvariance']);
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
    //account for reflection and round
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
    $('#h' + aa + 'out').text(houtput).fadeTo(1000, 1, sethstats);
    $('#m' + aa + 'out').text(moutput).fadeTo(1000, 1, setmstats);
    if (gameover) {
      //put up game over info
      break;
    } else if (victory) {
      //put up next encounter/level up
      break;
    } else if (a === 4) {
      //call for another engagement
    }
  }



}
