$(document).ready(function(event) {
  // commented out because doesn't work. should work
  // var tooltiparr = [
  //   $('#warpick'), $('#ranpick'), $('#magpick')
  // ];
  // console.log(tooltiparr[0]);
  // for (let id of tooltiparr) {
  //   tooltiparr[id].addEventListener('mouseenter', showtooltip);
  //   tooltiparr[id].addEventListener('mouseleave', hidetooltip);
  // }
   $('body').mousemove(tooltipfollow);
  $('#warpick').mouseenter(showtooltip);
  $('#warpick').mouseleave(hidetooltip);
  $('#ranpick').mouseenter(showtooltip);
  $('#ranpick').mouseleave(hidetooltip);
  $('#magpick').mouseenter(showtooltip);
  $('#magpick').mouseleave(hidetooltip);

})

function showtooltip() {
  $('#tooltip').text(tooltipinfo[this.id]);
  $('#tooltip').css("display","inline");
}

function hidetooltip() {
  $('#tooltip').css("display","none");
}

function tooltipfollow() {
  $('#tooltip').css("top",event.pageY);
  $('#tooltip').css("left",event.pageX);
}

var tooltipinfo = {
  warpick: "this is the warrior",
  ranpick: "this is the ranger",
  magpick: "this is the magi"
};

var tooltiparr = [
  $('#warpick'), $('#ranpick'), $('#magpick')
];
