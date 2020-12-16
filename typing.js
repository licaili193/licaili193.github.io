var TxtRotate = function(el, toRotate, period, sl, toSlide) {
  this.toRotate = toRotate;
  this.toSlide = toSlide;
  this.el = el;
  this.sl = sl;
  this.loopNum = 0;
  this.period = parseInt(period) || 4000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
  this.toBegin = true;
};
  
TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  if (this.toBegin) {
      var span = this.sl.getElementsByTagName('span')[0];
      span.style.backgroundImage = "url('" + this.toSlide[i] + "')";
      span.classList.remove("slideshow-span-animation");
      window.requestAnimationFrame(function(time) {
          window.requestAnimationFrame(function(time) {
              span.classList.add("slideshow-span-animation");
          });
      });
      this.toBegin = false;
  }
  var fullTxt = this.toRotate[i];
  var quarterRemainPeriod = 3 * this.period / 16;
  var halfTypePeriod = this.period / 8 / fullTxt.length;

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt+'</span>';

  var that = this;
  var delta = halfTypePeriod;

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = 3 * quarterRemainPeriod;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = quarterRemainPeriod;
    this.toBegin = true;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};
