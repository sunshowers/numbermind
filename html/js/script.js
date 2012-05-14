function moveTo(step) {
  viewModel.resetGuesses();
  if (step == 2) {
    viewModel.ajaxActive(true);
    $.post("/numbermind", ko.toJSON(viewModel), function (data) {
      console.log("Incoming data: " + JSON.stringify(data));
      viewModel._setupNextGuess(data);
      viewModel.ajaxActive(false);
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
    if (min >= 0 && max >= 0)
      element.setAttribute("pattern", "[" + min + "-" + max + "]");
  }
};

function makeIntComputed(parent) {
  var result = ko.computed(function () {
    var val = parent();
    var num = (val === "" || (isNaN(val))) ? 0 : parseInt(val);
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
    if (this.currentCorrectDigits() === this.numDigits()) {
      this.hasWon(true);
      return;
    }

    this.currentGuess("....");
    this.ajaxActive(true);
    var self = this;
    $.post(this.addGuessURL(), ko.toJSON(this), function (data) {
      self.ajaxActive(false);
      console.log("Incoming data: " + JSON.stringify(data));
      self._setupNextGuess(data);
    });
  };

  this.resetGuesses = function() {
    this.addGuessURL("");
    this.currentGuess("....");
    this.currentCorrectDigitsText("0");
    this.guesses([]);
    this.hasWon(false);
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

  this.hasWon = ko.observable(false);

  this.divShown = ko.computed(function() {
    if (this.hasWon())
      return "success";
    else if (this.currentGuess() === false)
      return "fail-guess";
    else
      return "current-guess";
  }, this);

  this.ajaxActive = ko.observable(false);

  this.guesses = ko.observableArray([]);

  var lastColor = "rgb(0, 120, 80)";
  this.computeColor = function(correctDigitsText) {
    var numDigits = this.numDigits();
    var newColor;
    if (correctDigitsText === "") {
      newColor = lastColor;
    }
    else {
      var isInvalid = isNaN(correctDigitsText);
      if (!isInvalid) {
        var correctDigits = parseInt(correctDigitsText);
        if (correctDigits > numDigits)
          isInvalid = true;
      }
      if (isInvalid) {
        // Reddish invalid color
        newColor = "rgb(120, 40, 40)";
      }
      else {
        var wrongDigits = numDigits - correctDigits;
        var baseGreen = Color("rgb(0, 120, 80)");
        newColor = baseGreen.desaturate((wrongDigits / numDigits))
                            .lighten(1 * (wrongDigits / numDigits))
                            .hslString();
      }
    }
    return lastColor = newColor;
  }
}

var viewModel = new ViewModel();
