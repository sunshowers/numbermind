#lang racket

(require web-server/http)
(require (planet dherman/json:4:0))

;; Converts a request with JSON POST data to a Racket expression.
(define (json-request->jsexpr request)
  (define json-data (bytes->string/utf-8 (request-post-data/raw request)))
  (read-json (open-input-string json-data)))

(define (response/json
         json
         #:code [code 200]
         #:message [message #"Okay"]
         #:seconds [seconds (current-seconds)]
         #:cookies [cooks empty]
         #:headers [hdrs empty]
         #:preamble [preamble #""])
  (response
   code message seconds #"application/json"
   (append hdrs (map cookie->header cooks))
   (λ (out)
     (write-bytes preamble out)
     (write-json json out))))

(provide response/json
         json-request->jsexpr)
