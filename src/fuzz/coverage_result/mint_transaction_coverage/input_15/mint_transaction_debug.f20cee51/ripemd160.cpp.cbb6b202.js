var data = {lines:[
{"lineNum":"    1","line":"// Copyright (c) 2014 The Bitcoin Core developers"},
{"lineNum":"    2","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"    3","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"#include \"crypto/ripemd160.h\""},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"#include \"crypto/common.h\""},
{"lineNum":"    8","line":""},
{"lineNum":"    9","line":"#include <string.h>"},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"// Internal implementation code."},
{"lineNum":"   12","line":"namespace"},
{"lineNum":"   13","line":"{"},
{"lineNum":"   14","line":"/// Internal RIPEMD-160 implementation."},
{"lineNum":"   15","line":"namespace ripemd160"},
{"lineNum":"   16","line":"{"},
{"lineNum":"   17","line":"uint32_t inline f1(uint32_t x, uint32_t y, uint32_t z) { return x ^ y ^ z; }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   18","line":"uint32_t inline f2(uint32_t x, uint32_t y, uint32_t z) { return (x & y) | (~x & z); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   19","line":"uint32_t inline f3(uint32_t x, uint32_t y, uint32_t z) { return (x | ~y) ^ z; }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   20","line":"uint32_t inline f4(uint32_t x, uint32_t y, uint32_t z) { return (x & z) | (y & ~z); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   21","line":"uint32_t inline f5(uint32_t x, uint32_t y, uint32_t z) { return x ^ (y | ~z); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"/** Initialize RIPEMD-160 state. */"},
{"lineNum":"   24","line":"void inline Initialize(uint32_t* s)"},
{"lineNum":"   25","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   26","line":"    s[0] = 0x67452301ul;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   27","line":"    s[1] = 0xEFCDAB89ul;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   28","line":"    s[2] = 0x98BADCFEul;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   29","line":"    s[3] = 0x10325476ul;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   30","line":"    s[4] = 0xC3D2E1F0ul;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   31","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"uint32_t inline rol(uint32_t x, int i) { return (x << i) | (x >> (32 - i)); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"void inline Round(uint32_t& a, uint32_t b, uint32_t& c, uint32_t d, uint32_t e, uint32_t f, uint32_t x, uint32_t k, int r)"},
{"lineNum":"   36","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   37","line":"    a = rol(a + f + x + k, r) + e;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":"    c = rol(c, 10);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   39","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"void inline R11(uint32_t& a, uint32_t b, uint32_t& c, uint32_t d, uint32_t e, uint32_t x, int r) { Round(a, b, c, d, e, f1(b, c, d), x, 0, r); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   42","line":"void inline R21(uint32_t& a, uint32_t b, uint32_t& c, uint32_t d, uint32_t e, uint32_t x, int r) { Round(a, b, c, d, e, f2(b, c, d), x, 0x5A827999ul, r); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   43","line":"void inline R31(uint32_t& a, uint32_t b, uint32_t& c, uint32_t d, uint32_t e, uint32_t x, int r) { Round(a, b, c, d, e, f3(b, c, d), x, 0x6ED9EBA1ul, r); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   44","line":"void inline R41(uint32_t& a, uint32_t b, uint32_t& c, uint32_t d, uint32_t e, uint32_t x, int r) { Round(a, b, c, d, e, f4(b, c, d), x, 0x8F1BBCDCul, r); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   45","line":"void inline R51(uint32_t& a, uint32_t b, uint32_t& c, uint32_t d, uint32_t e, uint32_t x, int r) { Round(a, b, c, d, e, f5(b, c, d), x, 0xA953FD4Eul, r); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"void inline R12(uint32_t& a, uint32_t b, uint32_t& c, uint32_t d, uint32_t e, uint32_t x, int r) { Round(a, b, c, d, e, f5(b, c, d), x, 0x50A28BE6ul, r); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   48","line":"void inline R22(uint32_t& a, uint32_t b, uint32_t& c, uint32_t d, uint32_t e, uint32_t x, int r) { Round(a, b, c, d, e, f4(b, c, d), x, 0x5C4DD124ul, r); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   49","line":"void inline R32(uint32_t& a, uint32_t b, uint32_t& c, uint32_t d, uint32_t e, uint32_t x, int r) { Round(a, b, c, d, e, f3(b, c, d), x, 0x6D703EF3ul, r); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   50","line":"void inline R42(uint32_t& a, uint32_t b, uint32_t& c, uint32_t d, uint32_t e, uint32_t x, int r) { Round(a, b, c, d, e, f2(b, c, d), x, 0x7A6D76E9ul, r); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   51","line":"void inline R52(uint32_t& a, uint32_t b, uint32_t& c, uint32_t d, uint32_t e, uint32_t x, int r) { Round(a, b, c, d, e, f1(b, c, d), x, 0, r); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"/** Perform a RIPEMD-160 transformation, processing a 64-byte chunk. */"},
{"lineNum":"   54","line":"void Transform(uint32_t* s, const unsigned char* chunk)"},
{"lineNum":"   55","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   56","line":"    uint32_t a1 = s[0], b1 = s[1], c1 = s[2], d1 = s[3], e1 = s[4];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   57","line":"    uint32_t a2 = a1, b2 = b1, c2 = c1, d2 = d1, e2 = e1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   58","line":"    uint32_t w0 = ReadLE32(chunk + 0), w1 = ReadLE32(chunk + 4), w2 = ReadLE32(chunk + 8), w3 = ReadLE32(chunk + 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   59","line":"    uint32_t w4 = ReadLE32(chunk + 16), w5 = ReadLE32(chunk + 20), w6 = ReadLE32(chunk + 24), w7 = ReadLE32(chunk + 28);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   60","line":"    uint32_t w8 = ReadLE32(chunk + 32), w9 = ReadLE32(chunk + 36), w10 = ReadLE32(chunk + 40), w11 = ReadLE32(chunk + 44);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":"    uint32_t w12 = ReadLE32(chunk + 48), w13 = ReadLE32(chunk + 52), w14 = ReadLE32(chunk + 56), w15 = ReadLE32(chunk + 60);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"    R11(a1, b1, c1, d1, e1, w0, 11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   64","line":"    R12(a2, b2, c2, d2, e2, w5, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   65","line":"    R11(e1, a1, b1, c1, d1, w1, 14);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   66","line":"    R12(e2, a2, b2, c2, d2, w14, 9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   67","line":"    R11(d1, e1, a1, b1, c1, w2, 15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   68","line":"    R12(d2, e2, a2, b2, c2, w7, 9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   69","line":"    R11(c1, d1, e1, a1, b1, w3, 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   70","line":"    R12(c2, d2, e2, a2, b2, w0, 11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   71","line":"    R11(b1, c1, d1, e1, a1, w4, 5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   72","line":"    R12(b2, c2, d2, e2, a2, w9, 13);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   73","line":"    R11(a1, b1, c1, d1, e1, w5, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   74","line":"    R12(a2, b2, c2, d2, e2, w2, 15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   75","line":"    R11(e1, a1, b1, c1, d1, w6, 7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   76","line":"    R12(e2, a2, b2, c2, d2, w11, 15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":"    R11(d1, e1, a1, b1, c1, w7, 9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   78","line":"    R12(d2, e2, a2, b2, c2, w4, 5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   79","line":"    R11(c1, d1, e1, a1, b1, w8, 11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   80","line":"    R12(c2, d2, e2, a2, b2, w13, 7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   81","line":"    R11(b1, c1, d1, e1, a1, w9, 13);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   82","line":"    R12(b2, c2, d2, e2, a2, w6, 7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   83","line":"    R11(a1, b1, c1, d1, e1, w10, 14);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   84","line":"    R12(a2, b2, c2, d2, e2, w15, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   85","line":"    R11(e1, a1, b1, c1, d1, w11, 15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   86","line":"    R12(e2, a2, b2, c2, d2, w8, 11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   87","line":"    R11(d1, e1, a1, b1, c1, w12, 6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   88","line":"    R12(d2, e2, a2, b2, c2, w1, 14);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   89","line":"    R11(c1, d1, e1, a1, b1, w13, 7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   90","line":"    R12(c2, d2, e2, a2, b2, w10, 14);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   91","line":"    R11(b1, c1, d1, e1, a1, w14, 9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   92","line":"    R12(b2, c2, d2, e2, a2, w3, 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   93","line":"    R11(a1, b1, c1, d1, e1, w15, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   94","line":"    R12(a2, b2, c2, d2, e2, w12, 6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   95","line":""},
{"lineNum":"   96","line":"    R21(e1, a1, b1, c1, d1, w7, 7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   97","line":"    R22(e2, a2, b2, c2, d2, w6, 9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   98","line":"    R21(d1, e1, a1, b1, c1, w4, 6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   99","line":"    R22(d2, e2, a2, b2, c2, w11, 13);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  100","line":"    R21(c1, d1, e1, a1, b1, w13, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  101","line":"    R22(c2, d2, e2, a2, b2, w3, 15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  102","line":"    R21(b1, c1, d1, e1, a1, w1, 13);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  103","line":"    R22(b2, c2, d2, e2, a2, w7, 7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  104","line":"    R21(a1, b1, c1, d1, e1, w10, 11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  105","line":"    R22(a2, b2, c2, d2, e2, w0, 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  106","line":"    R21(e1, a1, b1, c1, d1, w6, 9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  107","line":"    R22(e2, a2, b2, c2, d2, w13, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  108","line":"    R21(d1, e1, a1, b1, c1, w15, 7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  109","line":"    R22(d2, e2, a2, b2, c2, w5, 9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  110","line":"    R21(c1, d1, e1, a1, b1, w3, 15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  111","line":"    R22(c2, d2, e2, a2, b2, w10, 11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  112","line":"    R21(b1, c1, d1, e1, a1, w12, 7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  113","line":"    R22(b2, c2, d2, e2, a2, w14, 7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  114","line":"    R21(a1, b1, c1, d1, e1, w0, 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  115","line":"    R22(a2, b2, c2, d2, e2, w15, 7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  116","line":"    R21(e1, a1, b1, c1, d1, w9, 15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  117","line":"    R22(e2, a2, b2, c2, d2, w8, 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  118","line":"    R21(d1, e1, a1, b1, c1, w5, 9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  119","line":"    R22(d2, e2, a2, b2, c2, w12, 7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  120","line":"    R21(c1, d1, e1, a1, b1, w2, 11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  121","line":"    R22(c2, d2, e2, a2, b2, w4, 6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  122","line":"    R21(b1, c1, d1, e1, a1, w14, 7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  123","line":"    R22(b2, c2, d2, e2, a2, w9, 15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  124","line":"    R21(a1, b1, c1, d1, e1, w11, 13);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  125","line":"    R22(a2, b2, c2, d2, e2, w1, 13);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  126","line":"    R21(e1, a1, b1, c1, d1, w8, 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  127","line":"    R22(e2, a2, b2, c2, d2, w2, 11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  128","line":""},
{"lineNum":"  129","line":"    R31(d1, e1, a1, b1, c1, w3, 11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  130","line":"    R32(d2, e2, a2, b2, c2, w15, 9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  131","line":"    R31(c1, d1, e1, a1, b1, w10, 13);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  132","line":"    R32(c2, d2, e2, a2, b2, w5, 7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  133","line":"    R31(b1, c1, d1, e1, a1, w14, 6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  134","line":"    R32(b2, c2, d2, e2, a2, w1, 15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  135","line":"    R31(a1, b1, c1, d1, e1, w4, 7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  136","line":"    R32(a2, b2, c2, d2, e2, w3, 11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  137","line":"    R31(e1, a1, b1, c1, d1, w9, 14);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  138","line":"    R32(e2, a2, b2, c2, d2, w7, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  139","line":"    R31(d1, e1, a1, b1, c1, w15, 9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  140","line":"    R32(d2, e2, a2, b2, c2, w14, 6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  141","line":"    R31(c1, d1, e1, a1, b1, w8, 13);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  142","line":"    R32(c2, d2, e2, a2, b2, w6, 6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  143","line":"    R31(b1, c1, d1, e1, a1, w1, 15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  144","line":"    R32(b2, c2, d2, e2, a2, w9, 14);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  145","line":"    R31(a1, b1, c1, d1, e1, w2, 14);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  146","line":"    R32(a2, b2, c2, d2, e2, w11, 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  147","line":"    R31(e1, a1, b1, c1, d1, w7, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  148","line":"    R32(e2, a2, b2, c2, d2, w8, 13);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  149","line":"    R31(d1, e1, a1, b1, c1, w0, 13);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  150","line":"    R32(d2, e2, a2, b2, c2, w12, 5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  151","line":"    R31(c1, d1, e1, a1, b1, w6, 6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  152","line":"    R32(c2, d2, e2, a2, b2, w2, 14);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  153","line":"    R31(b1, c1, d1, e1, a1, w13, 5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  154","line":"    R32(b2, c2, d2, e2, a2, w10, 13);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  155","line":"    R31(a1, b1, c1, d1, e1, w11, 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  156","line":"    R32(a2, b2, c2, d2, e2, w0, 13);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  157","line":"    R31(e1, a1, b1, c1, d1, w5, 7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  158","line":"    R32(e2, a2, b2, c2, d2, w4, 7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  159","line":"    R31(d1, e1, a1, b1, c1, w12, 5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  160","line":"    R32(d2, e2, a2, b2, c2, w13, 5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  161","line":""},
{"lineNum":"  162","line":"    R41(c1, d1, e1, a1, b1, w1, 11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  163","line":"    R42(c2, d2, e2, a2, b2, w8, 15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  164","line":"    R41(b1, c1, d1, e1, a1, w9, 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  165","line":"    R42(b2, c2, d2, e2, a2, w6, 5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  166","line":"    R41(a1, b1, c1, d1, e1, w11, 14);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  167","line":"    R42(a2, b2, c2, d2, e2, w4, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  168","line":"    R41(e1, a1, b1, c1, d1, w10, 15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  169","line":"    R42(e2, a2, b2, c2, d2, w1, 11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  170","line":"    R41(d1, e1, a1, b1, c1, w0, 14);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  171","line":"    R42(d2, e2, a2, b2, c2, w3, 14);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  172","line":"    R41(c1, d1, e1, a1, b1, w8, 15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  173","line":"    R42(c2, d2, e2, a2, b2, w11, 14);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  174","line":"    R41(b1, c1, d1, e1, a1, w12, 9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  175","line":"    R42(b2, c2, d2, e2, a2, w15, 6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  176","line":"    R41(a1, b1, c1, d1, e1, w4, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  177","line":"    R42(a2, b2, c2, d2, e2, w0, 14);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  178","line":"    R41(e1, a1, b1, c1, d1, w13, 9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  179","line":"    R42(e2, a2, b2, c2, d2, w5, 6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  180","line":"    R41(d1, e1, a1, b1, c1, w3, 14);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  181","line":"    R42(d2, e2, a2, b2, c2, w12, 9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  182","line":"    R41(c1, d1, e1, a1, b1, w7, 5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  183","line":"    R42(c2, d2, e2, a2, b2, w2, 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  184","line":"    R41(b1, c1, d1, e1, a1, w15, 6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  185","line":"    R42(b2, c2, d2, e2, a2, w13, 9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  186","line":"    R41(a1, b1, c1, d1, e1, w14, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  187","line":"    R42(a2, b2, c2, d2, e2, w9, 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  188","line":"    R41(e1, a1, b1, c1, d1, w5, 6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  189","line":"    R42(e2, a2, b2, c2, d2, w7, 5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  190","line":"    R41(d1, e1, a1, b1, c1, w6, 5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  191","line":"    R42(d2, e2, a2, b2, c2, w10, 15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  192","line":"    R41(c1, d1, e1, a1, b1, w2, 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  193","line":"    R42(c2, d2, e2, a2, b2, w14, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  194","line":""},
{"lineNum":"  195","line":"    R51(b1, c1, d1, e1, a1, w4, 9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  196","line":"    R52(b2, c2, d2, e2, a2, w12, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  197","line":"    R51(a1, b1, c1, d1, e1, w0, 15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  198","line":"    R52(a2, b2, c2, d2, e2, w15, 5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  199","line":"    R51(e1, a1, b1, c1, d1, w5, 5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  200","line":"    R52(e2, a2, b2, c2, d2, w10, 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  201","line":"    R51(d1, e1, a1, b1, c1, w9, 11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  202","line":"    R52(d2, e2, a2, b2, c2, w4, 9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  203","line":"    R51(c1, d1, e1, a1, b1, w7, 6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  204","line":"    R52(c2, d2, e2, a2, b2, w1, 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  205","line":"    R51(b1, c1, d1, e1, a1, w12, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  206","line":"    R52(b2, c2, d2, e2, a2, w5, 5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  207","line":"    R51(a1, b1, c1, d1, e1, w2, 13);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  208","line":"    R52(a2, b2, c2, d2, e2, w8, 14);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  209","line":"    R51(e1, a1, b1, c1, d1, w10, 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  210","line":"    R52(e2, a2, b2, c2, d2, w7, 6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  211","line":"    R51(d1, e1, a1, b1, c1, w14, 5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  212","line":"    R52(d2, e2, a2, b2, c2, w6, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  213","line":"    R51(c1, d1, e1, a1, b1, w1, 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  214","line":"    R52(c2, d2, e2, a2, b2, w2, 13);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  215","line":"    R51(b1, c1, d1, e1, a1, w3, 13);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  216","line":"    R52(b2, c2, d2, e2, a2, w13, 6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  217","line":"    R51(a1, b1, c1, d1, e1, w8, 14);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  218","line":"    R52(a2, b2, c2, d2, e2, w14, 5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  219","line":"    R51(e1, a1, b1, c1, d1, w11, 11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  220","line":"    R52(e2, a2, b2, c2, d2, w0, 15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  221","line":"    R51(d1, e1, a1, b1, c1, w6, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  222","line":"    R52(d2, e2, a2, b2, c2, w3, 13);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  223","line":"    R51(c1, d1, e1, a1, b1, w15, 5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  224","line":"    R52(c2, d2, e2, a2, b2, w9, 11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  225","line":"    R51(b1, c1, d1, e1, a1, w13, 6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  226","line":"    R52(b2, c2, d2, e2, a2, w11, 11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  227","line":""},
{"lineNum":"  228","line":"    uint32_t t = s[0];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  229","line":"    s[0] = s[1] + c1 + d2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  230","line":"    s[1] = s[2] + d1 + e2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  231","line":"    s[2] = s[3] + e1 + a2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  232","line":"    s[3] = s[4] + a1 + b2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  233","line":"    s[4] = t + b1 + c2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  234","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  235","line":""},
{"lineNum":"  236","line":"} // namespace ripemd160"},
{"lineNum":"  237","line":""},
{"lineNum":"  238","line":"} // namespace"},
{"lineNum":"  239","line":""},
{"lineNum":"  240","line":"////// RIPEMD160"},
{"lineNum":"  241","line":""},
{"lineNum":"  242","line":"CRIPEMD160::CRIPEMD160() : bytes(0)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  243","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  244","line":"    ripemd160::Initialize(s);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  245","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  246","line":""},
{"lineNum":"  247","line":"CRIPEMD160& CRIPEMD160::Write(const unsigned char* data, size_t len)"},
{"lineNum":"  248","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  249","line":"    const unsigned char* end = data + len;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  250","line":"    size_t bufsize = bytes % 64;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  251","line":"    if (bufsize && bufsize + len >= 64) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  252","line":"        // Fill the buffer, and process it."},
{"lineNum":"  253","line":"        memcpy(buf + bufsize, data, 64 - bufsize);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  254","line":"        bytes += 64 - bufsize;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  255","line":"        data += 64 - bufsize;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  256","line":"        ripemd160::Transform(s, buf);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  257","line":"        bufsize = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  258","line":"    }"},
{"lineNum":"  259","line":"    while (end >= data + 64) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  260","line":"        // Process full chunks directly from the source."},
{"lineNum":"  261","line":"        ripemd160::Transform(s, data);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  262","line":"        bytes += 64;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  263","line":"        data += 64;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  264","line":"    }"},
{"lineNum":"  265","line":"    if (end > data) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  266","line":"        // Fill the buffer with what remains."},
{"lineNum":"  267","line":"        memcpy(buf + bufsize, data, end - data);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  268","line":"        bytes += end - data;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  269","line":"    }"},
{"lineNum":"  270","line":"    return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  271","line":"}"},
{"lineNum":"  272","line":""},
{"lineNum":"  273","line":"void CRIPEMD160::Finalize(unsigned char hash[OUTPUT_SIZE])"},
{"lineNum":"  274","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  275","line":"    static const unsigned char pad[64] = {0x80};"},
{"lineNum":"  276","line":"    unsigned char sizedesc[8];"},
{"lineNum":"  277","line":"    WriteLE64(sizedesc, bytes << 3);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  278","line":"    Write(pad, 1 + ((119 - (bytes % 64)) % 64));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  279","line":"    Write(sizedesc, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  280","line":"    WriteLE32(hash, s[0]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  281","line":"    WriteLE32(hash + 4, s[1]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  282","line":"    WriteLE32(hash + 8, s[2]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  283","line":"    WriteLE32(hash + 12, s[3]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  284","line":"    WriteLE32(hash + 16, s[4]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  285","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  286","line":""},
{"lineNum":"  287","line":"CRIPEMD160& CRIPEMD160::Reset()"},
{"lineNum":"  288","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  289","line":"    bytes = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  290","line":"    ripemd160::Initialize(s);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  291","line":"    return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  292","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "mint_transaction_debug", "date" : "2023-08-28 11:35:24", "instrumented" : 236, "covered" : 0,};
var merged_data = [];
