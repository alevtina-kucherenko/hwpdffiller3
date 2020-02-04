function Gamer(name) {
  this.name = name;
  this.score = 0;
}

Gamer.prototype.getScore = function () {
  return this.score;
};
Gamer.prototype.setScore = function (score) {
  this.score = score;
};
Gamer.prototype.resetScore = function () {
  this.score = 0;
};

export default Gamer;