function moveTo(step) {
  viewModel.resetGuesses();
  if (step == 2) {
    $.post("/numbermind", ko.toJSON(viewModel), function (data) {
      console.log("Incoming data: " + JSON.stringify(data));
      viewModel._setupNextGuess(data);
    });
    $("body").removeClass("step1").addClass("step2");
  }
  else if (step == 1) {
    $("body").removeClass("step2").addClass("step1");
  }
}
ko.bindingHandlers.range = {
  update: function(element, valueAccessor) {
    var value = valueAccessor();
    var min = ko.utils.unwrapObservable(value[0]);
    var max = ko.utils.unwrapObservable(value[1]);
    element.setAttribute("pattern", "[" + min + "-" + max + "]");
  }
};

ko.extenders.integer = function (target) {
  var result = ko.dependentObservable({
    read: target,
    write: function(val) {
      var current = target();
      var num = (val === "" || isNaN(val)) ? 0 : parseInt(val);
      if (num !== current) {
        target(num);
      }
      else {
        if (val !== current)
          target.notifySubscribers(num);
      }
    }
  });
  return result;
};
var viewModel = {
  numDigits: ko.observable(4).extend({integer: true}),
  _setupNextGuess: function (data) {
    this.addGuessURL(data.addGuessURL);
    this.currentGuess(data.nextGuess);
  },
  moveToStep2: function () {
    moveTo(2);
  },
  moveToStep1: function () {
    moveTo(1);
  },
  handleGuessResponse: function () {
    this.guesses.unshift({guess: this.currentGuess(),
                          correctDigits: this.currentCorrectDigits()});
    var self = this;
    $.post(this.addGuessURL(), ko.toJSON(this), function (data) {
      console.log("Incoming data: " + JSON.stringify(data));
      self._setupNextGuess(data);
    });
  },
  resetGuesses: function() {
    this.addGuessURL("");
    this.currentGuess(0);
    this.currentCorrectDigits(0);
    this.guesses([]);
  },
  addGuessURL: ko.observable(""),
  currentGuess: ko.observable("0"),
  currentCorrectDigits: ko.observable(0).extend({integer: true}),
  guesses: ko.observableArray([])
};
