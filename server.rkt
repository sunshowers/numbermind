#lang racket/base

(require (planet dherman/json:4:0))
(require "numbermind.rkt"
         "utils.rkt")
(require srfi/13
         web-server/servlet
         web-server/servlet-env)

(define num-digits (make-parameter 0))

(define (send-next-guess request guess)
  (define handler (λ (req) (handle-guess-response guess req)))
  (define (response-generator embed/url)
    (response/json
     `#hash((nextGuess . ,guess)
            (addGuessURL . ,(embed/url handler)))))
  (send/suspend/dispatch response-generator))

(define (handle-guess-response guess request)
  (define data (json-request->jsexpr request))
  (define correct-digits (hash-ref data 'currentCorrectDigits))
  (unless (and
           (exact-nonnegative-integer? correct-digits)
           (>= correct-digits 0)
           (<= correct-digits (num-digits)))
    (raise (exn:fail:contract "Input not in the correct range" (current-continuation-marks))))
  (add-guess guess correct-digits)
  (send-next-guess request (get-new-guess)))

(define (start request)
  (define data (json-request->jsexpr request))
  (define input-num-digits (hash-ref data 'numDigits))
  (unless (and
           (exact-nonnegative-integer? input-num-digits)
           (>= input-num-digits 2)
           (<= input-num-digits 5))
    (raise (exn:fail:contract "Input should be a number" (current-continuation-marks))))
  (parameterize ([num-digits input-num-digits])
    (with-new-numbermind
     input-num-digits
     (send-next-guess request
                      (string-pad (number->string (random (expt 10 input-num-digits))) input-num-digits #\0)))))

(serve/servlet start
               #:launch-browser? #f
               #:servlet-path "/numbermind"
               #:extra-files-paths (list "html")
               #:port 8080)
