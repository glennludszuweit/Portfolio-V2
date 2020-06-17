$(function () {
  var t = document.querySelector('canvas'),
    o = t.getContext('2d');
  (t.width = window.innerWidth),
    (t.height = window.innerHeight),
    (o.lineWidth = 0.3),
    (o.strokeStyle = new h(150).style);
  var r = { x: (30 * t.width) / 100, y: (30 * t.height) / 100 },
    n = { nb: 250, distance: 100, d_radius: 150, array: [] };
  function a(i) {
    return Math.floor(255 * Math.random() + i);
  }
  function d(i, t, o) {
    return 'rgba(' + i + ',' + t + ',' + o + ', 0.8)';
  }
  function e(i, t, o, r) {
    return (i * t + o * r) / (t + r);
  }
  function h(i) {
    (i = i || 0),
      (this.r = a(i)),
      (this.g = a(i)),
      (this.b = a(i)),
      (this.style = d(this.r, this.g, this.b));
  }
  function s() {
    (this.x = Math.random() * t.width),
      (this.y = Math.random() * t.height),
      (this.vx = -0.5 + Math.random()),
      (this.vy = -0.5 + Math.random()),
      (this.radius = 2 * Math.random()),
      (this.color = new h()),
      console.log(this);
  }
  (s.prototype = {
    draw: function () {
      o.beginPath(),
        (o.fillStyle = this.color.style),
        o.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, !1),
        o.fill();
    },
  }),
    $('canvas').on('mousemove', function (i) {
      (r.x = i.pageX), (r.y = i.pageY);
    }),
    $('canvas').on('mouseleave', function (i) {
      (r.x = t.width / 2), (r.y = t.height / 2);
    }),
    (function () {
      for (i = 0; i < n.nb; i++) n.array.push(new s());
    })(),
    requestAnimationFrame(function a() {
      o.clearRect(0, 0, t.width, t.height),
        (function () {
          for (i = 0; i < n.nb; i++) {
            var o = n.array[i];
            o.y < 0 || o.y > t.height
              ? ((o.vx = o.vx), (o.vy = -o.vy))
              : (o.x < 0 || o.x > t.width) && ((o.vx = -o.vx), (o.vy = o.vy)),
              (o.x += o.vx),
              (o.y += o.vy);
          }
        })(),
        (function () {
          for (i = 0; i < n.nb; i++)
            for (j = 0; j < n.nb; j++)
              (i_dot = n.array[i]),
                (j_dot = n.array[j]),
                i_dot.x - j_dot.x < n.distance &&
                  i_dot.y - j_dot.y < n.distance &&
                  i_dot.x - j_dot.x > -n.distance &&
                  i_dot.y - j_dot.y > -n.distance &&
                  i_dot.x - r.x < n.d_radius &&
                  i_dot.y - r.y < n.d_radius &&
                  i_dot.x - r.x > -n.d_radius &&
                  i_dot.y - r.y > -n.d_radius &&
                  (o.beginPath(),
                  (o.strokeStyle =
                    ((t = i_dot),
                    (a = j_dot),
                    (h = void 0),
                    (s = void 0),
                    (y = void 0),
                    (u = void 0),
                    (c = void 0),
                    (h = t.color),
                    (s = a.color),
                    (y = e(h.r, t.radius, s.r, a.radius)),
                    (u = e(h.g, t.radius, s.g, a.radius)),
                    (c = e(h.b, t.radius, s.b, a.radius)),
                    d(Math.floor(y), Math.floor(u), Math.floor(c)))),
                  o.moveTo(i_dot.x, i_dot.y),
                  o.lineTo(j_dot.x, j_dot.y),
                  o.stroke(),
                  o.closePath());
          var t, a, h, s, y, u, c;
        })(),
        (function () {
          for (i = 0; i < n.nb; i++) n.array[i].draw();
        })(),
        requestAnimationFrame(a);
    });
});

$(document).ready(function () {
  setTimeout(function () {
    $('.emailMsg-container').fadeOut('fast');
  }, 5000);
});
