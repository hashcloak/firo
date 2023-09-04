var data = {lines:[
{"lineNum":"    1","line":"/**********************************************************************"},
{"lineNum":"    2","line":" * Copyright (c) 2013, 2014 Pieter Wuille                             *"},
{"lineNum":"    3","line":" * Distributed under the MIT software license, see the accompanying   *"},
{"lineNum":"    4","line":" * file COPYING or http://www.opensource.org/licenses/mit-license.php.*"},
{"lineNum":"    5","line":" **********************************************************************/"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"#ifndef _SECP256K1_FIELD_REPR_IMPL_H_"},
{"lineNum":"    8","line":"#define _SECP256K1_FIELD_REPR_IMPL_H_"},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"#if defined HAVE_CONFIG_H"},
{"lineNum":"   11","line":"#include \"libsecp256k1-config.h\""},
{"lineNum":"   12","line":"#endif"},
{"lineNum":"   13","line":""},
{"lineNum":"   14","line":"#include \"util.h\""},
{"lineNum":"   15","line":"#include \"num.h\""},
{"lineNum":"   16","line":"#include \"field.h\""},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"#if defined(USE_ASM_X86_64)"},
{"lineNum":"   19","line":"#include \"field_5x52_asm_impl.h\""},
{"lineNum":"   20","line":"#else"},
{"lineNum":"   21","line":"#include \"field_5x52_int128_impl.h\""},
{"lineNum":"   22","line":"#endif"},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"/** Implements arithmetic modulo FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFE FFFFFC2F,"},
{"lineNum":"   25","line":" *  represented as 5 uint64_t\'s in base 2^52. The values are allowed to contain >52 each. In particular,"},
{"lineNum":"   26","line":" *  each FieldElem has a \'magnitude\' associated with it. Internally, a magnitude M means each element"},
{"lineNum":"   27","line":" *  is at most M*(2^53-1), except the most significant one, which is limited to M*(2^49-1). All operations"},
{"lineNum":"   28","line":" *  accept any input with magnitude at most M, and have different rules for propagating magnitude to their"},
{"lineNum":"   29","line":" *  output."},
{"lineNum":"   30","line":" */"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"#ifdef VERIFY"},
{"lineNum":"   33","line":"static void secp256k1_fe_verify(const secp256k1_fe *a) {"},
{"lineNum":"   34","line":"    const uint64_t *d = a->n;"},
{"lineNum":"   35","line":"    int m = a->normalized ? 1 : 2 * a->magnitude, r = 1;"},
{"lineNum":"   36","line":"   /* secp256k1 \'p\' value defined in \"Standards for Efficient Cryptography\" (SEC2) 2.7.1. */"},
{"lineNum":"   37","line":"    r &= (d[0] <= 0xFFFFFFFFFFFFFULL * m);"},
{"lineNum":"   38","line":"    r &= (d[1] <= 0xFFFFFFFFFFFFFULL * m);"},
{"lineNum":"   39","line":"    r &= (d[2] <= 0xFFFFFFFFFFFFFULL * m);"},
{"lineNum":"   40","line":"    r &= (d[3] <= 0xFFFFFFFFFFFFFULL * m);"},
{"lineNum":"   41","line":"    r &= (d[4] <= 0x0FFFFFFFFFFFFULL * m);"},
{"lineNum":"   42","line":"    r &= (a->magnitude >= 0);"},
{"lineNum":"   43","line":"    r &= (a->magnitude <= 2048);"},
{"lineNum":"   44","line":"    if (a->normalized) {"},
{"lineNum":"   45","line":"        r &= (a->magnitude <= 1);"},
{"lineNum":"   46","line":"        if (r && (d[4] == 0x0FFFFFFFFFFFFULL) && ((d[3] & d[2] & d[1]) == 0xFFFFFFFFFFFFFULL)) {"},
{"lineNum":"   47","line":"            r &= (d[0] < 0xFFFFEFFFFFC2FULL);"},
{"lineNum":"   48","line":"        }"},
{"lineNum":"   49","line":"    }"},
{"lineNum":"   50","line":"    VERIFY_CHECK(r == 1);"},
{"lineNum":"   51","line":"}"},
{"lineNum":"   52","line":"#else"},
{"lineNum":"   53","line":"static void secp256k1_fe_verify(const secp256k1_fe *a) {"},
{"lineNum":"   54","line":"    (void)a;"},
{"lineNum":"   55","line":"}"},
{"lineNum":"   56","line":"#endif"},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"static void secp256k1_fe_normalize(secp256k1_fe *r) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   59","line":"    uint64_t t0 = r->n[0], t1 = r->n[1], t2 = r->n[2], t3 = r->n[3], t4 = r->n[4];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"    /* Reduce t4 at the start so there will be at most a single carry from the first pass */"},
{"lineNum":"   62","line":"    uint64_t m;"},
{"lineNum":"   63","line":"    uint64_t x = t4 >> 48; t4 &= 0x0FFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"    /* The first pass ensures the magnitude is 1, ... */"},
{"lineNum":"   66","line":"    t0 += x * 0x1000003D1ULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   67","line":"    t1 += (t0 >> 52); t0 &= 0xFFFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   68","line":"    t2 += (t1 >> 52); t1 &= 0xFFFFFFFFFFFFFULL; m = t1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   69","line":"    t3 += (t2 >> 52); t2 &= 0xFFFFFFFFFFFFFULL; m &= t2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   70","line":"    t4 += (t3 >> 52); t3 &= 0xFFFFFFFFFFFFFULL; m &= t3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"    /* ... except for a possible carry at bit 48 of t4 (i.e. bit 256 of the field element) */"},
{"lineNum":"   73","line":"    VERIFY_CHECK(t4 >> 49 == 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"    /* At most a single final reduction is needed; check if the value is >= the field characteristic */"},
{"lineNum":"   76","line":"    x = (t4 >> 48) | ((t4 == 0x0FFFFFFFFFFFFULL) & (m == 0xFFFFFFFFFFFFFULL)","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   77","line":"        & (t0 >= 0xFFFFEFFFFFC2FULL));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"    /* Apply the final reduction (for constant-time behaviour, we do it always) */"},
{"lineNum":"   80","line":"    t0 += x * 0x1000003D1ULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   81","line":"    t1 += (t0 >> 52); t0 &= 0xFFFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   82","line":"    t2 += (t1 >> 52); t1 &= 0xFFFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   83","line":"    t3 += (t2 >> 52); t2 &= 0xFFFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   84","line":"    t4 += (t3 >> 52); t3 &= 0xFFFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"    /* If t4 didn\'t carry to bit 48 already, then it should have after any final reduction */"},
{"lineNum":"   87","line":"    VERIFY_CHECK(t4 >> 48 == x);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"    /* Mask off the possible multiple of 2^256 from the final reduction */"},
{"lineNum":"   90","line":"    t4 &= 0x0FFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"    r->n[0] = t0; r->n[1] = t1; r->n[2] = t2; r->n[3] = t3; r->n[4] = t4;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"#ifdef VERIFY"},
{"lineNum":"   95","line":"    r->magnitude = 1;"},
{"lineNum":"   96","line":"    r->normalized = 1;"},
{"lineNum":"   97","line":"    secp256k1_fe_verify(r);"},
{"lineNum":"   98","line":"#endif"},
{"lineNum":"   99","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"static void secp256k1_fe_normalize_weak(secp256k1_fe *r) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  102","line":"    uint64_t t0 = r->n[0], t1 = r->n[1], t2 = r->n[2], t3 = r->n[3], t4 = r->n[4];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"    /* Reduce t4 at the start so there will be at most a single carry from the first pass */"},
{"lineNum":"  105","line":"    uint64_t x = t4 >> 48; t4 &= 0x0FFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  106","line":""},
{"lineNum":"  107","line":"    /* The first pass ensures the magnitude is 1, ... */"},
{"lineNum":"  108","line":"    t0 += x * 0x1000003D1ULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  109","line":"    t1 += (t0 >> 52); t0 &= 0xFFFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  110","line":"    t2 += (t1 >> 52); t1 &= 0xFFFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  111","line":"    t3 += (t2 >> 52); t2 &= 0xFFFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  112","line":"    t4 += (t3 >> 52); t3 &= 0xFFFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  113","line":""},
{"lineNum":"  114","line":"    /* ... except for a possible carry at bit 48 of t4 (i.e. bit 256 of the field element) */"},
{"lineNum":"  115","line":"    VERIFY_CHECK(t4 >> 49 == 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  116","line":""},
{"lineNum":"  117","line":"    r->n[0] = t0; r->n[1] = t1; r->n[2] = t2; r->n[3] = t3; r->n[4] = t4;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  118","line":""},
{"lineNum":"  119","line":"#ifdef VERIFY"},
{"lineNum":"  120","line":"    r->magnitude = 1;"},
{"lineNum":"  121","line":"    secp256k1_fe_verify(r);"},
{"lineNum":"  122","line":"#endif"},
{"lineNum":"  123","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  124","line":""},
{"lineNum":"  125","line":"static void secp256k1_fe_normalize_var(secp256k1_fe *r) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  126","line":"    uint64_t t0 = r->n[0], t1 = r->n[1], t2 = r->n[2], t3 = r->n[3], t4 = r->n[4];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  127","line":""},
{"lineNum":"  128","line":"    /* Reduce t4 at the start so there will be at most a single carry from the first pass */"},
{"lineNum":"  129","line":"    uint64_t m;"},
{"lineNum":"  130","line":"    uint64_t x = t4 >> 48; t4 &= 0x0FFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  131","line":""},
{"lineNum":"  132","line":"    /* The first pass ensures the magnitude is 1, ... */"},
{"lineNum":"  133","line":"    t0 += x * 0x1000003D1ULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  134","line":"    t1 += (t0 >> 52); t0 &= 0xFFFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  135","line":"    t2 += (t1 >> 52); t1 &= 0xFFFFFFFFFFFFFULL; m = t1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  136","line":"    t3 += (t2 >> 52); t2 &= 0xFFFFFFFFFFFFFULL; m &= t2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  137","line":"    t4 += (t3 >> 52); t3 &= 0xFFFFFFFFFFFFFULL; m &= t3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  138","line":""},
{"lineNum":"  139","line":"    /* ... except for a possible carry at bit 48 of t4 (i.e. bit 256 of the field element) */"},
{"lineNum":"  140","line":"    VERIFY_CHECK(t4 >> 49 == 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  141","line":""},
{"lineNum":"  142","line":"    /* At most a single final reduction is needed; check if the value is >= the field characteristic */"},
{"lineNum":"  143","line":"    x = (t4 >> 48) | ((t4 == 0x0FFFFFFFFFFFFULL) & (m == 0xFFFFFFFFFFFFFULL)","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  144","line":"        & (t0 >= 0xFFFFEFFFFFC2FULL));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  145","line":""},
{"lineNum":"  146","line":"    if (x) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  147","line":"        t0 += 0x1000003D1ULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  148","line":"        t1 += (t0 >> 52); t0 &= 0xFFFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  149","line":"        t2 += (t1 >> 52); t1 &= 0xFFFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  150","line":"        t3 += (t2 >> 52); t2 &= 0xFFFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  151","line":"        t4 += (t3 >> 52); t3 &= 0xFFFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  152","line":""},
{"lineNum":"  153","line":"        /* If t4 didn\'t carry to bit 48 already, then it should have after any final reduction */"},
{"lineNum":"  154","line":"        VERIFY_CHECK(t4 >> 48 == x);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  155","line":""},
{"lineNum":"  156","line":"        /* Mask off the possible multiple of 2^256 from the final reduction */"},
{"lineNum":"  157","line":"        t4 &= 0x0FFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  158","line":"    }"},
{"lineNum":"  159","line":""},
{"lineNum":"  160","line":"    r->n[0] = t0; r->n[1] = t1; r->n[2] = t2; r->n[3] = t3; r->n[4] = t4;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  161","line":""},
{"lineNum":"  162","line":"#ifdef VERIFY"},
{"lineNum":"  163","line":"    r->magnitude = 1;"},
{"lineNum":"  164","line":"    r->normalized = 1;"},
{"lineNum":"  165","line":"    secp256k1_fe_verify(r);"},
{"lineNum":"  166","line":"#endif"},
{"lineNum":"  167","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  168","line":""},
{"lineNum":"  169","line":"static int secp256k1_fe_normalizes_to_zero(secp256k1_fe *r) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  170","line":"    uint64_t t0 = r->n[0], t1 = r->n[1], t2 = r->n[2], t3 = r->n[3], t4 = r->n[4];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  171","line":""},
{"lineNum":"  172","line":"    /* z0 tracks a possible raw value of 0, z1 tracks a possible raw value of P */"},
{"lineNum":"  173","line":"    uint64_t z0, z1;"},
{"lineNum":"  174","line":""},
{"lineNum":"  175","line":"    /* Reduce t4 at the start so there will be at most a single carry from the first pass */"},
{"lineNum":"  176","line":"    uint64_t x = t4 >> 48; t4 &= 0x0FFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  177","line":""},
{"lineNum":"  178","line":"    /* The first pass ensures the magnitude is 1, ... */"},
{"lineNum":"  179","line":"    t0 += x * 0x1000003D1ULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  180","line":"    t1 += (t0 >> 52); t0 &= 0xFFFFFFFFFFFFFULL; z0  = t0; z1  = t0 ^ 0x1000003D0ULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  181","line":"    t2 += (t1 >> 52); t1 &= 0xFFFFFFFFFFFFFULL; z0 |= t1; z1 &= t1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  182","line":"    t3 += (t2 >> 52); t2 &= 0xFFFFFFFFFFFFFULL; z0 |= t2; z1 &= t2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  183","line":"    t4 += (t3 >> 52); t3 &= 0xFFFFFFFFFFFFFULL; z0 |= t3; z1 &= t3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  184","line":"                                                z0 |= t4; z1 &= t4 ^ 0xF000000000000ULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  185","line":""},
{"lineNum":"  186","line":"    /* ... except for a possible carry at bit 48 of t4 (i.e. bit 256 of the field element) */"},
{"lineNum":"  187","line":"    VERIFY_CHECK(t4 >> 49 == 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  188","line":""},
{"lineNum":"  189","line":"    return (z0 == 0) | (z1 == 0xFFFFFFFFFFFFFULL);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  190","line":"}"},
{"lineNum":"  191","line":""},
{"lineNum":"  192","line":"static int secp256k1_fe_normalizes_to_zero_var(secp256k1_fe *r) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  193","line":"    uint64_t t0, t1, t2, t3, t4;"},
{"lineNum":"  194","line":"    uint64_t z0, z1;"},
{"lineNum":"  195","line":"    uint64_t x;"},
{"lineNum":"  196","line":""},
{"lineNum":"  197","line":"    t0 = r->n[0];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  198","line":"    t4 = r->n[4];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  199","line":""},
{"lineNum":"  200","line":"    /* Reduce t4 at the start so there will be at most a single carry from the first pass */"},
{"lineNum":"  201","line":"    x = t4 >> 48;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  202","line":""},
{"lineNum":"  203","line":"    /* The first pass ensures the magnitude is 1, ... */"},
{"lineNum":"  204","line":"    t0 += x * 0x1000003D1ULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  205","line":""},
{"lineNum":"  206","line":"    /* z0 tracks a possible raw value of 0, z1 tracks a possible raw value of P */"},
{"lineNum":"  207","line":"    z0 = t0 & 0xFFFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  208","line":"    z1 = z0 ^ 0x1000003D0ULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  209","line":""},
{"lineNum":"  210","line":"    /* Fast return path should catch the majority of cases */"},
{"lineNum":"  211","line":"    if ((z0 != 0ULL) & (z1 != 0xFFFFFFFFFFFFFULL)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  212","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  213","line":"    }"},
{"lineNum":"  214","line":""},
{"lineNum":"  215","line":"    t1 = r->n[1];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  216","line":"    t2 = r->n[2];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  217","line":"    t3 = r->n[3];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  218","line":""},
{"lineNum":"  219","line":"    t4 &= 0x0FFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  220","line":""},
{"lineNum":"  221","line":"    t1 += (t0 >> 52);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  222","line":"    t2 += (t1 >> 52); t1 &= 0xFFFFFFFFFFFFFULL; z0 |= t1; z1 &= t1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  223","line":"    t3 += (t2 >> 52); t2 &= 0xFFFFFFFFFFFFFULL; z0 |= t2; z1 &= t2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  224","line":"    t4 += (t3 >> 52); t3 &= 0xFFFFFFFFFFFFFULL; z0 |= t3; z1 &= t3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  225","line":"                                                z0 |= t4; z1 &= t4 ^ 0xF000000000000ULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  226","line":""},
{"lineNum":"  227","line":"    /* ... except for a possible carry at bit 48 of t4 (i.e. bit 256 of the field element) */"},
{"lineNum":"  228","line":"    VERIFY_CHECK(t4 >> 49 == 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  229","line":""},
{"lineNum":"  230","line":"    return (z0 == 0) | (z1 == 0xFFFFFFFFFFFFFULL);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  231","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  232","line":""},
{"lineNum":"  233","line":"SECP256K1_INLINE static void secp256k1_fe_set_int(secp256k1_fe *r, int a) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  234","line":"    r->n[0] = a;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  235","line":"    r->n[1] = r->n[2] = r->n[3] = r->n[4] = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  236","line":"#ifdef VERIFY"},
{"lineNum":"  237","line":"    r->magnitude = 1;"},
{"lineNum":"  238","line":"    r->normalized = 1;"},
{"lineNum":"  239","line":"    secp256k1_fe_verify(r);"},
{"lineNum":"  240","line":"#endif"},
{"lineNum":"  241","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  242","line":""},
{"lineNum":"  243","line":"SECP256K1_INLINE static int secp256k1_fe_is_zero(const secp256k1_fe *a) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  244","line":"    const uint64_t *t = a->n;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  245","line":"#ifdef VERIFY"},
{"lineNum":"  246","line":"    VERIFY_CHECK(a->normalized);"},
{"lineNum":"  247","line":"    secp256k1_fe_verify(a);"},
{"lineNum":"  248","line":"#endif"},
{"lineNum":"  249","line":"    return (t[0] | t[1] | t[2] | t[3] | t[4]) == 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  250","line":"}"},
{"lineNum":"  251","line":""},
{"lineNum":"  252","line":"SECP256K1_INLINE static int secp256k1_fe_is_odd(const secp256k1_fe *a) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  253","line":"#ifdef VERIFY"},
{"lineNum":"  254","line":"    VERIFY_CHECK(a->normalized);"},
{"lineNum":"  255","line":"    secp256k1_fe_verify(a);"},
{"lineNum":"  256","line":"#endif"},
{"lineNum":"  257","line":"    return a->n[0] & 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  258","line":"}"},
{"lineNum":"  259","line":""},
{"lineNum":"  260","line":"SECP256K1_INLINE static void secp256k1_fe_clear(secp256k1_fe *a) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  261","line":"    int i;"},
{"lineNum":"  262","line":"#ifdef VERIFY"},
{"lineNum":"  263","line":"    a->magnitude = 0;"},
{"lineNum":"  264","line":"    a->normalized = 1;"},
{"lineNum":"  265","line":"#endif"},
{"lineNum":"  266","line":"    for (i=0; i<5; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  267","line":"        a->n[i] = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  268","line":"    }"},
{"lineNum":"  269","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  270","line":""},
{"lineNum":"  271","line":"static int secp256k1_fe_cmp_var(const secp256k1_fe *a, const secp256k1_fe *b) {"},
{"lineNum":"  272","line":"    int i;"},
{"lineNum":"  273","line":"#ifdef VERIFY"},
{"lineNum":"  274","line":"    VERIFY_CHECK(a->normalized);"},
{"lineNum":"  275","line":"    VERIFY_CHECK(b->normalized);"},
{"lineNum":"  276","line":"    secp256k1_fe_verify(a);"},
{"lineNum":"  277","line":"    secp256k1_fe_verify(b);"},
{"lineNum":"  278","line":"#endif"},
{"lineNum":"  279","line":"    for (i = 4; i >= 0; i--) {"},
{"lineNum":"  280","line":"        if (a->n[i] > b->n[i]) {"},
{"lineNum":"  281","line":"            return 1;"},
{"lineNum":"  282","line":"        }"},
{"lineNum":"  283","line":"        if (a->n[i] < b->n[i]) {"},
{"lineNum":"  284","line":"            return -1;"},
{"lineNum":"  285","line":"        }"},
{"lineNum":"  286","line":"    }"},
{"lineNum":"  287","line":"    return 0;"},
{"lineNum":"  288","line":"}"},
{"lineNum":"  289","line":""},
{"lineNum":"  290","line":"static int secp256k1_fe_set_b32(secp256k1_fe *r, const unsigned char *a) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  291","line":"    int i;"},
{"lineNum":"  292","line":"    r->n[0] = r->n[1] = r->n[2] = r->n[3] = r->n[4] = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  293","line":"    for (i=0; i<32; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  294","line":"        int j;"},
{"lineNum":"  295","line":"        for (j=0; j<2; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  296","line":"            int limb = (8*i+4*j)/52;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  297","line":"            int shift = (8*i+4*j)%52;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  298","line":"            r->n[limb] |= (uint64_t)((a[31-i] >> (4*j)) & 0xF) << shift;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  299","line":"        }"},
{"lineNum":"  300","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  301","line":"    if (r->n[4] == 0x0FFFFFFFFFFFFULL && (r->n[3] & r->n[2] & r->n[1]) == 0xFFFFFFFFFFFFFULL && r->n[0] >= 0xFFFFEFFFFFC2FULL) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  302","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  303","line":"    }"},
{"lineNum":"  304","line":"#ifdef VERIFY"},
{"lineNum":"  305","line":"    r->magnitude = 1;"},
{"lineNum":"  306","line":"    r->normalized = 1;"},
{"lineNum":"  307","line":"    secp256k1_fe_verify(r);"},
{"lineNum":"  308","line":"#endif"},
{"lineNum":"  309","line":"    return 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  310","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  311","line":""},
{"lineNum":"  312","line":"/** Convert a field element to a 32-byte big endian value. Requires the input to be normalized */"},
{"lineNum":"  313","line":"static void secp256k1_fe_get_b32(unsigned char *r, const secp256k1_fe *a) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  314","line":"    int i;"},
{"lineNum":"  315","line":"#ifdef VERIFY"},
{"lineNum":"  316","line":"    VERIFY_CHECK(a->normalized);"},
{"lineNum":"  317","line":"    secp256k1_fe_verify(a);"},
{"lineNum":"  318","line":"#endif"},
{"lineNum":"  319","line":"    for (i=0; i<32; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  320","line":"        int j;"},
{"lineNum":"  321","line":"        int c = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  322","line":"        for (j=0; j<2; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  323","line":"            int limb = (8*i+4*j)/52;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  324","line":"            int shift = (8*i+4*j)%52;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  325","line":"            c |= ((a->n[limb] >> shift) & 0xF) << (4 * j);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  326","line":"        }"},
{"lineNum":"  327","line":"        r[31-i] = c;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  328","line":"    }"},
{"lineNum":"  329","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  330","line":""},
{"lineNum":"  331","line":"SECP256K1_INLINE static void secp256k1_fe_negate(secp256k1_fe *r, const secp256k1_fe *a, int m) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  332","line":"#ifdef VERIFY"},
{"lineNum":"  333","line":"    VERIFY_CHECK(a->magnitude <= m);"},
{"lineNum":"  334","line":"    secp256k1_fe_verify(a);"},
{"lineNum":"  335","line":"#endif"},
{"lineNum":"  336","line":"    r->n[0] = 0xFFFFEFFFFFC2FULL * 2 * (m + 1) - a->n[0];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  337","line":"    r->n[1] = 0xFFFFFFFFFFFFFULL * 2 * (m + 1) - a->n[1];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  338","line":"    r->n[2] = 0xFFFFFFFFFFFFFULL * 2 * (m + 1) - a->n[2];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  339","line":"    r->n[3] = 0xFFFFFFFFFFFFFULL * 2 * (m + 1) - a->n[3];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  340","line":"    r->n[4] = 0x0FFFFFFFFFFFFULL * 2 * (m + 1) - a->n[4];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  341","line":"#ifdef VERIFY"},
{"lineNum":"  342","line":"    r->magnitude = m + 1;"},
{"lineNum":"  343","line":"    r->normalized = 0;"},
{"lineNum":"  344","line":"    secp256k1_fe_verify(r);"},
{"lineNum":"  345","line":"#endif"},
{"lineNum":"  346","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  347","line":""},
{"lineNum":"  348","line":"SECP256K1_INLINE static void secp256k1_fe_mul_int(secp256k1_fe *r, int a) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  349","line":"    r->n[0] *= a;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  350","line":"    r->n[1] *= a;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  351","line":"    r->n[2] *= a;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  352","line":"    r->n[3] *= a;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  353","line":"    r->n[4] *= a;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  354","line":"#ifdef VERIFY"},
{"lineNum":"  355","line":"    r->magnitude *= a;"},
{"lineNum":"  356","line":"    r->normalized = 0;"},
{"lineNum":"  357","line":"    secp256k1_fe_verify(r);"},
{"lineNum":"  358","line":"#endif"},
{"lineNum":"  359","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  360","line":""},
{"lineNum":"  361","line":"SECP256K1_INLINE static void secp256k1_fe_add(secp256k1_fe *r, const secp256k1_fe *a) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  362","line":"#ifdef VERIFY"},
{"lineNum":"  363","line":"    secp256k1_fe_verify(a);"},
{"lineNum":"  364","line":"#endif"},
{"lineNum":"  365","line":"    r->n[0] += a->n[0];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  366","line":"    r->n[1] += a->n[1];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  367","line":"    r->n[2] += a->n[2];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  368","line":"    r->n[3] += a->n[3];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  369","line":"    r->n[4] += a->n[4];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  370","line":"#ifdef VERIFY"},
{"lineNum":"  371","line":"    r->magnitude += a->magnitude;"},
{"lineNum":"  372","line":"    r->normalized = 0;"},
{"lineNum":"  373","line":"    secp256k1_fe_verify(r);"},
{"lineNum":"  374","line":"#endif"},
{"lineNum":"  375","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  376","line":""},
{"lineNum":"  377","line":"static void secp256k1_fe_mul(secp256k1_fe *r, const secp256k1_fe *a, const secp256k1_fe * SECP256K1_RESTRICT b) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  378","line":"#ifdef VERIFY"},
{"lineNum":"  379","line":"    VERIFY_CHECK(a->magnitude <= 8);"},
{"lineNum":"  380","line":"    VERIFY_CHECK(b->magnitude <= 8);"},
{"lineNum":"  381","line":"    secp256k1_fe_verify(a);"},
{"lineNum":"  382","line":"    secp256k1_fe_verify(b);"},
{"lineNum":"  383","line":"    VERIFY_CHECK(r != b);"},
{"lineNum":"  384","line":"#endif"},
{"lineNum":"  385","line":"    secp256k1_fe_mul_inner(r->n, a->n, b->n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  386","line":"#ifdef VERIFY"},
{"lineNum":"  387","line":"    r->magnitude = 1;"},
{"lineNum":"  388","line":"    r->normalized = 0;"},
{"lineNum":"  389","line":"    secp256k1_fe_verify(r);"},
{"lineNum":"  390","line":"#endif"},
{"lineNum":"  391","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  392","line":""},
{"lineNum":"  393","line":"static void secp256k1_fe_sqr(secp256k1_fe *r, const secp256k1_fe *a) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  394","line":"#ifdef VERIFY"},
{"lineNum":"  395","line":"    VERIFY_CHECK(a->magnitude <= 8);"},
{"lineNum":"  396","line":"    secp256k1_fe_verify(a);"},
{"lineNum":"  397","line":"#endif"},
{"lineNum":"  398","line":"    secp256k1_fe_sqr_inner(r->n, a->n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  399","line":"#ifdef VERIFY"},
{"lineNum":"  400","line":"    r->magnitude = 1;"},
{"lineNum":"  401","line":"    r->normalized = 0;"},
{"lineNum":"  402","line":"    secp256k1_fe_verify(r);"},
{"lineNum":"  403","line":"#endif"},
{"lineNum":"  404","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  405","line":""},
{"lineNum":"  406","line":"static SECP256K1_INLINE void secp256k1_fe_cmov(secp256k1_fe *r, const secp256k1_fe *a, int flag) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  407","line":"    uint64_t mask0, mask1;"},
{"lineNum":"  408","line":"    mask0 = flag + ~((uint64_t)0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  409","line":"    mask1 = ~mask0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  410","line":"    r->n[0] = (r->n[0] & mask0) | (a->n[0] & mask1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  411","line":"    r->n[1] = (r->n[1] & mask0) | (a->n[1] & mask1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  412","line":"    r->n[2] = (r->n[2] & mask0) | (a->n[2] & mask1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  413","line":"    r->n[3] = (r->n[3] & mask0) | (a->n[3] & mask1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  414","line":"    r->n[4] = (r->n[4] & mask0) | (a->n[4] & mask1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  415","line":"#ifdef VERIFY"},
{"lineNum":"  416","line":"    if (a->magnitude > r->magnitude) {"},
{"lineNum":"  417","line":"        r->magnitude = a->magnitude;"},
{"lineNum":"  418","line":"    }"},
{"lineNum":"  419","line":"    r->normalized &= a->normalized;"},
{"lineNum":"  420","line":"#endif"},
{"lineNum":"  421","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  422","line":""},
{"lineNum":"  423","line":"static SECP256K1_INLINE void secp256k1_fe_storage_cmov(secp256k1_fe_storage *r, const secp256k1_fe_storage *a, int flag) {"},
{"lineNum":"  424","line":"    uint64_t mask0, mask1;"},
{"lineNum":"  425","line":"    mask0 = flag + ~((uint64_t)0);"},
{"lineNum":"  426","line":"    mask1 = ~mask0;"},
{"lineNum":"  427","line":"    r->n[0] = (r->n[0] & mask0) | (a->n[0] & mask1);"},
{"lineNum":"  428","line":"    r->n[1] = (r->n[1] & mask0) | (a->n[1] & mask1);"},
{"lineNum":"  429","line":"    r->n[2] = (r->n[2] & mask0) | (a->n[2] & mask1);"},
{"lineNum":"  430","line":"    r->n[3] = (r->n[3] & mask0) | (a->n[3] & mask1);"},
{"lineNum":"  431","line":"}"},
{"lineNum":"  432","line":""},
{"lineNum":"  433","line":"static void secp256k1_fe_to_storage(secp256k1_fe_storage *r, const secp256k1_fe *a) {"},
{"lineNum":"  434","line":"#ifdef VERIFY"},
{"lineNum":"  435","line":"    VERIFY_CHECK(a->normalized);"},
{"lineNum":"  436","line":"#endif"},
{"lineNum":"  437","line":"    r->n[0] = a->n[0] | a->n[1] << 52;"},
{"lineNum":"  438","line":"    r->n[1] = a->n[1] >> 12 | a->n[2] << 40;"},
{"lineNum":"  439","line":"    r->n[2] = a->n[2] >> 24 | a->n[3] << 28;"},
{"lineNum":"  440","line":"    r->n[3] = a->n[3] >> 36 | a->n[4] << 16;"},
{"lineNum":"  441","line":"}"},
{"lineNum":"  442","line":""},
{"lineNum":"  443","line":"static SECP256K1_INLINE void secp256k1_fe_from_storage(secp256k1_fe *r, const secp256k1_fe_storage *a) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  444","line":"    r->n[0] = a->n[0] & 0xFFFFFFFFFFFFFULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  445","line":"    r->n[1] = a->n[0] >> 52 | ((a->n[1] << 12) & 0xFFFFFFFFFFFFFULL);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  446","line":"    r->n[2] = a->n[1] >> 40 | ((a->n[2] << 24) & 0xFFFFFFFFFFFFFULL);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  447","line":"    r->n[3] = a->n[2] >> 28 | ((a->n[3] << 36) & 0xFFFFFFFFFFFFFULL);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  448","line":"    r->n[4] = a->n[3] >> 16;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  449","line":"#ifdef VERIFY"},
{"lineNum":"  450","line":"    r->magnitude = 1;"},
{"lineNum":"  451","line":"    r->normalized = 1;"},
{"lineNum":"  452","line":"#endif"},
{"lineNum":"  453","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  454","line":""},
{"lineNum":"  455","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "f4grumble_debug", "date" : "2023-08-29 14:57:57", "instrumented" : 161, "covered" : 0,};
var merged_data = [];
