var data = {lines:[
{"lineNum":"    1","line":"/**********************************************************************"},
{"lineNum":"    2","line":" * Copyright (c) 2013, 2014 Pieter Wuille                             *"},
{"lineNum":"    3","line":" * Distributed under the MIT software license, see the accompanying   *"},
{"lineNum":"    4","line":" * file COPYING or http://www.opensource.org/licenses/mit-license.php.*"},
{"lineNum":"    5","line":" **********************************************************************/"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"#ifndef _SECP256K1_FIELD_IMPL_H_"},
{"lineNum":"    8","line":"#define _SECP256K1_FIELD_IMPL_H_"},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"#if defined HAVE_CONFIG_H"},
{"lineNum":"   11","line":"#include \"libsecp256k1-config.h\""},
{"lineNum":"   12","line":"#endif"},
{"lineNum":"   13","line":""},
{"lineNum":"   14","line":"#include \"util.h\""},
{"lineNum":"   15","line":""},
{"lineNum":"   16","line":"#if defined(USE_FIELD_10X26)"},
{"lineNum":"   17","line":"#include \"field_10x26_impl.h\""},
{"lineNum":"   18","line":"#elif defined(USE_FIELD_5X52)"},
{"lineNum":"   19","line":"#include \"field_5x52_impl.h\""},
{"lineNum":"   20","line":"#else"},
{"lineNum":"   21","line":"#error \"Please select field implementation\""},
{"lineNum":"   22","line":"#endif"},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"SECP256K1_INLINE static int secp256k1_fe_equal(const secp256k1_fe *a, const secp256k1_fe *b) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   25","line":"    secp256k1_fe na;"},
{"lineNum":"   26","line":"    secp256k1_fe_negate(&na, a, 1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   27","line":"    secp256k1_fe_add(&na, b);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   28","line":"    return secp256k1_fe_normalizes_to_zero(&na);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   29","line":"}"},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"SECP256K1_INLINE static int secp256k1_fe_equal_var(const secp256k1_fe *a, const secp256k1_fe *b) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   32","line":"    secp256k1_fe na;"},
{"lineNum":"   33","line":"    secp256k1_fe_negate(&na, a, 1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   34","line":"    secp256k1_fe_add(&na, b);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   35","line":"    return secp256k1_fe_normalizes_to_zero_var(&na);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   36","line":"}"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"static int secp256k1_fe_sqrt(secp256k1_fe *r, const secp256k1_fe *a) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   39","line":"    /** Given that p is congruent to 3 mod 4, we can compute the square root of"},
{"lineNum":"   40","line":"     *  a mod p as the (p+1)/4\'th power of a."},
{"lineNum":"   41","line":"     *"},
{"lineNum":"   42","line":"     *  As (p+1)/4 is an even number, it will have the same result for a and for"},
{"lineNum":"   43","line":"     *  (-a). Only one of these two numbers actually has a square root however,"},
{"lineNum":"   44","line":"     *  so we test at the end by squaring and comparing to the input."},
{"lineNum":"   45","line":"     *  Also because (p+1)/4 is an even number, the computed square root is"},
{"lineNum":"   46","line":"     *  itself always a square (a ** ((p+1)/4) is the square of a ** ((p+1)/8))."},
{"lineNum":"   47","line":"     */"},
{"lineNum":"   48","line":"    secp256k1_fe x2, x3, x6, x9, x11, x22, x44, x88, x176, x220, x223, t1;"},
{"lineNum":"   49","line":"    int j;"},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"    /** The binary representation of (p + 1)/4 has 3 blocks of 1s, with lengths in"},
{"lineNum":"   52","line":"     *  { 2, 22, 223 }. Use an addition chain to calculate 2^n - 1 for each block:"},
{"lineNum":"   53","line":"     *  1, [2], 3, 6, 9, 11, [22], 44, 88, 176, 220, [223]"},
{"lineNum":"   54","line":"     */"},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"    secp256k1_fe_sqr(&x2, a);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   57","line":"    secp256k1_fe_mul(&x2, &x2, a);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    secp256k1_fe_sqr(&x3, &x2);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   60","line":"    secp256k1_fe_mul(&x3, &x3, a);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"    x6 = x3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   63","line":"    for (j=0; j<3; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   64","line":"        secp256k1_fe_sqr(&x6, &x6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   65","line":"    }"},
{"lineNum":"   66","line":"    secp256k1_fe_mul(&x6, &x6, &x3);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"    x9 = x6;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   69","line":"    for (j=0; j<3; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   70","line":"        secp256k1_fe_sqr(&x9, &x9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   71","line":"    }"},
{"lineNum":"   72","line":"    secp256k1_fe_mul(&x9, &x9, &x3);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"    x11 = x9;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   75","line":"    for (j=0; j<2; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   76","line":"        secp256k1_fe_sqr(&x11, &x11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":"    }"},
{"lineNum":"   78","line":"    secp256k1_fe_mul(&x11, &x11, &x2);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"    x22 = x11;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   81","line":"    for (j=0; j<11; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   82","line":"        secp256k1_fe_sqr(&x22, &x22);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   83","line":"    }"},
{"lineNum":"   84","line":"    secp256k1_fe_mul(&x22, &x22, &x11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"    x44 = x22;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   87","line":"    for (j=0; j<22; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   88","line":"        secp256k1_fe_sqr(&x44, &x44);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   89","line":"    }"},
{"lineNum":"   90","line":"    secp256k1_fe_mul(&x44, &x44, &x22);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"    x88 = x44;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   93","line":"    for (j=0; j<44; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   94","line":"        secp256k1_fe_sqr(&x88, &x88);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   95","line":"    }"},
{"lineNum":"   96","line":"    secp256k1_fe_mul(&x88, &x88, &x44);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   97","line":""},
{"lineNum":"   98","line":"    x176 = x88;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   99","line":"    for (j=0; j<88; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  100","line":"        secp256k1_fe_sqr(&x176, &x176);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  101","line":"    }"},
{"lineNum":"  102","line":"    secp256k1_fe_mul(&x176, &x176, &x88);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"    x220 = x176;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  105","line":"    for (j=0; j<44; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  106","line":"        secp256k1_fe_sqr(&x220, &x220);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  107","line":"    }"},
{"lineNum":"  108","line":"    secp256k1_fe_mul(&x220, &x220, &x44);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  109","line":""},
{"lineNum":"  110","line":"    x223 = x220;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  111","line":"    for (j=0; j<3; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  112","line":"        secp256k1_fe_sqr(&x223, &x223);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  113","line":"    }"},
{"lineNum":"  114","line":"    secp256k1_fe_mul(&x223, &x223, &x3);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  115","line":""},
{"lineNum":"  116","line":"    /* The final result is then assembled using a sliding window over the blocks. */"},
{"lineNum":"  117","line":""},
{"lineNum":"  118","line":"    t1 = x223;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  119","line":"    for (j=0; j<23; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  120","line":"        secp256k1_fe_sqr(&t1, &t1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  121","line":"    }"},
{"lineNum":"  122","line":"    secp256k1_fe_mul(&t1, &t1, &x22);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  123","line":"    for (j=0; j<6; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  124","line":"        secp256k1_fe_sqr(&t1, &t1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  125","line":"    }"},
{"lineNum":"  126","line":"    secp256k1_fe_mul(&t1, &t1, &x2);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  127","line":"    secp256k1_fe_sqr(&t1, &t1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  128","line":"    secp256k1_fe_sqr(r, &t1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  129","line":""},
{"lineNum":"  130","line":"    /* Check that a square root was actually calculated */"},
{"lineNum":"  131","line":""},
{"lineNum":"  132","line":"    secp256k1_fe_sqr(&t1, r);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  133","line":"    return secp256k1_fe_equal(&t1, a);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  134","line":"}"},
{"lineNum":"  135","line":""},
{"lineNum":"  136","line":"static void secp256k1_fe_inv(secp256k1_fe *r, const secp256k1_fe *a) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  137","line":"    secp256k1_fe x2, x3, x6, x9, x11, x22, x44, x88, x176, x220, x223, t1;"},
{"lineNum":"  138","line":"    int j;"},
{"lineNum":"  139","line":""},
{"lineNum":"  140","line":"    /** The binary representation of (p - 2) has 5 blocks of 1s, with lengths in"},
{"lineNum":"  141","line":"     *  { 1, 2, 22, 223 }. Use an addition chain to calculate 2^n - 1 for each block:"},
{"lineNum":"  142","line":"     *  [1], [2], 3, 6, 9, 11, [22], 44, 88, 176, 220, [223]"},
{"lineNum":"  143","line":"     */"},
{"lineNum":"  144","line":""},
{"lineNum":"  145","line":"    secp256k1_fe_sqr(&x2, a);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  146","line":"    secp256k1_fe_mul(&x2, &x2, a);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  147","line":""},
{"lineNum":"  148","line":"    secp256k1_fe_sqr(&x3, &x2);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  149","line":"    secp256k1_fe_mul(&x3, &x3, a);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  150","line":""},
{"lineNum":"  151","line":"    x6 = x3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  152","line":"    for (j=0; j<3; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  153","line":"        secp256k1_fe_sqr(&x6, &x6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  154","line":"    }"},
{"lineNum":"  155","line":"    secp256k1_fe_mul(&x6, &x6, &x3);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  156","line":""},
{"lineNum":"  157","line":"    x9 = x6;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  158","line":"    for (j=0; j<3; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  159","line":"        secp256k1_fe_sqr(&x9, &x9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  160","line":"    }"},
{"lineNum":"  161","line":"    secp256k1_fe_mul(&x9, &x9, &x3);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  162","line":""},
{"lineNum":"  163","line":"    x11 = x9;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  164","line":"    for (j=0; j<2; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  165","line":"        secp256k1_fe_sqr(&x11, &x11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  166","line":"    }"},
{"lineNum":"  167","line":"    secp256k1_fe_mul(&x11, &x11, &x2);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  168","line":""},
{"lineNum":"  169","line":"    x22 = x11;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  170","line":"    for (j=0; j<11; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  171","line":"        secp256k1_fe_sqr(&x22, &x22);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  172","line":"    }"},
{"lineNum":"  173","line":"    secp256k1_fe_mul(&x22, &x22, &x11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  174","line":""},
{"lineNum":"  175","line":"    x44 = x22;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  176","line":"    for (j=0; j<22; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  177","line":"        secp256k1_fe_sqr(&x44, &x44);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  178","line":"    }"},
{"lineNum":"  179","line":"    secp256k1_fe_mul(&x44, &x44, &x22);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  180","line":""},
{"lineNum":"  181","line":"    x88 = x44;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  182","line":"    for (j=0; j<44; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  183","line":"        secp256k1_fe_sqr(&x88, &x88);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  184","line":"    }"},
{"lineNum":"  185","line":"    secp256k1_fe_mul(&x88, &x88, &x44);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  186","line":""},
{"lineNum":"  187","line":"    x176 = x88;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  188","line":"    for (j=0; j<88; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  189","line":"        secp256k1_fe_sqr(&x176, &x176);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  190","line":"    }"},
{"lineNum":"  191","line":"    secp256k1_fe_mul(&x176, &x176, &x88);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  192","line":""},
{"lineNum":"  193","line":"    x220 = x176;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  194","line":"    for (j=0; j<44; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  195","line":"        secp256k1_fe_sqr(&x220, &x220);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  196","line":"    }"},
{"lineNum":"  197","line":"    secp256k1_fe_mul(&x220, &x220, &x44);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  198","line":""},
{"lineNum":"  199","line":"    x223 = x220;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  200","line":"    for (j=0; j<3; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  201","line":"        secp256k1_fe_sqr(&x223, &x223);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  202","line":"    }"},
{"lineNum":"  203","line":"    secp256k1_fe_mul(&x223, &x223, &x3);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  204","line":""},
{"lineNum":"  205","line":"    /* The final result is then assembled using a sliding window over the blocks. */"},
{"lineNum":"  206","line":""},
{"lineNum":"  207","line":"    t1 = x223;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  208","line":"    for (j=0; j<23; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  209","line":"        secp256k1_fe_sqr(&t1, &t1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  210","line":"    }"},
{"lineNum":"  211","line":"    secp256k1_fe_mul(&t1, &t1, &x22);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  212","line":"    for (j=0; j<5; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  213","line":"        secp256k1_fe_sqr(&t1, &t1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  214","line":"    }"},
{"lineNum":"  215","line":"    secp256k1_fe_mul(&t1, &t1, a);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  216","line":"    for (j=0; j<3; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  217","line":"        secp256k1_fe_sqr(&t1, &t1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  218","line":"    }"},
{"lineNum":"  219","line":"    secp256k1_fe_mul(&t1, &t1, &x2);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  220","line":"    for (j=0; j<2; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  221","line":"        secp256k1_fe_sqr(&t1, &t1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  222","line":"    }"},
{"lineNum":"  223","line":"    secp256k1_fe_mul(r, a, &t1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  224","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  225","line":""},
{"lineNum":"  226","line":"static void secp256k1_fe_inv_var(secp256k1_fe *r, const secp256k1_fe *a) {"},
{"lineNum":"  227","line":"#if defined(USE_FIELD_INV_BUILTIN)"},
{"lineNum":"  228","line":"    secp256k1_fe_inv(r, a);"},
{"lineNum":"  229","line":"#elif defined(USE_FIELD_INV_NUM)"},
{"lineNum":"  230","line":"    secp256k1_num n, m;"},
{"lineNum":"  231","line":"    static const secp256k1_fe negone = SECP256K1_FE_CONST("},
{"lineNum":"  232","line":"        0xFFFFFFFFUL, 0xFFFFFFFFUL, 0xFFFFFFFFUL, 0xFFFFFFFFUL,"},
{"lineNum":"  233","line":"        0xFFFFFFFFUL, 0xFFFFFFFFUL, 0xFFFFFFFEUL, 0xFFFFFC2EUL"},
{"lineNum":"  234","line":"    );"},
{"lineNum":"  235","line":"    /* secp256k1 field prime, value p defined in \"Standards for Efficient Cryptography\" (SEC2) 2.7.1. */"},
{"lineNum":"  236","line":"    static const unsigned char prime[32] = {"},
{"lineNum":"  237","line":"        0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,"},
{"lineNum":"  238","line":"        0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,"},
{"lineNum":"  239","line":"        0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,"},
{"lineNum":"  240","line":"        0xFF,0xFF,0xFF,0xFE,0xFF,0xFF,0xFC,0x2F"},
{"lineNum":"  241","line":"    };"},
{"lineNum":"  242","line":"    unsigned char b[32];"},
{"lineNum":"  243","line":"    int res;"},
{"lineNum":"  244","line":"    secp256k1_fe c = *a;"},
{"lineNum":"  245","line":"    secp256k1_fe_normalize_var(&c);"},
{"lineNum":"  246","line":"    secp256k1_fe_get_b32(b, &c);"},
{"lineNum":"  247","line":"    secp256k1_num_set_bin(&n, b, 32);"},
{"lineNum":"  248","line":"    secp256k1_num_set_bin(&m, prime, 32);"},
{"lineNum":"  249","line":"    secp256k1_num_mod_inverse(&n, &n, &m);"},
{"lineNum":"  250","line":"    secp256k1_num_get_bin(b, 32, &n);"},
{"lineNum":"  251","line":"    res = secp256k1_fe_set_b32(r, b);"},
{"lineNum":"  252","line":"    (void)res;"},
{"lineNum":"  253","line":"    VERIFY_CHECK(res);"},
{"lineNum":"  254","line":"    /* Verify the result is the (unique) valid inverse using non-GMP code. */"},
{"lineNum":"  255","line":"    secp256k1_fe_mul(&c, &c, r);"},
{"lineNum":"  256","line":"    secp256k1_fe_add(&c, &negone);"},
{"lineNum":"  257","line":"    CHECK(secp256k1_fe_normalizes_to_zero_var(&c));"},
{"lineNum":"  258","line":"#else"},
{"lineNum":"  259","line":"#error \"Please select field inverse implementation\""},
{"lineNum":"  260","line":"#endif"},
{"lineNum":"  261","line":"}"},
{"lineNum":"  262","line":""},
{"lineNum":"  263","line":"static void secp256k1_fe_inv_all_var(secp256k1_fe *r, const secp256k1_fe *a, size_t len) {"},
{"lineNum":"  264","line":"    secp256k1_fe u;"},
{"lineNum":"  265","line":"    size_t i;"},
{"lineNum":"  266","line":"    if (len < 1) {"},
{"lineNum":"  267","line":"        return;"},
{"lineNum":"  268","line":"    }"},
{"lineNum":"  269","line":""},
{"lineNum":"  270","line":"    VERIFY_CHECK((r + len <= a) || (a + len <= r));"},
{"lineNum":"  271","line":""},
{"lineNum":"  272","line":"    r[0] = a[0];"},
{"lineNum":"  273","line":""},
{"lineNum":"  274","line":"    i = 0;"},
{"lineNum":"  275","line":"    while (++i < len) {"},
{"lineNum":"  276","line":"        secp256k1_fe_mul(&r[i], &r[i - 1], &a[i]);"},
{"lineNum":"  277","line":"    }"},
{"lineNum":"  278","line":""},
{"lineNum":"  279","line":"    secp256k1_fe_inv_var(&u, &r[--i]);"},
{"lineNum":"  280","line":""},
{"lineNum":"  281","line":"    while (i > 0) {"},
{"lineNum":"  282","line":"        size_t j = i--;"},
{"lineNum":"  283","line":"        secp256k1_fe_mul(&r[j], &r[i], &u);"},
{"lineNum":"  284","line":"        secp256k1_fe_mul(&u, &u, &a[j]);"},
{"lineNum":"  285","line":"    }"},
{"lineNum":"  286","line":""},
{"lineNum":"  287","line":"    r[0] = u;"},
{"lineNum":"  288","line":"}"},
{"lineNum":"  289","line":""},
{"lineNum":"  290","line":"static int secp256k1_fe_is_quad_var(const secp256k1_fe *a) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  291","line":"#ifndef USE_NUM_NONE"},
{"lineNum":"  292","line":"    unsigned char b[32];"},
{"lineNum":"  293","line":"    secp256k1_num n;"},
{"lineNum":"  294","line":"    secp256k1_num m;"},
{"lineNum":"  295","line":"    /* secp256k1 field prime, value p defined in \"Standards for Efficient Cryptography\" (SEC2) 2.7.1. */"},
{"lineNum":"  296","line":"    static const unsigned char prime[32] = {"},
{"lineNum":"  297","line":"        0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,"},
{"lineNum":"  298","line":"        0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,"},
{"lineNum":"  299","line":"        0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,"},
{"lineNum":"  300","line":"        0xFF,0xFF,0xFF,0xFE,0xFF,0xFF,0xFC,0x2F"},
{"lineNum":"  301","line":"    };"},
{"lineNum":"  302","line":""},
{"lineNum":"  303","line":"    secp256k1_fe c = *a;"},
{"lineNum":"  304","line":"    secp256k1_fe_normalize_var(&c);"},
{"lineNum":"  305","line":"    secp256k1_fe_get_b32(b, &c);"},
{"lineNum":"  306","line":"    secp256k1_num_set_bin(&n, b, 32);"},
{"lineNum":"  307","line":"    secp256k1_num_set_bin(&m, prime, 32);"},
{"lineNum":"  308","line":"    return secp256k1_num_jacobi(&n, &m) >= 0;"},
{"lineNum":"  309","line":"#else"},
{"lineNum":"  310","line":"    secp256k1_fe r;"},
{"lineNum":"  311","line":"    return secp256k1_fe_sqrt(&r, a);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  312","line":"#endif"},
{"lineNum":"  313","line":"}"},
{"lineNum":"  314","line":""},
{"lineNum":"  315","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "f4grumble_debug", "date" : "2023-08-29 14:59:42", "instrumented" : 117, "covered" : 0,};
var merged_data = [];
