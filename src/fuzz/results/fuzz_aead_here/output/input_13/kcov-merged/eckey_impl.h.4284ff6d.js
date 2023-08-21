var data = {lines:[
{"lineNum":"    1","line":"/**********************************************************************"},
{"lineNum":"    2","line":" * Copyright (c) 2013, 2014 Pieter Wuille                             *"},
{"lineNum":"    3","line":" * Distributed under the MIT software license, see the accompanying   *"},
{"lineNum":"    4","line":" * file COPYING or http://www.opensource.org/licenses/mit-license.php.*"},
{"lineNum":"    5","line":" **********************************************************************/"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"#ifndef _SECP256K1_ECKEY_IMPL_H_"},
{"lineNum":"    8","line":"#define _SECP256K1_ECKEY_IMPL_H_"},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"#include \"eckey.h\""},
{"lineNum":"   11","line":""},
{"lineNum":"   12","line":"#include \"scalar.h\""},
{"lineNum":"   13","line":"#include \"field.h\""},
{"lineNum":"   14","line":"#include \"group.h\""},
{"lineNum":"   15","line":"#include \"ecmult_gen.h\""},
{"lineNum":"   16","line":""},
{"lineNum":"   17","line":"static int secp256k1_eckey_pubkey_parse(secp256k1_ge *elem, const unsigned char *pub, size_t size) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   18","line":"    if (size == 33 && (pub[0] == 0x02 || pub[0] == 0x03)) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   19","line":"        secp256k1_fe x;"},
{"lineNum":"   20","line":"        return secp256k1_fe_set_b32(&x, pub+1) && secp256k1_ge_set_xo_var(elem, &x, pub[0] == 0x03);","class":"lineNoCov","hits":"0",},
{"lineNum":"   21","line":"    } else if (size == 65 && (pub[0] == 0x04 || pub[0] == 0x06 || pub[0] == 0x07)) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   22","line":"        secp256k1_fe x, y;"},
{"lineNum":"   23","line":"        if (!secp256k1_fe_set_b32(&x, pub+1) || !secp256k1_fe_set_b32(&y, pub+33)) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   24","line":"            return 0;","class":"lineNoCov","hits":"0",},
{"lineNum":"   25","line":"        }"},
{"lineNum":"   26","line":"        secp256k1_ge_set_xy(elem, &x, &y);","class":"lineNoCov","hits":"0",},
{"lineNum":"   27","line":"        if ((pub[0] == 0x06 || pub[0] == 0x07) && secp256k1_fe_is_odd(&y) != (pub[0] == 0x07)) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   28","line":"            return 0;","class":"lineNoCov","hits":"0",},
{"lineNum":"   29","line":"        }"},
{"lineNum":"   30","line":"        return secp256k1_ge_is_valid_var(elem);","class":"lineNoCov","hits":"0",},
{"lineNum":"   31","line":"    } else {"},
{"lineNum":"   32","line":"        return 0;","class":"lineNoCov","hits":"0",},
{"lineNum":"   33","line":"    }"},
{"lineNum":"   34","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"static int secp256k1_eckey_pubkey_serialize(secp256k1_ge *elem, unsigned char *pub, size_t *size, int compressed) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   37","line":"    if (secp256k1_ge_is_infinity(elem)) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   38","line":"        return 0;","class":"lineNoCov","hits":"0",},
{"lineNum":"   39","line":"    }"},
{"lineNum":"   40","line":"    secp256k1_fe_normalize_var(&elem->x);","class":"lineNoCov","hits":"0",},
{"lineNum":"   41","line":"    secp256k1_fe_normalize_var(&elem->y);","class":"lineNoCov","hits":"0",},
{"lineNum":"   42","line":"    secp256k1_fe_get_b32(&pub[1], &elem->x);","class":"lineNoCov","hits":"0",},
{"lineNum":"   43","line":"    if (compressed) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   44","line":"        *size = 33;","class":"lineNoCov","hits":"0",},
{"lineNum":"   45","line":"        pub[0] = 0x02 | (secp256k1_fe_is_odd(&elem->y) ? 0x01 : 0x00);","class":"lineNoCov","hits":"0",},
{"lineNum":"   46","line":"    } else {","class":"lineNoCov","hits":"0",},
{"lineNum":"   47","line":"        *size = 65;","class":"lineNoCov","hits":"0",},
{"lineNum":"   48","line":"        pub[0] = 0x04;","class":"lineNoCov","hits":"0",},
{"lineNum":"   49","line":"        secp256k1_fe_get_b32(&pub[33], &elem->y);","class":"lineNoCov","hits":"0",},
{"lineNum":"   50","line":"    }"},
{"lineNum":"   51","line":"    return 1;","class":"lineNoCov","hits":"0",},
{"lineNum":"   52","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"static int secp256k1_eckey_privkey_tweak_add(secp256k1_scalar *key, const secp256k1_scalar *tweak) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   55","line":"    secp256k1_scalar_add(key, key, tweak);","class":"lineNoCov","hits":"0",},
{"lineNum":"   56","line":"    if (secp256k1_scalar_is_zero(key)) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   57","line":"        return 0;","class":"lineNoCov","hits":"0",},
{"lineNum":"   58","line":"    }"},
{"lineNum":"   59","line":"    return 1;","class":"lineNoCov","hits":"0",},
{"lineNum":"   60","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"static int secp256k1_eckey_pubkey_tweak_add(const secp256k1_ecmult_context *ctx, secp256k1_ge *key, const secp256k1_scalar *tweak) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   63","line":"    secp256k1_gej pt;"},
{"lineNum":"   64","line":"    secp256k1_scalar one;"},
{"lineNum":"   65","line":"    secp256k1_gej_set_ge(&pt, key);","class":"lineNoCov","hits":"0",},
{"lineNum":"   66","line":"    secp256k1_scalar_set_int(&one, 1);","class":"lineNoCov","hits":"0",},
{"lineNum":"   67","line":"    secp256k1_ecmult(ctx, &pt, &pt, &one, tweak);","class":"lineNoCov","hits":"0",},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"    if (secp256k1_gej_is_infinity(&pt)) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   70","line":"        return 0;","class":"lineNoCov","hits":"0",},
{"lineNum":"   71","line":"    }"},
{"lineNum":"   72","line":"    secp256k1_ge_set_gej(key, &pt);","class":"lineNoCov","hits":"0",},
{"lineNum":"   73","line":"    return 1;","class":"lineNoCov","hits":"0",},
{"lineNum":"   74","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"static int secp256k1_eckey_privkey_tweak_mul(secp256k1_scalar *key, const secp256k1_scalar *tweak) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   77","line":"    if (secp256k1_scalar_is_zero(tweak)) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   78","line":"        return 0;","class":"lineNoCov","hits":"0",},
{"lineNum":"   79","line":"    }"},
{"lineNum":"   80","line":""},
{"lineNum":"   81","line":"    secp256k1_scalar_mul(key, key, tweak);","class":"lineNoCov","hits":"0",},
{"lineNum":"   82","line":"    return 1;","class":"lineNoCov","hits":"0",},
{"lineNum":"   83","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"static int secp256k1_eckey_pubkey_tweak_mul(const secp256k1_ecmult_context *ctx, secp256k1_ge *key, const secp256k1_scalar *tweak) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   86","line":"    secp256k1_scalar zero;"},
{"lineNum":"   87","line":"    secp256k1_gej pt;"},
{"lineNum":"   88","line":"    if (secp256k1_scalar_is_zero(tweak)) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   89","line":"        return 0;","class":"lineNoCov","hits":"0",},
{"lineNum":"   90","line":"    }"},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"    secp256k1_scalar_set_int(&zero, 0);","class":"lineNoCov","hits":"0",},
{"lineNum":"   93","line":"    secp256k1_gej_set_ge(&pt, key);","class":"lineNoCov","hits":"0",},
{"lineNum":"   94","line":"    secp256k1_ecmult(ctx, &pt, &pt, tweak, &zero);","class":"lineNoCov","hits":"0",},
{"lineNum":"   95","line":"    secp256k1_ge_set_gej(key, &pt);","class":"lineNoCov","hits":"0",},
{"lineNum":"   96","line":"    return 1;","class":"lineNoCov","hits":"0",},
{"lineNum":"   97","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   98","line":""},
{"lineNum":"   99","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "aead_fuzz_debug", "date" : "2023-08-09 11:47:50", "instrumented" : 57, "covered" : 0,};
var merged_data = [];
