#lang racket

(require (planet dherman/json:4:0))
(require "utils.rkt")
(require web-server/servlet
         web-server/servlet-env)

(define (handle-guess num-digits guesses request)
  (local [(define (response-generator embed/url)
            (response/json
             `#hash((nextGuess . ,(random (expt 10 num-digits)))
                    (addGuessURL . ,(embed/url (λ (req) (handle-guess num-digits guesses req)))))))]
    (send/suspend/dispatch response-generator)))

(define (start request)
  (define json-data (bytes->string/utf-8 (request-post-data/raw request)))
  (define data (read-json (open-input-string json-data)))
  (define num-digits (hash-ref data 'numDigits))
  (unless (and
           (exact-nonnegative-integer? num-digits)
           (>= num-digits 1)
           (<= num-digits 10))
    (raise (exn:fail:contract "Input should be a number" (current-continuation-marks))))
  (handle-guess num-digits '() request))

(serve/servlet start
               #:launch-browser? #f
               #:servlet-path "/numbermind"
               #:extra-files-paths (list "html")
               #:port 8080)