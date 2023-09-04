var data = {lines:[
{"lineNum":"    1","line":"// Copyright (c) 2014 The Bitcoin Core developers"},
{"lineNum":"    2","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"    3","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"#ifndef BITCOIN_CRYPTO_COMMON_H"},
{"lineNum":"    6","line":"#define BITCOIN_CRYPTO_COMMON_H"},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"#if defined(HAVE_CONFIG_H)"},
{"lineNum":"    9","line":"#include \"../config/bitcoin-config.h\""},
{"lineNum":"   10","line":"#endif"},
{"lineNum":"   11","line":""},
{"lineNum":"   12","line":"#include <stdint.h>"},
{"lineNum":"   13","line":"#include <string.h>"},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"#include \"../compat/endian.h\""},
{"lineNum":"   16","line":""},
{"lineNum":"   17","line":"uint16_t static inline ReadLE16(const unsigned char* ptr)"},
{"lineNum":"   18","line":"{"},
{"lineNum":"   19","line":"    uint16_t x;"},
{"lineNum":"   20","line":"    memcpy((char*)&x, ptr, 2);"},
{"lineNum":"   21","line":"    return le16toh(x);"},
{"lineNum":"   22","line":"}"},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"uint32_t static inline ReadLE32(const unsigned char* ptr)"},
{"lineNum":"   25","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   26","line":"    uint32_t x;"},
{"lineNum":"   27","line":"    memcpy((char*)&x, ptr, 4);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   28","line":"    return le32toh(x);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   29","line":"}"},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"uint64_t static inline ReadLE64(const unsigned char* ptr)"},
{"lineNum":"   32","line":"{"},
{"lineNum":"   33","line":"    uint64_t x;"},
{"lineNum":"   34","line":"    memcpy((char*)&x, ptr, 8);"},
{"lineNum":"   35","line":"    return le64toh(x);"},
{"lineNum":"   36","line":"}"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"void static inline WriteLE16(unsigned char* ptr, uint16_t x)"},
{"lineNum":"   39","line":"{"},
{"lineNum":"   40","line":"    uint16_t v = htole16(x);"},
{"lineNum":"   41","line":"    memcpy(ptr, (char*)&v, 2);"},
{"lineNum":"   42","line":"}"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"void static inline WriteLE32(unsigned char* ptr, uint32_t x)"},
{"lineNum":"   45","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   46","line":"    uint32_t v = htole32(x);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   47","line":"    memcpy(ptr, (char*)&v, 4);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   48","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"void static inline WriteLE64(unsigned char* ptr, uint64_t x)"},
{"lineNum":"   51","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   52","line":"    uint64_t v = htole64(x);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   53","line":"    memcpy(ptr, (char*)&v, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   54","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"uint32_t static inline ReadBE32(const unsigned char* ptr)"},
{"lineNum":"   57","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   58","line":"    uint32_t x;"},
{"lineNum":"   59","line":"    memcpy((char*)&x, ptr, 4);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   60","line":"    return be32toh(x);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":"}"},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"uint64_t static inline ReadBE64(const unsigned char* ptr)"},
{"lineNum":"   64","line":"{"},
{"lineNum":"   65","line":"    uint64_t x;"},
{"lineNum":"   66","line":"    memcpy((char*)&x, ptr, 8);"},
{"lineNum":"   67","line":"    return be64toh(x);"},
{"lineNum":"   68","line":"}"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"void static inline WriteBE32(unsigned char* ptr, uint32_t x)"},
{"lineNum":"   71","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   72","line":"    uint32_t v = htobe32(x);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   73","line":"    memcpy(ptr, (char*)&v, 4);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   74","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"void static inline WriteBE64(unsigned char* ptr, uint64_t x)"},
{"lineNum":"   77","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   78","line":"    uint64_t v = htobe64(x);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   79","line":"    memcpy(ptr, (char*)&v, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   80","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"/** Return the smallest number n such that (x >> n) == 0 (or 64 if the highest bit in x is set. */"},
{"lineNum":"   83","line":"uint64_t static inline CountBits(uint64_t x)"},
{"lineNum":"   84","line":"{"},
{"lineNum":"   85","line":"#ifdef HAVE_DECL___BUILTIN_CLZL"},
{"lineNum":"   86","line":"    if (sizeof(unsigned long) >= sizeof(uint64_t)) {"},
{"lineNum":"   87","line":"        return x ? 8 * sizeof(unsigned long) - __builtin_clzl(x) : 0;"},
{"lineNum":"   88","line":"    }"},
{"lineNum":"   89","line":"#endif"},
{"lineNum":"   90","line":"#ifdef HAVE_DECL___BUILTIN_CLZLL"},
{"lineNum":"   91","line":"    if (sizeof(unsigned long long) >= sizeof(uint64_t)) {"},
{"lineNum":"   92","line":"        return x ? 8 * sizeof(unsigned long long) - __builtin_clzll(x) : 0;"},
{"lineNum":"   93","line":"    }"},
{"lineNum":"   94","line":"#endif"},
{"lineNum":"   95","line":"    int ret = 0;"},
{"lineNum":"   96","line":"    while (x) {"},
{"lineNum":"   97","line":"        x >>= 1;"},
{"lineNum":"   98","line":"        ++ret;"},
{"lineNum":"   99","line":"    }"},
{"lineNum":"  100","line":"    return ret;"},
{"lineNum":"  101","line":"}"},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"#endif // BITCOIN_CRYPTO_COMMON_H"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "mint_transaction_debug", "date" : "2023-08-28 11:26:56", "instrumented" : 22, "covered" : 0,};
var merged_data = [];
