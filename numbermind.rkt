#lang web-server/insta

(require "utils.rkt")

(define (start req)
  (response/json
   '(1 2 3)))

(static-files-path "html")
