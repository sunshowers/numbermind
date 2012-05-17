`numbermind`: a web app written with z3.rkt
-------------------------------------------

You memorize a number. We guess it. You tell us how many digits we got right.
We get to the final answer.

How does it work?
=================

We present your inputs as constraints to
[z3.rkt](https://github.com/sid0/z3.rkt). That's about it. The solver's just
30 lines of straightforward Racket code and the web server's another 50.
(Continuation-based web programming is an absolute joy.)

What practical problems does it solve?
======================================

None that we know of. It was written over a couple of days as a fun exercise.

Where can I see it in action?
=============================

[Here](http://numbermind.less-broken.com/), hosted on
[Heroku](http://www.heroku.com/). If you know the right incantations, you can
host it yourself too.

Wait, I thought Heroku was only for latte-sipping hipsters using Ruby?
======================================================================

Heroku's Cedar stack supports absolutely anything that'll run on Linux x64.
All you need to do is:

1. On a Linux x64 install, `raco exe` the server.rkt file and `raco
distribute` it to a subdirectory. I use `deploy/racket`.
2. `git init` in the `deploy` subdirectory.
3. Create a Heroku app with the Cedar stack and the [null buildpack](https://github.com/ryandotsmith/null-buildpack):

    $ heroku create -s cedar --buildpack http://github.com/ryandotsmith/null-buildpack.git

4. Add a file called `Procfile` to the directory with the following contents:

    web: racket/bin/server

5. Check everything into your newly created Git repository.
6. `git push heroku master`.

If the web process isn't running, type in `heroku ps:scale web=1`. Note that
since this is a stateful server (Z3's internal state can't really be
serialized), anything more than `web=1` probably won't work.

What license is it under?
=========================

The core code is under the Simplified BSD license, and we use a couple of
frontend JavaScript libraries under MIT.
