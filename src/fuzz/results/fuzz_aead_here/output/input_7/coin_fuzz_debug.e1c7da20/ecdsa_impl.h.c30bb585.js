var data = {lines:[
{"lineNum":"    1","line":"/**********************************************************************"},
{"lineNum":"    2","line":" * Copyright (c) 2013-2015 Pieter Wuille                              *"},
{"lineNum":"    3","line":" * Distributed under the MIT software license, see the accompanying   *"},
{"lineNum":"    4","line":" * file COPYING or http://www.opensource.org/licenses/mit-license.php.*"},
{"lineNum":"    5","line":" **********************************************************************/"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"#ifndef _SECP256K1_ECDSA_IMPL_H_"},
{"lineNum":"    9","line":"#define _SECP256K1_ECDSA_IMPL_H_"},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"#include \"scalar.h\""},
{"lineNum":"   12","line":"#include \"field.h\""},
{"lineNum":"   13","line":"#include \"group.h\""},
{"lineNum":"   14","line":"#include \"ecmult.h\""},
{"lineNum":"   15","line":"#include \"ecmult_gen.h\""},
{"lineNum":"   16","line":"#include \"ecdsa.h\""},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"/** Group order for secp256k1 defined as \'n\' in \"Standards for Efficient Cryptography\" (SEC2) 2.7.1"},
{"lineNum":"   19","line":" *  sage: for t in xrange(1023, -1, -1):"},
{"lineNum":"   20","line":" *     ..   p = 2**256 - 2**32 - t"},
{"lineNum":"   21","line":" *     ..   if p.is_prime():"},
{"lineNum":"   22","line":" *     ..     print \'%x\'%p"},
{"lineNum":"   23","line":" *     ..     break"},
{"lineNum":"   24","line":" *   \'fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f\'"},
{"lineNum":"   25","line":" *  sage: a = 0"},
{"lineNum":"   26","line":" *  sage: b = 7"},
{"lineNum":"   27","line":" *  sage: F = FiniteField (p)"},
{"lineNum":"   28","line":" *  sage: \'%x\' % (EllipticCurve ([F (a), F (b)]).order())"},
{"lineNum":"   29","line":" *   \'fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141\'"},
{"lineNum":"   30","line":" */"},
{"lineNum":"   31","line":"static const secp256k1_fe secp256k1_ecdsa_const_order_as_fe = SECP256K1_FE_CONST("},
{"lineNum":"   32","line":"    0xFFFFFFFFUL, 0xFFFFFFFFUL, 0xFFFFFFFFUL, 0xFFFFFFFEUL,"},
{"lineNum":"   33","line":"    0xBAAEDCE6UL, 0xAF48A03BUL, 0xBFD25E8CUL, 0xD0364141UL"},
{"lineNum":"   34","line":");"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"/** Difference between field and order, values \'p\' and \'n\' values defined in"},
{"lineNum":"   37","line":" *  \"Standards for Efficient Cryptography\" (SEC2) 2.7.1."},
{"lineNum":"   38","line":" *  sage: p = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F"},
{"lineNum":"   39","line":" *  sage: a = 0"},
{"lineNum":"   40","line":" *  sage: b = 7"},
{"lineNum":"   41","line":" *  sage: F = FiniteField (p)"},
{"lineNum":"   42","line":" *  sage: \'%x\' % (p - EllipticCurve ([F (a), F (b)]).order())"},
{"lineNum":"   43","line":" *   \'14551231950b75fc4402da1722fc9baee\'"},
{"lineNum":"   44","line":" */"},
{"lineNum":"   45","line":"static const secp256k1_fe secp256k1_ecdsa_const_p_minus_order = SECP256K1_FE_CONST("},
{"lineNum":"   46","line":"    0, 0, 0, 1, 0x45512319UL, 0x50B75FC4UL, 0x402DA172UL, 0x2FC9BAEEUL"},
{"lineNum":"   47","line":");"},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"static int secp256k1_der_read_len(const unsigned char **sigp, const unsigned char *sigend) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   50","line":"    int lenleft, b1;"},
{"lineNum":"   51","line":"    size_t ret = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   52","line":"    if (*sigp >= sigend) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   53","line":"        return -1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   54","line":"    }"},
{"lineNum":"   55","line":"    b1 = *((*sigp)++);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   56","line":"    if (b1 == 0xFF) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   57","line":"        /* X.690-0207 8.1.3.5.c the value 0xFF shall not be used. */"},
{"lineNum":"   58","line":"        return -1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   59","line":"    }"},
{"lineNum":"   60","line":"    if ((b1 & 0x80) == 0) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":"        /* X.690-0207 8.1.3.4 short form length octets */"},
{"lineNum":"   62","line":"        return b1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   63","line":"    }"},
{"lineNum":"   64","line":"    if (b1 == 0x80) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   65","line":"        /* Indefinite length is not allowed in DER. */"},
{"lineNum":"   66","line":"        return -1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   67","line":"    }"},
{"lineNum":"   68","line":"    /* X.690-207 8.1.3.5 long form length octets */"},
{"lineNum":"   69","line":"    lenleft = b1 & 0x7F;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   70","line":"    if (lenleft > sigend - *sigp) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   71","line":"        return -1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   72","line":"    }"},
{"lineNum":"   73","line":"    if (**sigp == 0) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   74","line":"        /* Not the shortest possible length encoding. */"},
{"lineNum":"   75","line":"        return -1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   76","line":"    }"},
{"lineNum":"   77","line":"    if ((size_t)lenleft > sizeof(size_t)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   78","line":"        /* The resulting length would exceed the range of a size_t, so"},
{"lineNum":"   79","line":"         * certainly longer than the passed array size."},
{"lineNum":"   80","line":"         */"},
{"lineNum":"   81","line":"        return -1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   82","line":"    }"},
{"lineNum":"   83","line":"    while (lenleft > 0) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   84","line":"        if ((ret >> ((sizeof(size_t) - 1) * 8)) != 0) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   85","line":"        }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   86","line":"        ret = (ret << 8) | **sigp;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   87","line":"        if (ret + lenleft > (size_t)(sigend - *sigp)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   88","line":"            /* Result exceeds the length of the passed array. */"},
{"lineNum":"   89","line":"            return -1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   90","line":"        }"},
{"lineNum":"   91","line":"        (*sigp)++;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   92","line":"        lenleft--;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   93","line":"    }"},
{"lineNum":"   94","line":"    if (ret < 128) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   95","line":"        /* Not the shortest possible length encoding. */"},
{"lineNum":"   96","line":"        return -1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   97","line":"    }"},
{"lineNum":"   98","line":"    return ret;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   99","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"static int secp256k1_der_parse_integer(secp256k1_scalar *r, const unsigned char **sig, const unsigned char *sigend) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  102","line":"    int overflow = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  103","line":"    unsigned char ra[32] = {0};","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  104","line":"    int rlen;"},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"    if (*sig == sigend || **sig != 0x02) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  107","line":"        /* Not a primitive integer (X.690-0207 8.3.1). */"},
{"lineNum":"  108","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  109","line":"    }"},
{"lineNum":"  110","line":"    (*sig)++;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  111","line":"    rlen = secp256k1_der_read_len(sig, sigend);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  112","line":"    if (rlen <= 0 || (*sig) + rlen > sigend) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  113","line":"        /* Exceeds bounds or not at least length 1 (X.690-0207 8.3.1).  */"},
{"lineNum":"  114","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  115","line":"    }"},
{"lineNum":"  116","line":"    if (**sig == 0x00 && rlen > 1 && (((*sig)[1]) & 0x80) == 0x00) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  117","line":"        /* Excessive 0x00 padding. */"},
{"lineNum":"  118","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  119","line":"    }"},
{"lineNum":"  120","line":"    if (**sig == 0xFF && rlen > 1 && (((*sig)[1]) & 0x80) == 0x80) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  121","line":"        /* Excessive 0xFF padding. */"},
{"lineNum":"  122","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  123","line":"    }"},
{"lineNum":"  124","line":"    if ((**sig & 0x80) == 0x80) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  125","line":"        /* Negative. */"},
{"lineNum":"  126","line":"        overflow = 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  127","line":"    }"},
{"lineNum":"  128","line":"    while (rlen > 0 && **sig == 0) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  129","line":"        /* Skip leading zero bytes */"},
{"lineNum":"  130","line":"        rlen--;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  131","line":"        (*sig)++;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  132","line":"    }"},
{"lineNum":"  133","line":"    if (rlen > 32) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  134","line":"        overflow = 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  135","line":"    }"},
{"lineNum":"  136","line":"    if (!overflow) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  137","line":"        memcpy(ra + 32 - rlen, *sig, rlen);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  138","line":"        secp256k1_scalar_set_b32(r, ra, &overflow);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  139","line":"    }"},
{"lineNum":"  140","line":"    if (overflow) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  141","line":"        secp256k1_scalar_set_int(r, 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  142","line":"    }"},
{"lineNum":"  143","line":"    (*sig) += rlen;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  144","line":"    return 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  145","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  146","line":""},
{"lineNum":"  147","line":"static int secp256k1_ecdsa_sig_parse(secp256k1_scalar *rr, secp256k1_scalar *rs, const unsigned char *sig, size_t size) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  148","line":"    const unsigned char *sigend = sig + size;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  149","line":"    int rlen;"},
{"lineNum":"  150","line":"    if (sig == sigend || *(sig++) != 0x30) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  151","line":"        /* The encoding doesn\'t start with a constructed sequence (X.690-0207 8.9.1). */"},
{"lineNum":"  152","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  153","line":"    }"},
{"lineNum":"  154","line":"    rlen = secp256k1_der_read_len(&sig, sigend);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  155","line":"    if (rlen < 0 || sig + rlen > sigend) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  156","line":"        /* Tuple exceeds bounds */"},
{"lineNum":"  157","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  158","line":"    }"},
{"lineNum":"  159","line":"    if (sig + rlen != sigend) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  160","line":"        /* Garbage after tuple. */"},
{"lineNum":"  161","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  162","line":"    }"},
{"lineNum":"  163","line":""},
{"lineNum":"  164","line":"    if (!secp256k1_der_parse_integer(rr, &sig, sigend)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  165","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  166","line":"    }"},
{"lineNum":"  167","line":"    if (!secp256k1_der_parse_integer(rs, &sig, sigend)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  168","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  169","line":"    }"},
{"lineNum":"  170","line":""},
{"lineNum":"  171","line":"    if (sig != sigend) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  172","line":"        /* Trailing garbage inside tuple. */"},
{"lineNum":"  173","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  174","line":"    }"},
{"lineNum":"  175","line":""},
{"lineNum":"  176","line":"    return 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  177","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  178","line":""},
{"lineNum":"  179","line":"static int secp256k1_ecdsa_sig_serialize(unsigned char *sig, size_t *size, const secp256k1_scalar* ar, const secp256k1_scalar* as) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  180","line":"    unsigned char r[33] = {0}, s[33] = {0};","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  181","line":"    unsigned char *rp = r, *sp = s;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  182","line":"    size_t lenR = 33, lenS = 33;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  183","line":"    secp256k1_scalar_get_b32(&r[1], ar);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  184","line":"    secp256k1_scalar_get_b32(&s[1], as);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  185","line":"    while (lenR > 1 && rp[0] == 0 && rp[1] < 0x80) { lenR--; rp++; }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  186","line":"    while (lenS > 1 && sp[0] == 0 && sp[1] < 0x80) { lenS--; sp++; }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  187","line":"    if (*size < 6+lenS+lenR) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  188","line":"        *size = 6 + lenS + lenR;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  189","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  190","line":"    }"},
{"lineNum":"  191","line":"    *size = 6 + lenS + lenR;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  192","line":"    sig[0] = 0x30;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  193","line":"    sig[1] = 4 + lenS + lenR;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  194","line":"    sig[2] = 0x02;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  195","line":"    sig[3] = lenR;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  196","line":"    memcpy(sig+4, rp, lenR);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  197","line":"    sig[4+lenR] = 0x02;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  198","line":"    sig[5+lenR] = lenS;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  199","line":"    memcpy(sig+lenR+6, sp, lenS);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  200","line":"    return 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  201","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  202","line":""},
{"lineNum":"  203","line":"static int secp256k1_ecdsa_sig_verify(const secp256k1_ecmult_context *ctx, const secp256k1_scalar *sigr, const secp256k1_scalar *sigs, const secp256k1_ge *pubkey, const secp256k1_scalar *message) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  204","line":"    unsigned char c[32];"},
{"lineNum":"  205","line":"    secp256k1_scalar sn, u1, u2;"},
{"lineNum":"  206","line":"#if !defined(EXHAUSTIVE_TEST_ORDER)"},
{"lineNum":"  207","line":"    secp256k1_fe xr;"},
{"lineNum":"  208","line":"#endif"},
{"lineNum":"  209","line":"    secp256k1_gej pubkeyj;"},
{"lineNum":"  210","line":"    secp256k1_gej pr;"},
{"lineNum":"  211","line":""},
{"lineNum":"  212","line":"    if (secp256k1_scalar_is_zero(sigr) || secp256k1_scalar_is_zero(sigs)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  213","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  214","line":"    }"},
{"lineNum":"  215","line":""},
{"lineNum":"  216","line":"    secp256k1_scalar_inverse_var(&sn, sigs);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  217","line":"    secp256k1_scalar_mul(&u1, &sn, message);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  218","line":"    secp256k1_scalar_mul(&u2, &sn, sigr);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  219","line":"    secp256k1_gej_set_ge(&pubkeyj, pubkey);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  220","line":"    secp256k1_ecmult(ctx, &pr, &pubkeyj, &u2, &u1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  221","line":"    if (secp256k1_gej_is_infinity(&pr)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  222","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  223","line":"    }"},
{"lineNum":"  224","line":""},
{"lineNum":"  225","line":"#if defined(EXHAUSTIVE_TEST_ORDER)"},
{"lineNum":"  226","line":"{"},
{"lineNum":"  227","line":"    secp256k1_scalar computed_r;"},
{"lineNum":"  228","line":"    int overflow = 0;"},
{"lineNum":"  229","line":"    secp256k1_ge pr_ge;"},
{"lineNum":"  230","line":"    secp256k1_ge_set_gej(&pr_ge, &pr);"},
{"lineNum":"  231","line":"    secp256k1_fe_normalize(&pr_ge.x);"},
{"lineNum":"  232","line":""},
{"lineNum":"  233","line":"    secp256k1_fe_get_b32(c, &pr_ge.x);"},
{"lineNum":"  234","line":"    secp256k1_scalar_set_b32(&computed_r, c, &overflow);"},
{"lineNum":"  235","line":"    /* we fully expect overflow */"},
{"lineNum":"  236","line":"    return secp256k1_scalar_eq(sigr, &computed_r);"},
{"lineNum":"  237","line":"}"},
{"lineNum":"  238","line":"#else"},
{"lineNum":"  239","line":"    secp256k1_scalar_get_b32(c, sigr);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  240","line":"    secp256k1_fe_set_b32(&xr, c);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  241","line":""},
{"lineNum":"  242","line":"    /** We now have the recomputed R point in pr, and its claimed x coordinate (modulo n)"},
{"lineNum":"  243","line":"     *  in xr. Naively, we would extract the x coordinate from pr (requiring a inversion modulo p),"},
{"lineNum":"  244","line":"     *  compute the remainder modulo n, and compare it to xr. However:"},
{"lineNum":"  245","line":"     *"},
{"lineNum":"  246","line":"     *        xr == X(pr) mod n"},
{"lineNum":"  247","line":"     *    <=> exists h. (xr + h * n < p && xr + h * n == X(pr))"},
{"lineNum":"  248","line":"     *    [Since 2 * n > p, h can only be 0 or 1]"},
{"lineNum":"  249","line":"     *    <=> (xr == X(pr)) || (xr + n < p && xr + n == X(pr))"},
{"lineNum":"  250","line":"     *    [In Jacobian coordinates, X(pr) is pr.x / pr.z^2 mod p]"},
{"lineNum":"  251","line":"     *    <=> (xr == pr.x / pr.z^2 mod p) || (xr + n < p && xr + n == pr.x / pr.z^2 mod p)"},
{"lineNum":"  252","line":"     *    [Multiplying both sides of the equations by pr.z^2 mod p]"},
{"lineNum":"  253","line":"     *    <=> (xr * pr.z^2 mod p == pr.x) || (xr + n < p && (xr + n) * pr.z^2 mod p == pr.x)"},
{"lineNum":"  254","line":"     *"},
{"lineNum":"  255","line":"     *  Thus, we can avoid the inversion, but we have to check both cases separately."},
{"lineNum":"  256","line":"     *  secp256k1_gej_eq_x implements the (xr * pr.z^2 mod p == pr.x) test."},
{"lineNum":"  257","line":"     */"},
{"lineNum":"  258","line":"    if (secp256k1_gej_eq_x_var(&xr, &pr)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  259","line":"        /* xr * pr.z^2 mod p == pr.x, so the signature is valid. */"},
{"lineNum":"  260","line":"        return 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  261","line":"    }"},
{"lineNum":"  262","line":"    if (secp256k1_fe_cmp_var(&xr, &secp256k1_ecdsa_const_p_minus_order) >= 0) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  263","line":"        /* xr + n >= p, so we can skip testing the second case. */"},
{"lineNum":"  264","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  265","line":"    }"},
{"lineNum":"  266","line":"    secp256k1_fe_add(&xr, &secp256k1_ecdsa_const_order_as_fe);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  267","line":"    if (secp256k1_gej_eq_x_var(&xr, &pr)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  268","line":"        /* (xr + n) * pr.z^2 mod p == pr.x, so the signature is valid. */"},
{"lineNum":"  269","line":"        return 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  270","line":"    }"},
{"lineNum":"  271","line":"    return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  272","line":"#endif"},
{"lineNum":"  273","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  274","line":""},
{"lineNum":"  275","line":"static int secp256k1_ecdsa_sig_sign(const secp256k1_ecmult_gen_context *ctx, secp256k1_scalar *sigr, secp256k1_scalar *sigs, const secp256k1_scalar *seckey, const secp256k1_scalar *message, const secp256k1_scalar *nonce, int *recid) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  276","line":"    unsigned char b[32];"},
{"lineNum":"  277","line":"    secp256k1_gej rp;"},
{"lineNum":"  278","line":"    secp256k1_ge r;"},
{"lineNum":"  279","line":"    secp256k1_scalar n;"},
{"lineNum":"  280","line":"    int overflow = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  281","line":""},
{"lineNum":"  282","line":"    secp256k1_ecmult_gen(ctx, &rp, nonce);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  283","line":"    secp256k1_ge_set_gej(&r, &rp);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  284","line":"    secp256k1_fe_normalize(&r.x);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  285","line":"    secp256k1_fe_normalize(&r.y);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  286","line":"    secp256k1_fe_get_b32(b, &r.x);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  287","line":"    secp256k1_scalar_set_b32(sigr, b, &overflow);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  288","line":"    if (secp256k1_scalar_is_zero(sigr)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  289","line":"        /* P.x = order is on the curve, so technically sig->r could end up zero, which would be an invalid signature."},
{"lineNum":"  290","line":"         * This branch is cryptographically unreachable as hitting it requires finding the discrete log of P.x = N."},
{"lineNum":"  291","line":"         */"},
{"lineNum":"  292","line":"        secp256k1_gej_clear(&rp);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  293","line":"        secp256k1_ge_clear(&r);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  294","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  295","line":"    }"},
{"lineNum":"  296","line":"    if (recid) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  297","line":"        /* The overflow condition is cryptographically unreachable as hitting it requires finding the discrete log"},
{"lineNum":"  298","line":"         * of some P where P.x >= order, and only 1 in about 2^127 points meet this criteria."},
{"lineNum":"  299","line":"         */"},
{"lineNum":"  300","line":"        *recid = (overflow ? 2 : 0) | (secp256k1_fe_is_odd(&r.y) ? 1 : 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  301","line":"    }"},
{"lineNum":"  302","line":"    secp256k1_scalar_mul(&n, sigr, seckey);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  303","line":"    secp256k1_scalar_add(&n, &n, message);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  304","line":"    secp256k1_scalar_inverse(sigs, nonce);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  305","line":"    secp256k1_scalar_mul(sigs, sigs, &n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  306","line":"    secp256k1_scalar_clear(&n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  307","line":"    secp256k1_gej_clear(&rp);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  308","line":"    secp256k1_ge_clear(&r);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  309","line":"    if (secp256k1_scalar_is_zero(sigs)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  310","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  311","line":"    }"},
{"lineNum":"  312","line":"    if (secp256k1_scalar_is_high(sigs)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  313","line":"        secp256k1_scalar_negate(sigs, sigs);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  314","line":"        if (recid) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  315","line":"            *recid ^= 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  316","line":"        }"},
{"lineNum":"  317","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  318","line":"    return 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  319","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  320","line":""},
{"lineNum":"  321","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "coin_fuzz_debug", "date" : "2023-08-09 11:41:56", "instrumented" : 148, "covered" : 0,};
var merged_data = [];
