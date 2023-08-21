var data = {lines:[
{"lineNum":"    1","line":"/**********************************************************************"},
{"lineNum":"    2","line":" * Copyright (c) 2014 Pieter Wuille                                   *"},
{"lineNum":"    3","line":" * Distributed under the MIT software license, see the accompanying   *"},
{"lineNum":"    4","line":" * file COPYING or http://www.opensource.org/licenses/mit-license.php.*"},
{"lineNum":"    5","line":" **********************************************************************/"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"#ifndef _SECP256K1_SCALAR_IMPL_H_"},
{"lineNum":"    8","line":"#define _SECP256K1_SCALAR_IMPL_H_"},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"#include \"group.h\""},
{"lineNum":"   11","line":"#include \"scalar.h\""},
{"lineNum":"   12","line":""},
{"lineNum":"   13","line":"#if defined HAVE_CONFIG_H"},
{"lineNum":"   14","line":"#include \"libsecp256k1-config.h\""},
{"lineNum":"   15","line":"#endif"},
{"lineNum":"   16","line":""},
{"lineNum":"   17","line":"#if defined(EXHAUSTIVE_TEST_ORDER)"},
{"lineNum":"   18","line":"#include \"scalar_low_impl.h\""},
{"lineNum":"   19","line":"#elif defined(USE_SCALAR_4X64)"},
{"lineNum":"   20","line":"#include \"scalar_4x64_impl.h\""},
{"lineNum":"   21","line":"#elif defined(USE_SCALAR_8X32)"},
{"lineNum":"   22","line":"#include \"scalar_8x32_impl.h\""},
{"lineNum":"   23","line":"#else"},
{"lineNum":"   24","line":"#error \"Please select scalar implementation\""},
{"lineNum":"   25","line":"#endif"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"#ifndef USE_NUM_NONE"},
{"lineNum":"   28","line":"static void secp256k1_scalar_get_num(secp256k1_num *r, const secp256k1_scalar *a) {"},
{"lineNum":"   29","line":"    unsigned char c[32];"},
{"lineNum":"   30","line":"    secp256k1_scalar_get_b32(c, a);"},
{"lineNum":"   31","line":"    secp256k1_num_set_bin(r, c, 32);"},
{"lineNum":"   32","line":"}"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"/** secp256k1 curve order, see secp256k1_ecdsa_const_order_as_fe in ecdsa_impl.h */"},
{"lineNum":"   35","line":"static void secp256k1_scalar_order_get_num(secp256k1_num *r) {"},
{"lineNum":"   36","line":"#if defined(EXHAUSTIVE_TEST_ORDER)"},
{"lineNum":"   37","line":"    static const unsigned char order[32] = {"},
{"lineNum":"   38","line":"        0,0,0,0,0,0,0,0,"},
{"lineNum":"   39","line":"        0,0,0,0,0,0,0,0,"},
{"lineNum":"   40","line":"        0,0,0,0,0,0,0,0,"},
{"lineNum":"   41","line":"        0,0,0,0,0,0,0,EXHAUSTIVE_TEST_ORDER"},
{"lineNum":"   42","line":"    };"},
{"lineNum":"   43","line":"#else"},
{"lineNum":"   44","line":"    static const unsigned char order[32] = {"},
{"lineNum":"   45","line":"        0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,"},
{"lineNum":"   46","line":"        0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFE,"},
{"lineNum":"   47","line":"        0xBA,0xAE,0xDC,0xE6,0xAF,0x48,0xA0,0x3B,"},
{"lineNum":"   48","line":"        0xBF,0xD2,0x5E,0x8C,0xD0,0x36,0x41,0x41"},
{"lineNum":"   49","line":"    };"},
{"lineNum":"   50","line":"#endif"},
{"lineNum":"   51","line":"    secp256k1_num_set_bin(r, order, 32);"},
{"lineNum":"   52","line":"}"},
{"lineNum":"   53","line":"#endif"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"static void secp256k1_scalar_inverse(secp256k1_scalar *r, const secp256k1_scalar *x) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   56","line":"#if defined(EXHAUSTIVE_TEST_ORDER)"},
{"lineNum":"   57","line":"    int i;"},
{"lineNum":"   58","line":"    *r = 0;"},
{"lineNum":"   59","line":"    for (i = 0; i < EXHAUSTIVE_TEST_ORDER; i++)"},
{"lineNum":"   60","line":"        if ((i * *x) % EXHAUSTIVE_TEST_ORDER == 1)"},
{"lineNum":"   61","line":"            *r = i;"},
{"lineNum":"   62","line":"    /* If this VERIFY_CHECK triggers we were given a noninvertible scalar (and thus"},
{"lineNum":"   63","line":"     * have a composite group order; fix it in exhaustive_tests.c). */"},
{"lineNum":"   64","line":"    VERIFY_CHECK(*r != 0);"},
{"lineNum":"   65","line":"}"},
{"lineNum":"   66","line":"#else"},
{"lineNum":"   67","line":"    secp256k1_scalar *t;"},
{"lineNum":"   68","line":"    int i;"},
{"lineNum":"   69","line":"    /* First compute x ^ (2^N - 1) for some values of N. */"},
{"lineNum":"   70","line":"    secp256k1_scalar x2, x3, x4, x6, x7, x8, x15, x30, x60, x120, x127;"},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"    secp256k1_scalar_sqr(&x2,  x);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   73","line":"    secp256k1_scalar_mul(&x2, &x2,  x);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"    secp256k1_scalar_sqr(&x3, &x2);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   76","line":"    secp256k1_scalar_mul(&x3, &x3,  x);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"    secp256k1_scalar_sqr(&x4, &x3);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   79","line":"    secp256k1_scalar_mul(&x4, &x4,  x);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   80","line":""},
{"lineNum":"   81","line":"    secp256k1_scalar_sqr(&x6, &x4);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   82","line":"    secp256k1_scalar_sqr(&x6, &x6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   83","line":"    secp256k1_scalar_mul(&x6, &x6, &x2);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"    secp256k1_scalar_sqr(&x7, &x6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   86","line":"    secp256k1_scalar_mul(&x7, &x7,  x);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"    secp256k1_scalar_sqr(&x8, &x7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   89","line":"    secp256k1_scalar_mul(&x8, &x8,  x);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"    secp256k1_scalar_sqr(&x15, &x8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   92","line":"    for (i = 0; i < 6; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   93","line":"        secp256k1_scalar_sqr(&x15, &x15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   94","line":"    }"},
{"lineNum":"   95","line":"    secp256k1_scalar_mul(&x15, &x15, &x7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"    secp256k1_scalar_sqr(&x30, &x15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   98","line":"    for (i = 0; i < 14; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   99","line":"        secp256k1_scalar_sqr(&x30, &x30);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  100","line":"    }"},
{"lineNum":"  101","line":"    secp256k1_scalar_mul(&x30, &x30, &x15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"    secp256k1_scalar_sqr(&x60, &x30);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  104","line":"    for (i = 0; i < 29; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  105","line":"        secp256k1_scalar_sqr(&x60, &x60);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  106","line":"    }"},
{"lineNum":"  107","line":"    secp256k1_scalar_mul(&x60, &x60, &x30);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":"    secp256k1_scalar_sqr(&x120, &x60);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  110","line":"    for (i = 0; i < 59; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  111","line":"        secp256k1_scalar_sqr(&x120, &x120);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  112","line":"    }"},
{"lineNum":"  113","line":"    secp256k1_scalar_mul(&x120, &x120, &x60);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  114","line":""},
{"lineNum":"  115","line":"    secp256k1_scalar_sqr(&x127, &x120);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  116","line":"    for (i = 0; i < 6; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  117","line":"        secp256k1_scalar_sqr(&x127, &x127);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  118","line":"    }"},
{"lineNum":"  119","line":"    secp256k1_scalar_mul(&x127, &x127, &x7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  120","line":""},
{"lineNum":"  121","line":"    /* Then accumulate the final result (t starts at x127). */"},
{"lineNum":"  122","line":"    t = &x127;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  123","line":"    for (i = 0; i < 2; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  124","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  125","line":"    }"},
{"lineNum":"  126","line":"    secp256k1_scalar_mul(t, t, x); /* 1 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  127","line":"    for (i = 0; i < 4; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  128","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  129","line":"    }"},
{"lineNum":"  130","line":"    secp256k1_scalar_mul(t, t, &x3); /* 111 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  131","line":"    for (i = 0; i < 2; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  132","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  133","line":"    }"},
{"lineNum":"  134","line":"    secp256k1_scalar_mul(t, t, x); /* 1 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  135","line":"    for (i = 0; i < 2; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  136","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  137","line":"    }"},
{"lineNum":"  138","line":"    secp256k1_scalar_mul(t, t, x); /* 1 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  139","line":"    for (i = 0; i < 2; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  140","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  141","line":"    }"},
{"lineNum":"  142","line":"    secp256k1_scalar_mul(t, t, x); /* 1 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  143","line":"    for (i = 0; i < 4; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  144","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  145","line":"    }"},
{"lineNum":"  146","line":"    secp256k1_scalar_mul(t, t, &x3); /* 111 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  147","line":"    for (i = 0; i < 3; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  148","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  149","line":"    }"},
{"lineNum":"  150","line":"    secp256k1_scalar_mul(t, t, &x2); /* 11 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  151","line":"    for (i = 0; i < 4; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  152","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  153","line":"    }"},
{"lineNum":"  154","line":"    secp256k1_scalar_mul(t, t, &x3); /* 111 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  155","line":"    for (i = 0; i < 5; i++) { /* 00 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  156","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  157","line":"    }"},
{"lineNum":"  158","line":"    secp256k1_scalar_mul(t, t, &x3); /* 111 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  159","line":"    for (i = 0; i < 4; i++) { /* 00 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  160","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  161","line":"    }"},
{"lineNum":"  162","line":"    secp256k1_scalar_mul(t, t, &x2); /* 11 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  163","line":"    for (i = 0; i < 2; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  164","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  165","line":"    }"},
{"lineNum":"  166","line":"    secp256k1_scalar_mul(t, t, x); /* 1 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  167","line":"    for (i = 0; i < 2; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  168","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  169","line":"    }"},
{"lineNum":"  170","line":"    secp256k1_scalar_mul(t, t, x); /* 1 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  171","line":"    for (i = 0; i < 5; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  172","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  173","line":"    }"},
{"lineNum":"  174","line":"    secp256k1_scalar_mul(t, t, &x4); /* 1111 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  175","line":"    for (i = 0; i < 2; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  176","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  177","line":"    }"},
{"lineNum":"  178","line":"    secp256k1_scalar_mul(t, t, x); /* 1 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  179","line":"    for (i = 0; i < 3; i++) { /* 00 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  180","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  181","line":"    }"},
{"lineNum":"  182","line":"    secp256k1_scalar_mul(t, t, x); /* 1 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  183","line":"    for (i = 0; i < 4; i++) { /* 000 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  184","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  185","line":"    }"},
{"lineNum":"  186","line":"    secp256k1_scalar_mul(t, t, x); /* 1 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  187","line":"    for (i = 0; i < 2; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  188","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  189","line":"    }"},
{"lineNum":"  190","line":"    secp256k1_scalar_mul(t, t, x); /* 1 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  191","line":"    for (i = 0; i < 10; i++) { /* 0000000 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  192","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  193","line":"    }"},
{"lineNum":"  194","line":"    secp256k1_scalar_mul(t, t, &x3); /* 111 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  195","line":"    for (i = 0; i < 4; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  196","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  197","line":"    }"},
{"lineNum":"  198","line":"    secp256k1_scalar_mul(t, t, &x3); /* 111 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  199","line":"    for (i = 0; i < 9; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  200","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  201","line":"    }"},
{"lineNum":"  202","line":"    secp256k1_scalar_mul(t, t, &x8); /* 11111111 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  203","line":"    for (i = 0; i < 2; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  204","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  205","line":"    }"},
{"lineNum":"  206","line":"    secp256k1_scalar_mul(t, t, x); /* 1 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  207","line":"    for (i = 0; i < 3; i++) { /* 00 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  208","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  209","line":"    }"},
{"lineNum":"  210","line":"    secp256k1_scalar_mul(t, t, x); /* 1 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  211","line":"    for (i = 0; i < 3; i++) { /* 00 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  212","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  213","line":"    }"},
{"lineNum":"  214","line":"    secp256k1_scalar_mul(t, t, x); /* 1 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  215","line":"    for (i = 0; i < 5; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  216","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  217","line":"    }"},
{"lineNum":"  218","line":"    secp256k1_scalar_mul(t, t, &x4); /* 1111 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  219","line":"    for (i = 0; i < 2; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  220","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  221","line":"    }"},
{"lineNum":"  222","line":"    secp256k1_scalar_mul(t, t, x); /* 1 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  223","line":"    for (i = 0; i < 5; i++) { /* 000 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  224","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  225","line":"    }"},
{"lineNum":"  226","line":"    secp256k1_scalar_mul(t, t, &x2); /* 11 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  227","line":"    for (i = 0; i < 4; i++) { /* 00 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  228","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  229","line":"    }"},
{"lineNum":"  230","line":"    secp256k1_scalar_mul(t, t, &x2); /* 11 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  231","line":"    for (i = 0; i < 2; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  232","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  233","line":"    }"},
{"lineNum":"  234","line":"    secp256k1_scalar_mul(t, t, x); /* 1 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  235","line":"    for (i = 0; i < 8; i++) { /* 000000 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  236","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  237","line":"    }"},
{"lineNum":"  238","line":"    secp256k1_scalar_mul(t, t, &x2); /* 11 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  239","line":"    for (i = 0; i < 3; i++) { /* 0 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  240","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  241","line":"    }"},
{"lineNum":"  242","line":"    secp256k1_scalar_mul(t, t, &x2); /* 11 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  243","line":"    for (i = 0; i < 3; i++) { /* 00 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  244","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  245","line":"    }"},
{"lineNum":"  246","line":"    secp256k1_scalar_mul(t, t, x); /* 1 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  247","line":"    for (i = 0; i < 6; i++) { /* 00000 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  248","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  249","line":"    }"},
{"lineNum":"  250","line":"    secp256k1_scalar_mul(t, t, x); /* 1 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  251","line":"    for (i = 0; i < 8; i++) { /* 00 */","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  252","line":"        secp256k1_scalar_sqr(t, t);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  253","line":"    }"},
{"lineNum":"  254","line":"    secp256k1_scalar_mul(r, t, &x6); /* 111111 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  255","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  256","line":""},
{"lineNum":"  257","line":"SECP256K1_INLINE static int secp256k1_scalar_is_even(const secp256k1_scalar *a) {","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  258","line":"    return !(a->d[0] & 1);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  259","line":"}"},
{"lineNum":"  260","line":"#endif"},
{"lineNum":"  261","line":""},
{"lineNum":"  262","line":"static void secp256k1_scalar_inverse_var(secp256k1_scalar *r, const secp256k1_scalar *x) {"},
{"lineNum":"  263","line":"#if defined(USE_SCALAR_INV_BUILTIN)"},
{"lineNum":"  264","line":"    secp256k1_scalar_inverse(r, x);"},
{"lineNum":"  265","line":"#elif defined(USE_SCALAR_INV_NUM)"},
{"lineNum":"  266","line":"    unsigned char b[32];"},
{"lineNum":"  267","line":"    secp256k1_num n, m;"},
{"lineNum":"  268","line":"    secp256k1_scalar t = *x;"},
{"lineNum":"  269","line":"    secp256k1_scalar_get_b32(b, &t);"},
{"lineNum":"  270","line":"    secp256k1_num_set_bin(&n, b, 32);"},
{"lineNum":"  271","line":"    secp256k1_scalar_order_get_num(&m);"},
{"lineNum":"  272","line":"    secp256k1_num_mod_inverse(&n, &n, &m);"},
{"lineNum":"  273","line":"    secp256k1_num_get_bin(b, 32, &n);"},
{"lineNum":"  274","line":"    secp256k1_scalar_set_b32(r, b, NULL);"},
{"lineNum":"  275","line":"    /* Verify that the inverse was computed correctly, without GMP code. */"},
{"lineNum":"  276","line":"    secp256k1_scalar_mul(&t, &t, r);"},
{"lineNum":"  277","line":"    CHECK(secp256k1_scalar_is_one(&t));"},
{"lineNum":"  278","line":"#else"},
{"lineNum":"  279","line":"#error \"Please select scalar inverse implementation\""},
{"lineNum":"  280","line":"#endif"},
{"lineNum":"  281","line":"}"},
{"lineNum":"  282","line":""},
{"lineNum":"  283","line":"#ifdef USE_ENDOMORPHISM"},
{"lineNum":"  284","line":"#if defined(EXHAUSTIVE_TEST_ORDER)"},
{"lineNum":"  285","line":"/**"},
{"lineNum":"  286","line":" * Find k1 and k2 given k, such that k1 + k2 * lambda == k mod n; unlike in the"},
{"lineNum":"  287","line":" * full case we don\'t bother making k1 and k2 be small, we just want them to be"},
{"lineNum":"  288","line":" * nontrivial to get full test coverage for the exhaustive tests. We therefore"},
{"lineNum":"  289","line":" * (arbitrarily) set k2 = k + 5 and k1 = k - k2 * lambda."},
{"lineNum":"  290","line":" */"},
{"lineNum":"  291","line":"static void secp256k1_scalar_split_lambda(secp256k1_scalar *r1, secp256k1_scalar *r2, const secp256k1_scalar *a) {"},
{"lineNum":"  292","line":"    *r2 = (*a + 5) % EXHAUSTIVE_TEST_ORDER;"},
{"lineNum":"  293","line":"    *r1 = (*a + (EXHAUSTIVE_TEST_ORDER - *r2) * EXHAUSTIVE_TEST_LAMBDA) % EXHAUSTIVE_TEST_ORDER;"},
{"lineNum":"  294","line":"}"},
{"lineNum":"  295","line":"#else"},
{"lineNum":"  296","line":"/**"},
{"lineNum":"  297","line":" * The Secp256k1 curve has an endomorphism, where lambda * (x, y) = (beta * x, y), where"},
{"lineNum":"  298","line":" * lambda is {0x53,0x63,0xad,0x4c,0xc0,0x5c,0x30,0xe0,0xa5,0x26,0x1c,0x02,0x88,0x12,0x64,0x5a,"},
{"lineNum":"  299","line":" *            0x12,0x2e,0x22,0xea,0x20,0x81,0x66,0x78,0xdf,0x02,0x96,0x7c,0x1b,0x23,0xbd,0x72}"},
{"lineNum":"  300","line":" *"},
{"lineNum":"  301","line":" * \"Guide to Elliptic Curve Cryptography\" (Hankerson, Menezes, Vanstone) gives an algorithm"},
{"lineNum":"  302","line":" * (algorithm 3.74) to find k1 and k2 given k, such that k1 + k2 * lambda == k mod n, and k1"},
{"lineNum":"  303","line":" * and k2 have a small size."},
{"lineNum":"  304","line":" * It relies on constants a1, b1, a2, b2. These constants for the value of lambda above are:"},
{"lineNum":"  305","line":" *"},
{"lineNum":"  306","line":" * - a1 =      {0x30,0x86,0xd2,0x21,0xa7,0xd4,0x6b,0xcd,0xe8,0x6c,0x90,0xe4,0x92,0x84,0xeb,0x15}"},
{"lineNum":"  307","line":" * - b1 =     -{0xe4,0x43,0x7e,0xd6,0x01,0x0e,0x88,0x28,0x6f,0x54,0x7f,0xa9,0x0a,0xbf,0xe4,0xc3}"},
{"lineNum":"  308","line":" * - a2 = {0x01,0x14,0xca,0x50,0xf7,0xa8,0xe2,0xf3,0xf6,0x57,0xc1,0x10,0x8d,0x9d,0x44,0xcf,0xd8}"},
{"lineNum":"  309","line":" * - b2 =      {0x30,0x86,0xd2,0x21,0xa7,0xd4,0x6b,0xcd,0xe8,0x6c,0x90,0xe4,0x92,0x84,0xeb,0x15}"},
{"lineNum":"  310","line":" *"},
{"lineNum":"  311","line":" * The algorithm then computes c1 = round(b1 * k / n) and c2 = round(b2 * k / n), and gives"},
{"lineNum":"  312","line":" * k1 = k - (c1*a1 + c2*a2) and k2 = -(c1*b1 + c2*b2). Instead, we use modular arithmetic, and"},
{"lineNum":"  313","line":" * compute k1 as k - k2 * lambda, avoiding the need for constants a1 and a2."},
{"lineNum":"  314","line":" *"},
{"lineNum":"  315","line":" * g1, g2 are precomputed constants used to replace division with a rounded multiplication"},
{"lineNum":"  316","line":" * when decomposing the scalar for an endomorphism-based point multiplication."},
{"lineNum":"  317","line":" *"},
{"lineNum":"  318","line":" * The possibility of using precomputed estimates is mentioned in \"Guide to Elliptic Curve"},
{"lineNum":"  319","line":" * Cryptography\" (Hankerson, Menezes, Vanstone) in section 3.5."},
{"lineNum":"  320","line":" *"},
{"lineNum":"  321","line":" * The derivation is described in the paper \"Efficient Software Implementation of Public-Key"},
{"lineNum":"  322","line":" * Cryptography on Sensor Networks Using the MSP430X Microcontroller\" (Gouvea, Oliveira, Lopez),"},
{"lineNum":"  323","line":" * Section 4.3 (here we use a somewhat higher-precision estimate):"},
{"lineNum":"  324","line":" * d = a1*b2 - b1*a2"},
{"lineNum":"  325","line":" * g1 = round((2^272)*b2/d)"},
{"lineNum":"  326","line":" * g2 = round((2^272)*b1/d)"},
{"lineNum":"  327","line":" *"},
{"lineNum":"  328","line":" * (Note that \'d\' is also equal to the curve order here because [a1,b1] and [a2,b2] are found"},
{"lineNum":"  329","line":" * as outputs of the Extended Euclidean Algorithm on inputs \'order\' and \'lambda\')."},
{"lineNum":"  330","line":" *"},
{"lineNum":"  331","line":" * The function below splits a in r1 and r2, such that r1 + lambda * r2 == a (mod order)."},
{"lineNum":"  332","line":" */"},
{"lineNum":"  333","line":""},
{"lineNum":"  334","line":"static void secp256k1_scalar_split_lambda(secp256k1_scalar *r1, secp256k1_scalar *r2, const secp256k1_scalar *a) {"},
{"lineNum":"  335","line":"    secp256k1_scalar c1, c2;"},
{"lineNum":"  336","line":"    static const secp256k1_scalar minus_lambda = SECP256K1_SCALAR_CONST("},
{"lineNum":"  337","line":"        0xAC9C52B3UL, 0x3FA3CF1FUL, 0x5AD9E3FDUL, 0x77ED9BA4UL,"},
{"lineNum":"  338","line":"        0xA880B9FCUL, 0x8EC739C2UL, 0xE0CFC810UL, 0xB51283CFUL"},
{"lineNum":"  339","line":"    );"},
{"lineNum":"  340","line":"    static const secp256k1_scalar minus_b1 = SECP256K1_SCALAR_CONST("},
{"lineNum":"  341","line":"        0x00000000UL, 0x00000000UL, 0x00000000UL, 0x00000000UL,"},
{"lineNum":"  342","line":"        0xE4437ED6UL, 0x010E8828UL, 0x6F547FA9UL, 0x0ABFE4C3UL"},
{"lineNum":"  343","line":"    );"},
{"lineNum":"  344","line":"    static const secp256k1_scalar minus_b2 = SECP256K1_SCALAR_CONST("},
{"lineNum":"  345","line":"        0xFFFFFFFFUL, 0xFFFFFFFFUL, 0xFFFFFFFFUL, 0xFFFFFFFEUL,"},
{"lineNum":"  346","line":"        0x8A280AC5UL, 0x0774346DUL, 0xD765CDA8UL, 0x3DB1562CUL"},
{"lineNum":"  347","line":"    );"},
{"lineNum":"  348","line":"    static const secp256k1_scalar g1 = SECP256K1_SCALAR_CONST("},
{"lineNum":"  349","line":"        0x00000000UL, 0x00000000UL, 0x00000000UL, 0x00003086UL,"},
{"lineNum":"  350","line":"        0xD221A7D4UL, 0x6BCDE86CUL, 0x90E49284UL, 0xEB153DABUL"},
{"lineNum":"  351","line":"    );"},
{"lineNum":"  352","line":"    static const secp256k1_scalar g2 = SECP256K1_SCALAR_CONST("},
{"lineNum":"  353","line":"        0x00000000UL, 0x00000000UL, 0x00000000UL, 0x0000E443UL,"},
{"lineNum":"  354","line":"        0x7ED6010EUL, 0x88286F54UL, 0x7FA90ABFUL, 0xE4C42212UL"},
{"lineNum":"  355","line":"    );"},
{"lineNum":"  356","line":"    VERIFY_CHECK(r1 != a);"},
{"lineNum":"  357","line":"    VERIFY_CHECK(r2 != a);"},
{"lineNum":"  358","line":"    /* these _var calls are constant time since the shift amount is constant */"},
{"lineNum":"  359","line":"    secp256k1_scalar_mul_shift_var(&c1, a, &g1, 272);"},
{"lineNum":"  360","line":"    secp256k1_scalar_mul_shift_var(&c2, a, &g2, 272);"},
{"lineNum":"  361","line":"    secp256k1_scalar_mul(&c1, &c1, &minus_b1);"},
{"lineNum":"  362","line":"    secp256k1_scalar_mul(&c2, &c2, &minus_b2);"},
{"lineNum":"  363","line":"    secp256k1_scalar_add(r2, &c1, &c2);"},
{"lineNum":"  364","line":"    secp256k1_scalar_mul(r1, r2, &minus_lambda);"},
{"lineNum":"  365","line":"    secp256k1_scalar_add(r1, r1, a);"},
{"lineNum":"  366","line":"}"},
{"lineNum":"  367","line":"#endif"},
{"lineNum":"  368","line":"#endif"},
{"lineNum":"  369","line":""},
{"lineNum":"  370","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "chaum_fuzz_debug", "date" : "2023-08-09 12:28:13", "instrumented" : 137, "covered" : 0,};
var merged_data = [];
