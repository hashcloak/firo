var data = {lines:[
{"lineNum":"    1","line":"/**********************************************************************"},
{"lineNum":"    2","line":" * Copyright (c) 2013, 2014, 2015 Pieter Wuille, Gregory Maxwell      *"},
{"lineNum":"    3","line":" * Distributed under the MIT software license, see the accompanying   *"},
{"lineNum":"    4","line":" * file COPYING or http://www.opensource.org/licenses/mit-license.php.*"},
{"lineNum":"    5","line":" **********************************************************************/"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"#ifndef _SECP256K1_ECMULT_GEN_IMPL_H_"},
{"lineNum":"    8","line":"#define _SECP256K1_ECMULT_GEN_IMPL_H_"},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"#include \"scalar.h\""},
{"lineNum":"   11","line":"#include \"group.h\""},
{"lineNum":"   12","line":"#include \"ecmult_gen.h\""},
{"lineNum":"   13","line":"#include \"hash_impl.h\""},
{"lineNum":"   14","line":"#ifdef USE_ECMULT_STATIC_PRECOMPUTATION"},
{"lineNum":"   15","line":"#include \"ecmult_static_context.h\""},
{"lineNum":"   16","line":"#endif"},
{"lineNum":"   17","line":"static void secp256k1_ecmult_gen_context_init(secp256k1_ecmult_gen_context *ctx) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   18","line":"    ctx->prec = NULL;","class":"lineNoCov","hits":"0",},
{"lineNum":"   19","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"static void secp256k1_ecmult_gen_context_build(secp256k1_ecmult_gen_context *ctx, const secp256k1_callback* cb) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   22","line":"#ifndef USE_ECMULT_STATIC_PRECOMPUTATION"},
{"lineNum":"   23","line":"    secp256k1_ge prec[1024];"},
{"lineNum":"   24","line":"    secp256k1_gej gj;"},
{"lineNum":"   25","line":"    secp256k1_gej nums_gej;"},
{"lineNum":"   26","line":"    int i, j;"},
{"lineNum":"   27","line":"#endif"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"    if (ctx->prec != NULL) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   30","line":"        return;","class":"lineNoCov","hits":"0",},
{"lineNum":"   31","line":"    }"},
{"lineNum":"   32","line":"#ifndef USE_ECMULT_STATIC_PRECOMPUTATION"},
{"lineNum":"   33","line":"    ctx->prec = (secp256k1_ge_storage (*)[64][16])checked_malloc(cb, sizeof(*ctx->prec));"},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"    /* get the generator */"},
{"lineNum":"   36","line":"    secp256k1_gej_set_ge(&gj, &secp256k1_ge_const_g);"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"    /* Construct a group element with no known corresponding scalar (nothing up my sleeve). */"},
{"lineNum":"   39","line":"    {"},
{"lineNum":"   40","line":"        static const unsigned char nums_b32[33] = \"The scalar for this x is unknown\";"},
{"lineNum":"   41","line":"        secp256k1_fe nums_x;"},
{"lineNum":"   42","line":"        secp256k1_ge nums_ge;"},
{"lineNum":"   43","line":"        int r;"},
{"lineNum":"   44","line":"        r = secp256k1_fe_set_b32(&nums_x, nums_b32);"},
{"lineNum":"   45","line":"        (void)r;"},
{"lineNum":"   46","line":"        VERIFY_CHECK(r);"},
{"lineNum":"   47","line":"        r = secp256k1_ge_set_xo_var(&nums_ge, &nums_x, 0);"},
{"lineNum":"   48","line":"        (void)r;"},
{"lineNum":"   49","line":"        VERIFY_CHECK(r);"},
{"lineNum":"   50","line":"        secp256k1_gej_set_ge(&nums_gej, &nums_ge);"},
{"lineNum":"   51","line":"        /* Add G to make the bits in x uniformly distributed. */"},
{"lineNum":"   52","line":"        secp256k1_gej_add_ge_var(&nums_gej, &nums_gej, &secp256k1_ge_const_g, NULL);"},
{"lineNum":"   53","line":"    }"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"    /* compute prec. */"},
{"lineNum":"   56","line":"    {"},
{"lineNum":"   57","line":"        secp256k1_gej precj[1024]; /* Jacobian versions of prec. */"},
{"lineNum":"   58","line":"        secp256k1_gej gbase;"},
{"lineNum":"   59","line":"        secp256k1_gej numsbase;"},
{"lineNum":"   60","line":"        gbase = gj; /* 16^j * G */"},
{"lineNum":"   61","line":"        numsbase = nums_gej; /* 2^j * nums. */"},
{"lineNum":"   62","line":"        for (j = 0; j < 64; j++) {"},
{"lineNum":"   63","line":"            /* Set precj[j*16 .. j*16+15] to (numsbase, numsbase + gbase, ..., numsbase + 15*gbase). */"},
{"lineNum":"   64","line":"            precj[j*16] = numsbase;"},
{"lineNum":"   65","line":"            for (i = 1; i < 16; i++) {"},
{"lineNum":"   66","line":"                secp256k1_gej_add_var(&precj[j*16 + i], &precj[j*16 + i - 1], &gbase, NULL);"},
{"lineNum":"   67","line":"            }"},
{"lineNum":"   68","line":"            /* Multiply gbase by 16. */"},
{"lineNum":"   69","line":"            for (i = 0; i < 4; i++) {"},
{"lineNum":"   70","line":"                secp256k1_gej_double_var(&gbase, &gbase, NULL);"},
{"lineNum":"   71","line":"            }"},
{"lineNum":"   72","line":"            /* Multiply numbase by 2. */"},
{"lineNum":"   73","line":"            secp256k1_gej_double_var(&numsbase, &numsbase, NULL);"},
{"lineNum":"   74","line":"            if (j == 62) {"},
{"lineNum":"   75","line":"                /* In the last iteration, numsbase is (1 - 2^j) * nums instead. */"},
{"lineNum":"   76","line":"                secp256k1_gej_neg(&numsbase, &numsbase);"},
{"lineNum":"   77","line":"                secp256k1_gej_add_var(&numsbase, &numsbase, &nums_gej, NULL);"},
{"lineNum":"   78","line":"            }"},
{"lineNum":"   79","line":"        }"},
{"lineNum":"   80","line":"        secp256k1_ge_set_all_gej_var(prec, precj, 1024, cb);"},
{"lineNum":"   81","line":"    }"},
{"lineNum":"   82","line":"    for (j = 0; j < 64; j++) {"},
{"lineNum":"   83","line":"        for (i = 0; i < 16; i++) {"},
{"lineNum":"   84","line":"            secp256k1_ge_to_storage(&(*ctx->prec)[j][i], &prec[j*16 + i]);"},
{"lineNum":"   85","line":"        }"},
{"lineNum":"   86","line":"    }"},
{"lineNum":"   87","line":"#else"},
{"lineNum":"   88","line":"    (void)cb;"},
{"lineNum":"   89","line":"    ctx->prec = (secp256k1_ge_storage (*)[64][16])secp256k1_ecmult_static_context;","class":"lineNoCov","hits":"0",},
{"lineNum":"   90","line":"#endif"},
{"lineNum":"   91","line":"    secp256k1_ecmult_gen_blind(ctx, NULL);","class":"lineNoCov","hits":"0",},
{"lineNum":"   92","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"static int secp256k1_ecmult_gen_context_is_built(const secp256k1_ecmult_gen_context* ctx) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   95","line":"    return ctx->prec != NULL;","class":"lineNoCov","hits":"0",},
{"lineNum":"   96","line":"}"},
{"lineNum":"   97","line":""},
{"lineNum":"   98","line":"static void secp256k1_ecmult_gen_context_clone(secp256k1_ecmult_gen_context *dst,"},
{"lineNum":"   99","line":"                                               const secp256k1_ecmult_gen_context *src, const secp256k1_callback* cb) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  100","line":"    if (src->prec == NULL) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  101","line":"        dst->prec = NULL;","class":"lineNoCov","hits":"0",},
{"lineNum":"  102","line":"    } else {","class":"lineNoCov","hits":"0",},
{"lineNum":"  103","line":"#ifndef USE_ECMULT_STATIC_PRECOMPUTATION"},
{"lineNum":"  104","line":"        dst->prec = (secp256k1_ge_storage (*)[64][16])checked_malloc(cb, sizeof(*dst->prec));"},
{"lineNum":"  105","line":"        memcpy(dst->prec, src->prec, sizeof(*dst->prec));"},
{"lineNum":"  106","line":"#else"},
{"lineNum":"  107","line":"        (void)cb;"},
{"lineNum":"  108","line":"        dst->prec = src->prec;","class":"lineNoCov","hits":"0",},
{"lineNum":"  109","line":"#endif"},
{"lineNum":"  110","line":"        dst->initial = src->initial;","class":"lineNoCov","hits":"0",},
{"lineNum":"  111","line":"        dst->blind = src->blind;","class":"lineNoCov","hits":"0",},
{"lineNum":"  112","line":"    }"},
{"lineNum":"  113","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  114","line":""},
{"lineNum":"  115","line":"static void secp256k1_ecmult_gen_context_clear(secp256k1_ecmult_gen_context *ctx) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  116","line":"#ifndef USE_ECMULT_STATIC_PRECOMPUTATION"},
{"lineNum":"  117","line":"    free(ctx->prec);"},
{"lineNum":"  118","line":"#endif"},
{"lineNum":"  119","line":"    secp256k1_scalar_clear(&ctx->blind);","class":"lineNoCov","hits":"0",},
{"lineNum":"  120","line":"    secp256k1_gej_clear(&ctx->initial);","class":"lineNoCov","hits":"0",},
{"lineNum":"  121","line":"    ctx->prec = NULL;","class":"lineNoCov","hits":"0",},
{"lineNum":"  122","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  123","line":""},
{"lineNum":"  124","line":"static void secp256k1_ecmult_gen(const secp256k1_ecmult_gen_context *ctx, secp256k1_gej *r, const secp256k1_scalar *gn) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  125","line":"    secp256k1_ge add;"},
{"lineNum":"  126","line":"    secp256k1_ge_storage adds;"},
{"lineNum":"  127","line":"    secp256k1_scalar gnb;"},
{"lineNum":"  128","line":"    int bits;"},
{"lineNum":"  129","line":"    int i, j;"},
{"lineNum":"  130","line":"    memset(&adds, 0, sizeof(adds));","class":"lineNoCov","hits":"0",},
{"lineNum":"  131","line":"    *r = ctx->initial;","class":"lineNoCov","hits":"0",},
{"lineNum":"  132","line":"    /* Blind scalar/point multiplication by computing (n-b)G + bG instead of nG. */"},
{"lineNum":"  133","line":"    secp256k1_scalar_add(&gnb, gn, &ctx->blind);","class":"lineNoCov","hits":"0",},
{"lineNum":"  134","line":"    add.infinity = 0;","class":"lineNoCov","hits":"0",},
{"lineNum":"  135","line":"    for (j = 0; j < 64; j++) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  136","line":"        bits = secp256k1_scalar_get_bits(&gnb, j * 4, 4);","class":"lineNoCov","hits":"0",},
{"lineNum":"  137","line":"        for (i = 0; i < 16; i++) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  138","line":"            /** This uses a conditional move to avoid any secret data in array indexes."},
{"lineNum":"  139","line":"             *   _Any_ use of secret indexes has been demonstrated to result in timing"},
{"lineNum":"  140","line":"             *   sidechannels, even when the cache-line access patterns are uniform."},
{"lineNum":"  141","line":"             *  See also:"},
{"lineNum":"  142","line":"             *   \"A word of warning\", CHES 2013 Rump Session, by Daniel J. Bernstein and Peter Schwabe"},
{"lineNum":"  143","line":"             *    (https://cryptojedi.org/peter/data/chesrump-20130822.pdf) and"},
{"lineNum":"  144","line":"             *   \"Cache Attacks and Countermeasures: the Case of AES\", RSA 2006,"},
{"lineNum":"  145","line":"             *    by Dag Arne Osvik, Adi Shamir, and Eran Tromer"},
{"lineNum":"  146","line":"             *    (http://www.tau.ac.il/~tromer/papers/cache.pdf)"},
{"lineNum":"  147","line":"             */"},
{"lineNum":"  148","line":"            secp256k1_ge_storage_cmov(&adds, &(*ctx->prec)[j][i], i == bits);","class":"lineNoCov","hits":"0",},
{"lineNum":"  149","line":"        }"},
{"lineNum":"  150","line":"        secp256k1_ge_from_storage(&add, &adds);","class":"lineNoCov","hits":"0",},
{"lineNum":"  151","line":"        secp256k1_gej_add_ge(r, r, &add);","class":"lineNoCov","hits":"0",},
{"lineNum":"  152","line":"    }"},
{"lineNum":"  153","line":"    bits = 0;","class":"lineNoCov","hits":"0",},
{"lineNum":"  154","line":"    secp256k1_ge_clear(&add);","class":"lineNoCov","hits":"0",},
{"lineNum":"  155","line":"    secp256k1_scalar_clear(&gnb);","class":"lineNoCov","hits":"0",},
{"lineNum":"  156","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  157","line":""},
{"lineNum":"  158","line":"/* Setup blinding values for secp256k1_ecmult_gen. */"},
{"lineNum":"  159","line":"static void secp256k1_ecmult_gen_blind(secp256k1_ecmult_gen_context *ctx, const unsigned char *seed32) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  160","line":"    secp256k1_scalar b;"},
{"lineNum":"  161","line":"    secp256k1_gej gb;"},
{"lineNum":"  162","line":"    secp256k1_fe s;"},
{"lineNum":"  163","line":"    unsigned char nonce32[32];"},
{"lineNum":"  164","line":"    secp256k1_rfc6979_hmac_sha256_t rng;"},
{"lineNum":"  165","line":"    int retry;"},
{"lineNum":"  166","line":"    unsigned char keydata[64] = {0};","class":"lineNoCov","hits":"0",},
{"lineNum":"  167","line":"    if (seed32 == NULL) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  168","line":"        /* When seed is NULL, reset the initial point and blinding value. */"},
{"lineNum":"  169","line":"        secp256k1_gej_set_ge(&ctx->initial, &secp256k1_ge_const_g);","class":"lineNoCov","hits":"0",},
{"lineNum":"  170","line":"        secp256k1_gej_neg(&ctx->initial, &ctx->initial);","class":"lineNoCov","hits":"0",},
{"lineNum":"  171","line":"        secp256k1_scalar_set_int(&ctx->blind, 1);","class":"lineNoCov","hits":"0",},
{"lineNum":"  172","line":"    }"},
{"lineNum":"  173","line":"    /* The prior blinding value (if not reset) is chained forward by including it in the hash. */"},
{"lineNum":"  174","line":"    secp256k1_scalar_get_b32(nonce32, &ctx->blind);","class":"lineNoCov","hits":"0",},
{"lineNum":"  175","line":"    /** Using a CSPRNG allows a failure free interface, avoids needing large amounts of random data,"},
{"lineNum":"  176","line":"     *   and guards against weak or adversarial seeds.  This is a simpler and safer interface than"},
{"lineNum":"  177","line":"     *   asking the caller for blinding values directly and expecting them to retry on failure."},
{"lineNum":"  178","line":"     */"},
{"lineNum":"  179","line":"    memcpy(keydata, nonce32, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  180","line":"    if (seed32 != NULL) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  181","line":"        memcpy(keydata + 32, seed32, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  182","line":"    }"},
{"lineNum":"  183","line":"    secp256k1_rfc6979_hmac_sha256_initialize(&rng, keydata, seed32 ? 64 : 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  184","line":"    memset(keydata, 0, sizeof(keydata));","class":"lineNoCov","hits":"0",},
{"lineNum":"  185","line":"    /* Retry for out of range results to achieve uniformity. */"},
{"lineNum":"  186","line":"    do {"},
{"lineNum":"  187","line":"        secp256k1_rfc6979_hmac_sha256_generate(&rng, nonce32, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  188","line":"        retry = !secp256k1_fe_set_b32(&s, nonce32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  189","line":"        retry |= secp256k1_fe_is_zero(&s);","class":"lineNoCov","hits":"0",},
{"lineNum":"  190","line":"    } while (retry); /* This branch true is cryptographically unreachable. Requires sha256_hmac output > Fp. */","class":"lineNoCov","hits":"0",},
{"lineNum":"  191","line":"    /* Randomize the projection to defend against multiplier sidechannels. */"},
{"lineNum":"  192","line":"    secp256k1_gej_rescale(&ctx->initial, &s);","class":"lineNoCov","hits":"0",},
{"lineNum":"  193","line":"    secp256k1_fe_clear(&s);","class":"lineNoCov","hits":"0",},
{"lineNum":"  194","line":"    do {"},
{"lineNum":"  195","line":"        secp256k1_rfc6979_hmac_sha256_generate(&rng, nonce32, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  196","line":"        secp256k1_scalar_set_b32(&b, nonce32, &retry);","class":"lineNoCov","hits":"0",},
{"lineNum":"  197","line":"        /* A blinding value of 0 works, but would undermine the projection hardening. */"},
{"lineNum":"  198","line":"        retry |= secp256k1_scalar_is_zero(&b);","class":"lineNoCov","hits":"0",},
{"lineNum":"  199","line":"    } while (retry); /* This branch true is cryptographically unreachable. Requires sha256_hmac output > order. */","class":"lineNoCov","hits":"0",},
{"lineNum":"  200","line":"    secp256k1_rfc6979_hmac_sha256_finalize(&rng);","class":"lineNoCov","hits":"0",},
{"lineNum":"  201","line":"    memset(nonce32, 0, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  202","line":"    secp256k1_ecmult_gen(ctx, &gb, &b);","class":"lineNoCov","hits":"0",},
{"lineNum":"  203","line":"    secp256k1_scalar_negate(&b, &b);","class":"lineNoCov","hits":"0",},
{"lineNum":"  204","line":"    ctx->blind = b;","class":"lineNoCov","hits":"0",},
{"lineNum":"  205","line":"    ctx->initial = gb;","class":"lineNoCov","hits":"0",},
{"lineNum":"  206","line":"    secp256k1_scalar_clear(&b);","class":"lineNoCov","hits":"0",},
{"lineNum":"  207","line":"    secp256k1_gej_clear(&gb);","class":"lineNoCov","hits":"0",},
{"lineNum":"  208","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  209","line":""},
{"lineNum":"  210","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "aead_fuzz_debug", "date" : "2023-08-09 11:47:09", "instrumented" : 70, "covered" : 0,};
var merged_data = [];
