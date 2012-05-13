#lang web-server/insta

(require "utils.rkt")
(static-files-path "html")

(define (start req)
  (response/json
   '(1 2 3)))
