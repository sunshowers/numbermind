#lang racket

(require (planet dherman/json:4:0))
(require "utils.rkt")
(require web-server/servlet
         web-server/servlet-env)

(define num-digits (make-parameter 0))

(define (send-next-guess request guess)
  (define handler (λ (req) (handle-guess-response req)))
  (define (response-generator embed/url)
    (response/json
     `#hash((nextGuess . ,guess)
            (addGuessURL . ,(embed/url handler)))))
  (send/suspend/dispatch response-generator))

(define (handle-guess-response request)
  (define data (json-request->jsexpr request))
  (send-next-guess request (random (expt 10 (num-digits)))))

(define (start request)
  (define data (json-request->jsexpr request))
  (define input-num-digits (hash-ref data 'numDigits))
  (unless (and
           (exact-nonnegative-integer? input-num-digits)
           (>= input-num-digits 1)
           (<= input-num-digits 10))
    (raise (exn:fail:contract "Input should be a number" (current-continuation-marks))))
  (parameterize ([num-digits input-num-digits])
    (send-next-guess request (random (expt 10 input-num-digits)))))

(serve/servlet start
               #:launch-browser? #f
               #:servlet-path "/numbermind"
               #:extra-files-paths (list "html")
               #:port 8080)
