var data = {lines:[
{"lineNum":"    1","line":"// Copyright (c) 2014 The Bitcoin Core developers"},
{"lineNum":"    2","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"    3","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"#include \"crypto/sha512.h\""},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"#include \"crypto/common.h\""},
{"lineNum":"    8","line":""},
{"lineNum":"    9","line":"#include <string.h>"},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"// Internal implementation code."},
{"lineNum":"   12","line":"namespace"},
{"lineNum":"   13","line":"{"},
{"lineNum":"   14","line":"/// Internal SHA-512 implementation."},
{"lineNum":"   15","line":"namespace sha512"},
{"lineNum":"   16","line":"{"},
{"lineNum":"   17","line":"uint64_t inline Ch(uint64_t x, uint64_t y, uint64_t z) { return z ^ (x & (y ^ z)); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   18","line":"uint64_t inline Maj(uint64_t x, uint64_t y, uint64_t z) { return (x & y) | (z & (x | y)); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   19","line":"uint64_t inline Sigma0(uint64_t x) { return (x >> 28 | x << 36) ^ (x >> 34 | x << 30) ^ (x >> 39 | x << 25); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   20","line":"uint64_t inline Sigma1(uint64_t x) { return (x >> 14 | x << 50) ^ (x >> 18 | x << 46) ^ (x >> 41 | x << 23); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   21","line":"uint64_t inline sigma0(uint64_t x) { return (x >> 1 | x << 63) ^ (x >> 8 | x << 56) ^ (x >> 7); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   22","line":"uint64_t inline sigma1(uint64_t x) { return (x >> 19 | x << 45) ^ (x >> 61 | x << 3) ^ (x >> 6); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"/** One round of SHA-512. */"},
{"lineNum":"   25","line":"void inline Round(uint64_t a, uint64_t b, uint64_t c, uint64_t& d, uint64_t e, uint64_t f, uint64_t g, uint64_t& h, uint64_t k, uint64_t w)"},
{"lineNum":"   26","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   27","line":"    uint64_t t1 = h + Sigma1(e) + Ch(e, f, g) + k + w;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   28","line":"    uint64_t t2 = Sigma0(a) + Maj(a, b, c);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   29","line":"    d += t1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   30","line":"    h = t1 + t2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   31","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"/** Initialize SHA-256 state. */"},
{"lineNum":"   34","line":"void inline Initialize(uint64_t* s)"},
{"lineNum":"   35","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   36","line":"    s[0] = 0x6a09e667f3bcc908ull;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   37","line":"    s[1] = 0xbb67ae8584caa73bull;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":"    s[2] = 0x3c6ef372fe94f82bull;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   39","line":"    s[3] = 0xa54ff53a5f1d36f1ull;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":"    s[4] = 0x510e527fade682d1ull;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   41","line":"    s[5] = 0x9b05688c2b3e6c1full;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   42","line":"    s[6] = 0x1f83d9abfb41bd6bull;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":"    s[7] = 0x5be0cd19137e2179ull;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   44","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"/** Perform one SHA-512 transformation, processing a 128-byte chunk. */"},
{"lineNum":"   47","line":"void Transform(uint64_t* s, const unsigned char* chunk)"},
{"lineNum":"   48","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   49","line":"    uint64_t a = s[0], b = s[1], c = s[2], d = s[3], e = s[4], f = s[5], g = s[6], h = s[7];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":"    uint64_t w0, w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12, w13, w14, w15;"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"    Round(a, b, c, d, e, f, g, h, 0x428a2f98d728ae22ull, w0 = ReadBE64(chunk + 0));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   53","line":"    Round(h, a, b, c, d, e, f, g, 0x7137449123ef65cdull, w1 = ReadBE64(chunk + 8));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   54","line":"    Round(g, h, a, b, c, d, e, f, 0xb5c0fbcfec4d3b2full, w2 = ReadBE64(chunk + 16));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   55","line":"    Round(f, g, h, a, b, c, d, e, 0xe9b5dba58189dbbcull, w3 = ReadBE64(chunk + 24));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   56","line":"    Round(e, f, g, h, a, b, c, d, 0x3956c25bf348b538ull, w4 = ReadBE64(chunk + 32));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   57","line":"    Round(d, e, f, g, h, a, b, c, 0x59f111f1b605d019ull, w5 = ReadBE64(chunk + 40));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   58","line":"    Round(c, d, e, f, g, h, a, b, 0x923f82a4af194f9bull, w6 = ReadBE64(chunk + 48));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   59","line":"    Round(b, c, d, e, f, g, h, a, 0xab1c5ed5da6d8118ull, w7 = ReadBE64(chunk + 56));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   60","line":"    Round(a, b, c, d, e, f, g, h, 0xd807aa98a3030242ull, w8 = ReadBE64(chunk + 64));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":"    Round(h, a, b, c, d, e, f, g, 0x12835b0145706fbeull, w9 = ReadBE64(chunk + 72));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   62","line":"    Round(g, h, a, b, c, d, e, f, 0x243185be4ee4b28cull, w10 = ReadBE64(chunk + 80));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   63","line":"    Round(f, g, h, a, b, c, d, e, 0x550c7dc3d5ffb4e2ull, w11 = ReadBE64(chunk + 88));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   64","line":"    Round(e, f, g, h, a, b, c, d, 0x72be5d74f27b896full, w12 = ReadBE64(chunk + 96));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   65","line":"    Round(d, e, f, g, h, a, b, c, 0x80deb1fe3b1696b1ull, w13 = ReadBE64(chunk + 104));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   66","line":"    Round(c, d, e, f, g, h, a, b, 0x9bdc06a725c71235ull, w14 = ReadBE64(chunk + 112));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   67","line":"    Round(b, c, d, e, f, g, h, a, 0xc19bf174cf692694ull, w15 = ReadBE64(chunk + 120));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"    Round(a, b, c, d, e, f, g, h, 0xe49b69c19ef14ad2ull, w0 += sigma1(w14) + w9 + sigma0(w1));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   70","line":"    Round(h, a, b, c, d, e, f, g, 0xefbe4786384f25e3ull, w1 += sigma1(w15) + w10 + sigma0(w2));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   71","line":"    Round(g, h, a, b, c, d, e, f, 0x0fc19dc68b8cd5b5ull, w2 += sigma1(w0) + w11 + sigma0(w3));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   72","line":"    Round(f, g, h, a, b, c, d, e, 0x240ca1cc77ac9c65ull, w3 += sigma1(w1) + w12 + sigma0(w4));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   73","line":"    Round(e, f, g, h, a, b, c, d, 0x2de92c6f592b0275ull, w4 += sigma1(w2) + w13 + sigma0(w5));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   74","line":"    Round(d, e, f, g, h, a, b, c, 0x4a7484aa6ea6e483ull, w5 += sigma1(w3) + w14 + sigma0(w6));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   75","line":"    Round(c, d, e, f, g, h, a, b, 0x5cb0a9dcbd41fbd4ull, w6 += sigma1(w4) + w15 + sigma0(w7));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   76","line":"    Round(b, c, d, e, f, g, h, a, 0x76f988da831153b5ull, w7 += sigma1(w5) + w0 + sigma0(w8));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":"    Round(a, b, c, d, e, f, g, h, 0x983e5152ee66dfabull, w8 += sigma1(w6) + w1 + sigma0(w9));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   78","line":"    Round(h, a, b, c, d, e, f, g, 0xa831c66d2db43210ull, w9 += sigma1(w7) + w2 + sigma0(w10));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   79","line":"    Round(g, h, a, b, c, d, e, f, 0xb00327c898fb213full, w10 += sigma1(w8) + w3 + sigma0(w11));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   80","line":"    Round(f, g, h, a, b, c, d, e, 0xbf597fc7beef0ee4ull, w11 += sigma1(w9) + w4 + sigma0(w12));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   81","line":"    Round(e, f, g, h, a, b, c, d, 0xc6e00bf33da88fc2ull, w12 += sigma1(w10) + w5 + sigma0(w13));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   82","line":"    Round(d, e, f, g, h, a, b, c, 0xd5a79147930aa725ull, w13 += sigma1(w11) + w6 + sigma0(w14));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   83","line":"    Round(c, d, e, f, g, h, a, b, 0x06ca6351e003826full, w14 += sigma1(w12) + w7 + sigma0(w15));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   84","line":"    Round(b, c, d, e, f, g, h, a, 0x142929670a0e6e70ull, w15 += sigma1(w13) + w8 + sigma0(w0));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"    Round(a, b, c, d, e, f, g, h, 0x27b70a8546d22ffcull, w0 += sigma1(w14) + w9 + sigma0(w1));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   87","line":"    Round(h, a, b, c, d, e, f, g, 0x2e1b21385c26c926ull, w1 += sigma1(w15) + w10 + sigma0(w2));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   88","line":"    Round(g, h, a, b, c, d, e, f, 0x4d2c6dfc5ac42aedull, w2 += sigma1(w0) + w11 + sigma0(w3));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   89","line":"    Round(f, g, h, a, b, c, d, e, 0x53380d139d95b3dfull, w3 += sigma1(w1) + w12 + sigma0(w4));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   90","line":"    Round(e, f, g, h, a, b, c, d, 0x650a73548baf63deull, w4 += sigma1(w2) + w13 + sigma0(w5));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   91","line":"    Round(d, e, f, g, h, a, b, c, 0x766a0abb3c77b2a8ull, w5 += sigma1(w3) + w14 + sigma0(w6));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   92","line":"    Round(c, d, e, f, g, h, a, b, 0x81c2c92e47edaee6ull, w6 += sigma1(w4) + w15 + sigma0(w7));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   93","line":"    Round(b, c, d, e, f, g, h, a, 0x92722c851482353bull, w7 += sigma1(w5) + w0 + sigma0(w8));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   94","line":"    Round(a, b, c, d, e, f, g, h, 0xa2bfe8a14cf10364ull, w8 += sigma1(w6) + w1 + sigma0(w9));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   95","line":"    Round(h, a, b, c, d, e, f, g, 0xa81a664bbc423001ull, w9 += sigma1(w7) + w2 + sigma0(w10));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   96","line":"    Round(g, h, a, b, c, d, e, f, 0xc24b8b70d0f89791ull, w10 += sigma1(w8) + w3 + sigma0(w11));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   97","line":"    Round(f, g, h, a, b, c, d, e, 0xc76c51a30654be30ull, w11 += sigma1(w9) + w4 + sigma0(w12));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   98","line":"    Round(e, f, g, h, a, b, c, d, 0xd192e819d6ef5218ull, w12 += sigma1(w10) + w5 + sigma0(w13));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   99","line":"    Round(d, e, f, g, h, a, b, c, 0xd69906245565a910ull, w13 += sigma1(w11) + w6 + sigma0(w14));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  100","line":"    Round(c, d, e, f, g, h, a, b, 0xf40e35855771202aull, w14 += sigma1(w12) + w7 + sigma0(w15));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  101","line":"    Round(b, c, d, e, f, g, h, a, 0x106aa07032bbd1b8ull, w15 += sigma1(w13) + w8 + sigma0(w0));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"    Round(a, b, c, d, e, f, g, h, 0x19a4c116b8d2d0c8ull, w0 += sigma1(w14) + w9 + sigma0(w1));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  104","line":"    Round(h, a, b, c, d, e, f, g, 0x1e376c085141ab53ull, w1 += sigma1(w15) + w10 + sigma0(w2));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  105","line":"    Round(g, h, a, b, c, d, e, f, 0x2748774cdf8eeb99ull, w2 += sigma1(w0) + w11 + sigma0(w3));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  106","line":"    Round(f, g, h, a, b, c, d, e, 0x34b0bcb5e19b48a8ull, w3 += sigma1(w1) + w12 + sigma0(w4));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  107","line":"    Round(e, f, g, h, a, b, c, d, 0x391c0cb3c5c95a63ull, w4 += sigma1(w2) + w13 + sigma0(w5));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  108","line":"    Round(d, e, f, g, h, a, b, c, 0x4ed8aa4ae3418acbull, w5 += sigma1(w3) + w14 + sigma0(w6));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  109","line":"    Round(c, d, e, f, g, h, a, b, 0x5b9cca4f7763e373ull, w6 += sigma1(w4) + w15 + sigma0(w7));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  110","line":"    Round(b, c, d, e, f, g, h, a, 0x682e6ff3d6b2b8a3ull, w7 += sigma1(w5) + w0 + sigma0(w8));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  111","line":"    Round(a, b, c, d, e, f, g, h, 0x748f82ee5defb2fcull, w8 += sigma1(w6) + w1 + sigma0(w9));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  112","line":"    Round(h, a, b, c, d, e, f, g, 0x78a5636f43172f60ull, w9 += sigma1(w7) + w2 + sigma0(w10));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  113","line":"    Round(g, h, a, b, c, d, e, f, 0x84c87814a1f0ab72ull, w10 += sigma1(w8) + w3 + sigma0(w11));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  114","line":"    Round(f, g, h, a, b, c, d, e, 0x8cc702081a6439ecull, w11 += sigma1(w9) + w4 + sigma0(w12));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  115","line":"    Round(e, f, g, h, a, b, c, d, 0x90befffa23631e28ull, w12 += sigma1(w10) + w5 + sigma0(w13));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  116","line":"    Round(d, e, f, g, h, a, b, c, 0xa4506cebde82bde9ull, w13 += sigma1(w11) + w6 + sigma0(w14));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  117","line":"    Round(c, d, e, f, g, h, a, b, 0xbef9a3f7b2c67915ull, w14 += sigma1(w12) + w7 + sigma0(w15));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  118","line":"    Round(b, c, d, e, f, g, h, a, 0xc67178f2e372532bull, w15 += sigma1(w13) + w8 + sigma0(w0));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  119","line":""},
{"lineNum":"  120","line":"    Round(a, b, c, d, e, f, g, h, 0xca273eceea26619cull, w0 += sigma1(w14) + w9 + sigma0(w1));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  121","line":"    Round(h, a, b, c, d, e, f, g, 0xd186b8c721c0c207ull, w1 += sigma1(w15) + w10 + sigma0(w2));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  122","line":"    Round(g, h, a, b, c, d, e, f, 0xeada7dd6cde0eb1eull, w2 += sigma1(w0) + w11 + sigma0(w3));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  123","line":"    Round(f, g, h, a, b, c, d, e, 0xf57d4f7fee6ed178ull, w3 += sigma1(w1) + w12 + sigma0(w4));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  124","line":"    Round(e, f, g, h, a, b, c, d, 0x06f067aa72176fbaull, w4 += sigma1(w2) + w13 + sigma0(w5));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  125","line":"    Round(d, e, f, g, h, a, b, c, 0x0a637dc5a2c898a6ull, w5 += sigma1(w3) + w14 + sigma0(w6));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  126","line":"    Round(c, d, e, f, g, h, a, b, 0x113f9804bef90daeull, w6 += sigma1(w4) + w15 + sigma0(w7));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  127","line":"    Round(b, c, d, e, f, g, h, a, 0x1b710b35131c471bull, w7 += sigma1(w5) + w0 + sigma0(w8));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  128","line":"    Round(a, b, c, d, e, f, g, h, 0x28db77f523047d84ull, w8 += sigma1(w6) + w1 + sigma0(w9));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  129","line":"    Round(h, a, b, c, d, e, f, g, 0x32caab7b40c72493ull, w9 += sigma1(w7) + w2 + sigma0(w10));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  130","line":"    Round(g, h, a, b, c, d, e, f, 0x3c9ebe0a15c9bebcull, w10 += sigma1(w8) + w3 + sigma0(w11));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  131","line":"    Round(f, g, h, a, b, c, d, e, 0x431d67c49c100d4cull, w11 += sigma1(w9) + w4 + sigma0(w12));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  132","line":"    Round(e, f, g, h, a, b, c, d, 0x4cc5d4becb3e42b6ull, w12 += sigma1(w10) + w5 + sigma0(w13));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  133","line":"    Round(d, e, f, g, h, a, b, c, 0x597f299cfc657e2aull, w13 += sigma1(w11) + w6 + sigma0(w14));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  134","line":"    Round(c, d, e, f, g, h, a, b, 0x5fcb6fab3ad6faecull, w14 + sigma1(w12) + w7 + sigma0(w15));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  135","line":"    Round(b, c, d, e, f, g, h, a, 0x6c44198c4a475817ull, w15 + sigma1(w13) + w8 + sigma0(w0));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  136","line":""},
{"lineNum":"  137","line":"    s[0] += a;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  138","line":"    s[1] += b;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  139","line":"    s[2] += c;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  140","line":"    s[3] += d;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  141","line":"    s[4] += e;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  142","line":"    s[5] += f;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  143","line":"    s[6] += g;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  144","line":"    s[7] += h;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  145","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  146","line":""},
{"lineNum":"  147","line":"} // namespace sha512"},
{"lineNum":"  148","line":""},
{"lineNum":"  149","line":"} // namespace"},
{"lineNum":"  150","line":""},
{"lineNum":"  151","line":""},
{"lineNum":"  152","line":"////// SHA-512"},
{"lineNum":"  153","line":""},
{"lineNum":"  154","line":"CSHA512::CSHA512() : bytes(0)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  155","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  156","line":"    sha512::Initialize(s);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  157","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  158","line":""},
{"lineNum":"  159","line":"CSHA512& CSHA512::Write(const unsigned char* data, size_t len)"},
{"lineNum":"  160","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  161","line":"    const unsigned char* end = data + len;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  162","line":"    size_t bufsize = bytes % 128;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  163","line":"    if (bufsize && bufsize + len >= 128) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  164","line":"        // Fill the buffer, and process it."},
{"lineNum":"  165","line":"        memcpy(buf + bufsize, data, 128 - bufsize);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  166","line":"        bytes += 128 - bufsize;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  167","line":"        data += 128 - bufsize;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  168","line":"        sha512::Transform(s, buf);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  169","line":"        bufsize = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  170","line":"    }"},
{"lineNum":"  171","line":"    while (end >= data + 128) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  172","line":"        // Process full chunks directly from the source."},
{"lineNum":"  173","line":"        sha512::Transform(s, data);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  174","line":"        data += 128;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  175","line":"        bytes += 128;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  176","line":"    }"},
{"lineNum":"  177","line":"    if (end > data) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  178","line":"        // Fill the buffer with what remains."},
{"lineNum":"  179","line":"        memcpy(buf + bufsize, data, end - data);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  180","line":"        bytes += end - data;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  181","line":"    }"},
{"lineNum":"  182","line":"    return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  183","line":"}"},
{"lineNum":"  184","line":""},
{"lineNum":"  185","line":"void CSHA512::Finalize(unsigned char hash[OUTPUT_SIZE])"},
{"lineNum":"  186","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  187","line":"    static const unsigned char pad[128] = {0x80};"},
{"lineNum":"  188","line":"    unsigned char sizedesc[16] = {0x00};","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  189","line":"    WriteBE64(sizedesc + 8, bytes << 3);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  190","line":"    Write(pad, 1 + ((239 - (bytes % 128)) % 128));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  191","line":"    Write(sizedesc, 16);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  192","line":"    WriteBE64(hash, s[0]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  193","line":"    WriteBE64(hash + 8, s[1]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  194","line":"    WriteBE64(hash + 16, s[2]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  195","line":"    WriteBE64(hash + 24, s[3]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  196","line":"    WriteBE64(hash + 32, s[4]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  197","line":"    WriteBE64(hash + 40, s[5]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  198","line":"    WriteBE64(hash + 48, s[6]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  199","line":"    WriteBE64(hash + 56, s[7]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  200","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  201","line":""},
{"lineNum":"  202","line":"CSHA512& CSHA512::Reset()"},
{"lineNum":"  203","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  204","line":"    bytes = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  205","line":"    sha512::Initialize(s);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  206","line":"    return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  207","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "grootle_fuzz_debug", "date" : "2023-08-17 10:25:18", "instrumented" : 152, "covered" : 0,};
var merged_data = [];
