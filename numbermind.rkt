#lang racket/base

(require "z3/main.rkt")
(require racket/function)

(define numbermind-vars (make-parameter #f))

(define (make-variables num-digits)
  (define vars (smt:make-fun/list num-digits () Int))
  ;; Every variable is between 0 and 9
  (for ([var vars]) (smt:assert (and/s (>=/s var 0) (<=/s var 9))))
  vars)

(define-syntax-rule (with-new-numbermind num-digits body ...)
  (smt:with-context
   (smt:new-context-info)
   (parameterize ([numbermind-vars (make-variables num-digits)])
     body ...)))

(define (add-guess guess correct-digits)
  (define correct-lhs
    (apply +/s
           (for/list ([x guess]
                      [var (numbermind-vars)])
             (ite/s (=/s var (- (char->integer x) 48)) 1 0))))
  (smt:assert (=/s correct-lhs correct-digits)))

(define (get-new-guess)
  (define sat (smt:check-sat))
  (if (eq? sat 'sat)
      ; Get a guess from the SMT solver
      (list->string (map (compose integer->char (curry + 48)) (map smt:eval (numbermind-vars))))
      #f))

(provide with-new-numbermind
         add-guess
         get-new-guess)
