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

function makeIntComputed(parent) {
  var result = ko.computed(function () {
    var val = parent();
    var num = (val === "" || isNaN(val)) ? 0 : parseInt(val);
    return num;
  });
  return result;
}

function ViewModel() {
  this.numDigitsText = ko.observable("4");
  this.numDigits = makeIntComputed(this.numDigitsText);

  this._setupNextGuess = function (data) {
    this.addGuessURL(data.addGuessURL);
    this.currentGuess(data.nextGuess);
  };

  this.moveToStep1 = function () {
    moveTo(1);
  };
  this.moveToStep2 = function () {
    moveTo(2);
  };

  this.handleGuessResponse = function () {
    this.guesses.unshift({guess: this.currentGuess(),
                          correctDigits: this.currentCorrectDigits()});
    this.currentGuess("....");
    var self = this;
    $.post(this.addGuessURL(), ko.toJSON(this), function (data) {
      console.log("Incoming data: " + JSON.stringify(data));
      self._setupNextGuess(data);
    });
  };

  this.resetGuesses = function() {
    this.addGuessURL("");
    this.currentGuess("....");
    this.currentCorrectDigitsText("0");
    this.guesses([]);
  };

  this.addGuessURL = ko.observable("");
  this.currentGuess = ko.observable("....");
  this.currentCorrectDigitsText = ko.observable("0");
  this.currentCorrectDigits = makeIntComputed(this.currentCorrectDigitsText);

  this.nextGuessButtonText = ko.computed(function () {
    if (this.currentCorrectDigits() == this.numDigits())
      return "Finish";
    else
      return "Next";
  }, this);

  this.guesses = ko.observableArray([]);
}

var viewModel = new ViewModel();
