var data = {lines:[
{"lineNum":"    1","line":"// Copyright (c) 2014 The Bitcoin Core developers"},
{"lineNum":"    2","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"    3","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"#include \"crypto/sha256.h\""},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"#include \"crypto/common.h\""},
{"lineNum":"    8","line":""},
{"lineNum":"    9","line":"#include <string.h>"},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"// Internal implementation code."},
{"lineNum":"   12","line":"namespace"},
{"lineNum":"   13","line":"{"},
{"lineNum":"   14","line":"/// Internal SHA-256 implementation."},
{"lineNum":"   15","line":"namespace sha256"},
{"lineNum":"   16","line":"{"},
{"lineNum":"   17","line":"uint32_t inline Ch(uint32_t x, uint32_t y, uint32_t z) { return z ^ (x & (y ^ z)); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   18","line":"uint32_t inline Maj(uint32_t x, uint32_t y, uint32_t z) { return (x & y) | (z & (x | y)); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   19","line":"uint32_t inline Sigma0(uint32_t x) { return (x >> 2 | x << 30) ^ (x >> 13 | x << 19) ^ (x >> 22 | x << 10); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   20","line":"uint32_t inline Sigma1(uint32_t x) { return (x >> 6 | x << 26) ^ (x >> 11 | x << 21) ^ (x >> 25 | x << 7); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   21","line":"uint32_t inline sigma0(uint32_t x) { return (x >> 7 | x << 25) ^ (x >> 18 | x << 14) ^ (x >> 3); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   22","line":"uint32_t inline sigma1(uint32_t x) { return (x >> 17 | x << 15) ^ (x >> 19 | x << 13) ^ (x >> 10); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"/** One round of SHA-256. */"},
{"lineNum":"   25","line":"void inline Round(uint32_t a, uint32_t b, uint32_t c, uint32_t& d, uint32_t e, uint32_t f, uint32_t g, uint32_t& h, uint32_t k, uint32_t w)"},
{"lineNum":"   26","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   27","line":"    uint32_t t1 = h + Sigma1(e) + Ch(e, f, g) + k + w;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   28","line":"    uint32_t t2 = Sigma0(a) + Maj(a, b, c);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   29","line":"    d += t1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   30","line":"    h = t1 + t2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   31","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"/** Initialize SHA-256 state. */"},
{"lineNum":"   34","line":"void inline Initialize(uint32_t* s)"},
{"lineNum":"   35","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   36","line":"    s[0] = 0x6a09e667ul;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   37","line":"    s[1] = 0xbb67ae85ul;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":"    s[2] = 0x3c6ef372ul;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   39","line":"    s[3] = 0xa54ff53aul;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":"    s[4] = 0x510e527ful;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   41","line":"    s[5] = 0x9b05688cul;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   42","line":"    s[6] = 0x1f83d9abul;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":"    s[7] = 0x5be0cd19ul;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   44","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"/** Perform one SHA-256 transformation, processing a 64-byte chunk. */"},
{"lineNum":"   47","line":"void Transform(uint32_t* s, const unsigned char* chunk)"},
{"lineNum":"   48","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   49","line":"    uint32_t a = s[0], b = s[1], c = s[2], d = s[3], e = s[4], f = s[5], g = s[6], h = s[7];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":"    uint32_t w0, w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12, w13, w14, w15;"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"    Round(a, b, c, d, e, f, g, h, 0x428a2f98, w0 = ReadBE32(chunk + 0));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   53","line":"    Round(h, a, b, c, d, e, f, g, 0x71374491, w1 = ReadBE32(chunk + 4));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   54","line":"    Round(g, h, a, b, c, d, e, f, 0xb5c0fbcf, w2 = ReadBE32(chunk + 8));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   55","line":"    Round(f, g, h, a, b, c, d, e, 0xe9b5dba5, w3 = ReadBE32(chunk + 12));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   56","line":"    Round(e, f, g, h, a, b, c, d, 0x3956c25b, w4 = ReadBE32(chunk + 16));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   57","line":"    Round(d, e, f, g, h, a, b, c, 0x59f111f1, w5 = ReadBE32(chunk + 20));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   58","line":"    Round(c, d, e, f, g, h, a, b, 0x923f82a4, w6 = ReadBE32(chunk + 24));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   59","line":"    Round(b, c, d, e, f, g, h, a, 0xab1c5ed5, w7 = ReadBE32(chunk + 28));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   60","line":"    Round(a, b, c, d, e, f, g, h, 0xd807aa98, w8 = ReadBE32(chunk + 32));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":"    Round(h, a, b, c, d, e, f, g, 0x12835b01, w9 = ReadBE32(chunk + 36));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   62","line":"    Round(g, h, a, b, c, d, e, f, 0x243185be, w10 = ReadBE32(chunk + 40));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   63","line":"    Round(f, g, h, a, b, c, d, e, 0x550c7dc3, w11 = ReadBE32(chunk + 44));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   64","line":"    Round(e, f, g, h, a, b, c, d, 0x72be5d74, w12 = ReadBE32(chunk + 48));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   65","line":"    Round(d, e, f, g, h, a, b, c, 0x80deb1fe, w13 = ReadBE32(chunk + 52));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   66","line":"    Round(c, d, e, f, g, h, a, b, 0x9bdc06a7, w14 = ReadBE32(chunk + 56));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   67","line":"    Round(b, c, d, e, f, g, h, a, 0xc19bf174, w15 = ReadBE32(chunk + 60));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"    Round(a, b, c, d, e, f, g, h, 0xe49b69c1, w0 += sigma1(w14) + w9 + sigma0(w1));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   70","line":"    Round(h, a, b, c, d, e, f, g, 0xefbe4786, w1 += sigma1(w15) + w10 + sigma0(w2));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   71","line":"    Round(g, h, a, b, c, d, e, f, 0x0fc19dc6, w2 += sigma1(w0) + w11 + sigma0(w3));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   72","line":"    Round(f, g, h, a, b, c, d, e, 0x240ca1cc, w3 += sigma1(w1) + w12 + sigma0(w4));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   73","line":"    Round(e, f, g, h, a, b, c, d, 0x2de92c6f, w4 += sigma1(w2) + w13 + sigma0(w5));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   74","line":"    Round(d, e, f, g, h, a, b, c, 0x4a7484aa, w5 += sigma1(w3) + w14 + sigma0(w6));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   75","line":"    Round(c, d, e, f, g, h, a, b, 0x5cb0a9dc, w6 += sigma1(w4) + w15 + sigma0(w7));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   76","line":"    Round(b, c, d, e, f, g, h, a, 0x76f988da, w7 += sigma1(w5) + w0 + sigma0(w8));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":"    Round(a, b, c, d, e, f, g, h, 0x983e5152, w8 += sigma1(w6) + w1 + sigma0(w9));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   78","line":"    Round(h, a, b, c, d, e, f, g, 0xa831c66d, w9 += sigma1(w7) + w2 + sigma0(w10));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   79","line":"    Round(g, h, a, b, c, d, e, f, 0xb00327c8, w10 += sigma1(w8) + w3 + sigma0(w11));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   80","line":"    Round(f, g, h, a, b, c, d, e, 0xbf597fc7, w11 += sigma1(w9) + w4 + sigma0(w12));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   81","line":"    Round(e, f, g, h, a, b, c, d, 0xc6e00bf3, w12 += sigma1(w10) + w5 + sigma0(w13));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   82","line":"    Round(d, e, f, g, h, a, b, c, 0xd5a79147, w13 += sigma1(w11) + w6 + sigma0(w14));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   83","line":"    Round(c, d, e, f, g, h, a, b, 0x06ca6351, w14 += sigma1(w12) + w7 + sigma0(w15));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   84","line":"    Round(b, c, d, e, f, g, h, a, 0x14292967, w15 += sigma1(w13) + w8 + sigma0(w0));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"    Round(a, b, c, d, e, f, g, h, 0x27b70a85, w0 += sigma1(w14) + w9 + sigma0(w1));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   87","line":"    Round(h, a, b, c, d, e, f, g, 0x2e1b2138, w1 += sigma1(w15) + w10 + sigma0(w2));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   88","line":"    Round(g, h, a, b, c, d, e, f, 0x4d2c6dfc, w2 += sigma1(w0) + w11 + sigma0(w3));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   89","line":"    Round(f, g, h, a, b, c, d, e, 0x53380d13, w3 += sigma1(w1) + w12 + sigma0(w4));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   90","line":"    Round(e, f, g, h, a, b, c, d, 0x650a7354, w4 += sigma1(w2) + w13 + sigma0(w5));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   91","line":"    Round(d, e, f, g, h, a, b, c, 0x766a0abb, w5 += sigma1(w3) + w14 + sigma0(w6));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   92","line":"    Round(c, d, e, f, g, h, a, b, 0x81c2c92e, w6 += sigma1(w4) + w15 + sigma0(w7));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   93","line":"    Round(b, c, d, e, f, g, h, a, 0x92722c85, w7 += sigma1(w5) + w0 + sigma0(w8));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   94","line":"    Round(a, b, c, d, e, f, g, h, 0xa2bfe8a1, w8 += sigma1(w6) + w1 + sigma0(w9));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   95","line":"    Round(h, a, b, c, d, e, f, g, 0xa81a664b, w9 += sigma1(w7) + w2 + sigma0(w10));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   96","line":"    Round(g, h, a, b, c, d, e, f, 0xc24b8b70, w10 += sigma1(w8) + w3 + sigma0(w11));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   97","line":"    Round(f, g, h, a, b, c, d, e, 0xc76c51a3, w11 += sigma1(w9) + w4 + sigma0(w12));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   98","line":"    Round(e, f, g, h, a, b, c, d, 0xd192e819, w12 += sigma1(w10) + w5 + sigma0(w13));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   99","line":"    Round(d, e, f, g, h, a, b, c, 0xd6990624, w13 += sigma1(w11) + w6 + sigma0(w14));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  100","line":"    Round(c, d, e, f, g, h, a, b, 0xf40e3585, w14 += sigma1(w12) + w7 + sigma0(w15));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  101","line":"    Round(b, c, d, e, f, g, h, a, 0x106aa070, w15 += sigma1(w13) + w8 + sigma0(w0));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"    Round(a, b, c, d, e, f, g, h, 0x19a4c116, w0 += sigma1(w14) + w9 + sigma0(w1));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  104","line":"    Round(h, a, b, c, d, e, f, g, 0x1e376c08, w1 += sigma1(w15) + w10 + sigma0(w2));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  105","line":"    Round(g, h, a, b, c, d, e, f, 0x2748774c, w2 += sigma1(w0) + w11 + sigma0(w3));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  106","line":"    Round(f, g, h, a, b, c, d, e, 0x34b0bcb5, w3 += sigma1(w1) + w12 + sigma0(w4));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  107","line":"    Round(e, f, g, h, a, b, c, d, 0x391c0cb3, w4 += sigma1(w2) + w13 + sigma0(w5));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  108","line":"    Round(d, e, f, g, h, a, b, c, 0x4ed8aa4a, w5 += sigma1(w3) + w14 + sigma0(w6));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  109","line":"    Round(c, d, e, f, g, h, a, b, 0x5b9cca4f, w6 += sigma1(w4) + w15 + sigma0(w7));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  110","line":"    Round(b, c, d, e, f, g, h, a, 0x682e6ff3, w7 += sigma1(w5) + w0 + sigma0(w8));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  111","line":"    Round(a, b, c, d, e, f, g, h, 0x748f82ee, w8 += sigma1(w6) + w1 + sigma0(w9));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  112","line":"    Round(h, a, b, c, d, e, f, g, 0x78a5636f, w9 += sigma1(w7) + w2 + sigma0(w10));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  113","line":"    Round(g, h, a, b, c, d, e, f, 0x84c87814, w10 += sigma1(w8) + w3 + sigma0(w11));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  114","line":"    Round(f, g, h, a, b, c, d, e, 0x8cc70208, w11 += sigma1(w9) + w4 + sigma0(w12));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  115","line":"    Round(e, f, g, h, a, b, c, d, 0x90befffa, w12 += sigma1(w10) + w5 + sigma0(w13));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  116","line":"    Round(d, e, f, g, h, a, b, c, 0xa4506ceb, w13 += sigma1(w11) + w6 + sigma0(w14));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  117","line":"    Round(c, d, e, f, g, h, a, b, 0xbef9a3f7, w14 + sigma1(w12) + w7 + sigma0(w15));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  118","line":"    Round(b, c, d, e, f, g, h, a, 0xc67178f2, w15 + sigma1(w13) + w8 + sigma0(w0));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  119","line":""},
{"lineNum":"  120","line":"    s[0] += a;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  121","line":"    s[1] += b;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  122","line":"    s[2] += c;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  123","line":"    s[3] += d;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  124","line":"    s[4] += e;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  125","line":"    s[5] += f;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  126","line":"    s[6] += g;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  127","line":"    s[7] += h;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  128","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  129","line":""},
{"lineNum":"  130","line":"} // namespace sha256"},
{"lineNum":"  131","line":"} // namespace"},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":""},
{"lineNum":"  134","line":"////// SHA-256"},
{"lineNum":"  135","line":""},
{"lineNum":"  136","line":"CSHA256::CSHA256() : bytes(0)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  137","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  138","line":"    sha256::Initialize(s);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  139","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  140","line":""},
{"lineNum":"  141","line":"CSHA256& CSHA256::Write(const unsigned char* data, size_t len)"},
{"lineNum":"  142","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  143","line":"    const unsigned char* end = data + len;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  144","line":"    size_t bufsize = bytes % 64;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  145","line":"    if (bufsize && bufsize + len >= 64) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  146","line":"        // Fill the buffer, and process it."},
{"lineNum":"  147","line":"        memcpy(buf + bufsize, data, 64 - bufsize);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  148","line":"        bytes += 64 - bufsize;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  149","line":"        data += 64 - bufsize;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  150","line":"        sha256::Transform(s, buf);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  151","line":"        bufsize = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  152","line":"    }"},
{"lineNum":"  153","line":"    while (end >= data + 64) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  154","line":"        // Process full chunks directly from the source."},
{"lineNum":"  155","line":"        sha256::Transform(s, data);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  156","line":"        bytes += 64;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  157","line":"        data += 64;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  158","line":"    }"},
{"lineNum":"  159","line":"    if (end > data) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  160","line":"        // Fill the buffer with what remains."},
{"lineNum":"  161","line":"        memcpy(buf + bufsize, data, end - data);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  162","line":"        bytes += end - data;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  163","line":"    }"},
{"lineNum":"  164","line":"    return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  165","line":"}"},
{"lineNum":"  166","line":""},
{"lineNum":"  167","line":"void CSHA256::Finalize(unsigned char hash[OUTPUT_SIZE])"},
{"lineNum":"  168","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  169","line":"    static const unsigned char pad[64] = {0x80};"},
{"lineNum":"  170","line":"    unsigned char sizedesc[8];"},
{"lineNum":"  171","line":"    WriteBE64(sizedesc, bytes << 3);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  172","line":"    Write(pad, 1 + ((119 - (bytes % 64)) % 64));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  173","line":"    Write(sizedesc, 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  174","line":"    WriteBE32(hash, s[0]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  175","line":"    WriteBE32(hash + 4, s[1]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  176","line":"    WriteBE32(hash + 8, s[2]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  177","line":"    WriteBE32(hash + 12, s[3]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  178","line":"    WriteBE32(hash + 16, s[4]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  179","line":"    WriteBE32(hash + 20, s[5]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  180","line":"    WriteBE32(hash + 24, s[6]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  181","line":"    WriteBE32(hash + 28, s[7]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  182","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  183","line":""},
{"lineNum":"  184","line":"CSHA256& CSHA256::Reset()"},
{"lineNum":"  185","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  186","line":"    bytes = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  187","line":"    sha256::Initialize(s);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  188","line":"    return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  189","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "mint_transaction_debug", "date" : "2023-08-28 11:36:26", "instrumented" : 135, "covered" : 0,};
var merged_data = [];
