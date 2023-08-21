var data = {lines:[
{"lineNum":"    1","line":"/**********************************************************************"},
{"lineNum":"    2","line":" * Copyright (c) 2014 Pieter Wuille                                   *"},
{"lineNum":"    3","line":" * Distributed under the MIT software license, see the accompanying   *"},
{"lineNum":"    4","line":" * file COPYING or http://www.opensource.org/licenses/mit-license.php.*"},
{"lineNum":"    5","line":" **********************************************************************/"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"#ifndef _SECP256K1_HASH_IMPL_H_"},
{"lineNum":"    8","line":"#define _SECP256K1_HASH_IMPL_H_"},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"#include \"hash.h\""},
{"lineNum":"   11","line":""},
{"lineNum":"   12","line":"#include <stdlib.h>"},
{"lineNum":"   13","line":"#include <stdint.h>"},
{"lineNum":"   14","line":"#include <string.h>"},
{"lineNum":"   15","line":""},
{"lineNum":"   16","line":"#define Ch(x,y,z) ((z) ^ ((x) & ((y) ^ (z))))"},
{"lineNum":"   17","line":"#define Maj(x,y,z) (((x) & (y)) | ((z) & ((x) | (y))))"},
{"lineNum":"   18","line":"#define Sigma0(x) (((x) >> 2 | (x) << 30) ^ ((x) >> 13 | (x) << 19) ^ ((x) >> 22 | (x) << 10))"},
{"lineNum":"   19","line":"#define Sigma1(x) (((x) >> 6 | (x) << 26) ^ ((x) >> 11 | (x) << 21) ^ ((x) >> 25 | (x) << 7))"},
{"lineNum":"   20","line":"#define sigma0(x) (((x) >> 7 | (x) << 25) ^ ((x) >> 18 | (x) << 14) ^ ((x) >> 3))"},
{"lineNum":"   21","line":"#define sigma1(x) (((x) >> 17 | (x) << 15) ^ ((x) >> 19 | (x) << 13) ^ ((x) >> 10))"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"#define Round(a,b,c,d,e,f,g,h,k,w) do { \\"},
{"lineNum":"   24","line":"    uint32_t t1 = (h) + Sigma1(e) + Ch((e), (f), (g)) + (k) + (w); \\"},
{"lineNum":"   25","line":"    uint32_t t2 = Sigma0(a) + Maj((a), (b), (c)); \\"},
{"lineNum":"   26","line":"    (d) += t1; \\"},
{"lineNum":"   27","line":"    (h) = t1 + t2; \\"},
{"lineNum":"   28","line":"} while(0)"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"#ifdef WORDS_BIGENDIAN"},
{"lineNum":"   31","line":"#define BE32(x) (x)"},
{"lineNum":"   32","line":"#else"},
{"lineNum":"   33","line":"#define BE32(p) ((((p) & 0xFF) << 24) | (((p) & 0xFF00) << 8) | (((p) & 0xFF0000) >> 8) | (((p) & 0xFF000000) >> 24))"},
{"lineNum":"   34","line":"#endif"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"static void secp256k1_sha256_initialize(secp256k1_sha256_t *hash) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   37","line":"    hash->s[0] = 0x6a09e667ul;","class":"lineNoCov","hits":"0",},
{"lineNum":"   38","line":"    hash->s[1] = 0xbb67ae85ul;","class":"lineNoCov","hits":"0",},
{"lineNum":"   39","line":"    hash->s[2] = 0x3c6ef372ul;","class":"lineNoCov","hits":"0",},
{"lineNum":"   40","line":"    hash->s[3] = 0xa54ff53aul;","class":"lineNoCov","hits":"0",},
{"lineNum":"   41","line":"    hash->s[4] = 0x510e527ful;","class":"lineNoCov","hits":"0",},
{"lineNum":"   42","line":"    hash->s[5] = 0x9b05688cul;","class":"lineNoCov","hits":"0",},
{"lineNum":"   43","line":"    hash->s[6] = 0x1f83d9abul;","class":"lineNoCov","hits":"0",},
{"lineNum":"   44","line":"    hash->s[7] = 0x5be0cd19ul;","class":"lineNoCov","hits":"0",},
{"lineNum":"   45","line":"    hash->bytes = 0;","class":"lineNoCov","hits":"0",},
{"lineNum":"   46","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"/** Perform one SHA-256 transformation, processing 16 big endian 32-bit words. */"},
{"lineNum":"   49","line":"static void secp256k1_sha256_transform(uint32_t* s, const uint32_t* chunk) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   50","line":"    uint32_t a = s[0], b = s[1], c = s[2], d = s[3], e = s[4], f = s[5], g = s[6], h = s[7];","class":"lineNoCov","hits":"0",},
{"lineNum":"   51","line":"    uint32_t w0, w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12, w13, w14, w15;"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    Round(a, b, c, d, e, f, g, h, 0x428a2f98, w0 = BE32(chunk[0]));","class":"lineNoCov","hits":"0",},
{"lineNum":"   54","line":"    Round(h, a, b, c, d, e, f, g, 0x71374491, w1 = BE32(chunk[1]));","class":"lineNoCov","hits":"0",},
{"lineNum":"   55","line":"    Round(g, h, a, b, c, d, e, f, 0xb5c0fbcf, w2 = BE32(chunk[2]));","class":"lineNoCov","hits":"0",},
{"lineNum":"   56","line":"    Round(f, g, h, a, b, c, d, e, 0xe9b5dba5, w3 = BE32(chunk[3]));","class":"lineNoCov","hits":"0",},
{"lineNum":"   57","line":"    Round(e, f, g, h, a, b, c, d, 0x3956c25b, w4 = BE32(chunk[4]));","class":"lineNoCov","hits":"0",},
{"lineNum":"   58","line":"    Round(d, e, f, g, h, a, b, c, 0x59f111f1, w5 = BE32(chunk[5]));","class":"lineNoCov","hits":"0",},
{"lineNum":"   59","line":"    Round(c, d, e, f, g, h, a, b, 0x923f82a4, w6 = BE32(chunk[6]));","class":"lineNoCov","hits":"0",},
{"lineNum":"   60","line":"    Round(b, c, d, e, f, g, h, a, 0xab1c5ed5, w7 = BE32(chunk[7]));","class":"lineNoCov","hits":"0",},
{"lineNum":"   61","line":"    Round(a, b, c, d, e, f, g, h, 0xd807aa98, w8 = BE32(chunk[8]));","class":"lineNoCov","hits":"0",},
{"lineNum":"   62","line":"    Round(h, a, b, c, d, e, f, g, 0x12835b01, w9 = BE32(chunk[9]));","class":"lineNoCov","hits":"0",},
{"lineNum":"   63","line":"    Round(g, h, a, b, c, d, e, f, 0x243185be, w10 = BE32(chunk[10]));","class":"lineNoCov","hits":"0",},
{"lineNum":"   64","line":"    Round(f, g, h, a, b, c, d, e, 0x550c7dc3, w11 = BE32(chunk[11]));","class":"lineNoCov","hits":"0",},
{"lineNum":"   65","line":"    Round(e, f, g, h, a, b, c, d, 0x72be5d74, w12 = BE32(chunk[12]));","class":"lineNoCov","hits":"0",},
{"lineNum":"   66","line":"    Round(d, e, f, g, h, a, b, c, 0x80deb1fe, w13 = BE32(chunk[13]));","class":"lineNoCov","hits":"0",},
{"lineNum":"   67","line":"    Round(c, d, e, f, g, h, a, b, 0x9bdc06a7, w14 = BE32(chunk[14]));","class":"lineNoCov","hits":"0",},
{"lineNum":"   68","line":"    Round(b, c, d, e, f, g, h, a, 0xc19bf174, w15 = BE32(chunk[15]));","class":"lineNoCov","hits":"0",},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"    Round(a, b, c, d, e, f, g, h, 0xe49b69c1, w0 += sigma1(w14) + w9 + sigma0(w1));","class":"lineNoCov","hits":"0",},
{"lineNum":"   71","line":"    Round(h, a, b, c, d, e, f, g, 0xefbe4786, w1 += sigma1(w15) + w10 + sigma0(w2));","class":"lineNoCov","hits":"0",},
{"lineNum":"   72","line":"    Round(g, h, a, b, c, d, e, f, 0x0fc19dc6, w2 += sigma1(w0) + w11 + sigma0(w3));","class":"lineNoCov","hits":"0",},
{"lineNum":"   73","line":"    Round(f, g, h, a, b, c, d, e, 0x240ca1cc, w3 += sigma1(w1) + w12 + sigma0(w4));","class":"lineNoCov","hits":"0",},
{"lineNum":"   74","line":"    Round(e, f, g, h, a, b, c, d, 0x2de92c6f, w4 += sigma1(w2) + w13 + sigma0(w5));","class":"lineNoCov","hits":"0",},
{"lineNum":"   75","line":"    Round(d, e, f, g, h, a, b, c, 0x4a7484aa, w5 += sigma1(w3) + w14 + sigma0(w6));","class":"lineNoCov","hits":"0",},
{"lineNum":"   76","line":"    Round(c, d, e, f, g, h, a, b, 0x5cb0a9dc, w6 += sigma1(w4) + w15 + sigma0(w7));","class":"lineNoCov","hits":"0",},
{"lineNum":"   77","line":"    Round(b, c, d, e, f, g, h, a, 0x76f988da, w7 += sigma1(w5) + w0 + sigma0(w8));","class":"lineNoCov","hits":"0",},
{"lineNum":"   78","line":"    Round(a, b, c, d, e, f, g, h, 0x983e5152, w8 += sigma1(w6) + w1 + sigma0(w9));","class":"lineNoCov","hits":"0",},
{"lineNum":"   79","line":"    Round(h, a, b, c, d, e, f, g, 0xa831c66d, w9 += sigma1(w7) + w2 + sigma0(w10));","class":"lineNoCov","hits":"0",},
{"lineNum":"   80","line":"    Round(g, h, a, b, c, d, e, f, 0xb00327c8, w10 += sigma1(w8) + w3 + sigma0(w11));","class":"lineNoCov","hits":"0",},
{"lineNum":"   81","line":"    Round(f, g, h, a, b, c, d, e, 0xbf597fc7, w11 += sigma1(w9) + w4 + sigma0(w12));","class":"lineNoCov","hits":"0",},
{"lineNum":"   82","line":"    Round(e, f, g, h, a, b, c, d, 0xc6e00bf3, w12 += sigma1(w10) + w5 + sigma0(w13));","class":"lineNoCov","hits":"0",},
{"lineNum":"   83","line":"    Round(d, e, f, g, h, a, b, c, 0xd5a79147, w13 += sigma1(w11) + w6 + sigma0(w14));","class":"lineNoCov","hits":"0",},
{"lineNum":"   84","line":"    Round(c, d, e, f, g, h, a, b, 0x06ca6351, w14 += sigma1(w12) + w7 + sigma0(w15));","class":"lineNoCov","hits":"0",},
{"lineNum":"   85","line":"    Round(b, c, d, e, f, g, h, a, 0x14292967, w15 += sigma1(w13) + w8 + sigma0(w0));","class":"lineNoCov","hits":"0",},
{"lineNum":"   86","line":""},
{"lineNum":"   87","line":"    Round(a, b, c, d, e, f, g, h, 0x27b70a85, w0 += sigma1(w14) + w9 + sigma0(w1));","class":"lineNoCov","hits":"0",},
{"lineNum":"   88","line":"    Round(h, a, b, c, d, e, f, g, 0x2e1b2138, w1 += sigma1(w15) + w10 + sigma0(w2));","class":"lineNoCov","hits":"0",},
{"lineNum":"   89","line":"    Round(g, h, a, b, c, d, e, f, 0x4d2c6dfc, w2 += sigma1(w0) + w11 + sigma0(w3));","class":"lineNoCov","hits":"0",},
{"lineNum":"   90","line":"    Round(f, g, h, a, b, c, d, e, 0x53380d13, w3 += sigma1(w1) + w12 + sigma0(w4));","class":"lineNoCov","hits":"0",},
{"lineNum":"   91","line":"    Round(e, f, g, h, a, b, c, d, 0x650a7354, w4 += sigma1(w2) + w13 + sigma0(w5));","class":"lineNoCov","hits":"0",},
{"lineNum":"   92","line":"    Round(d, e, f, g, h, a, b, c, 0x766a0abb, w5 += sigma1(w3) + w14 + sigma0(w6));","class":"lineNoCov","hits":"0",},
{"lineNum":"   93","line":"    Round(c, d, e, f, g, h, a, b, 0x81c2c92e, w6 += sigma1(w4) + w15 + sigma0(w7));","class":"lineNoCov","hits":"0",},
{"lineNum":"   94","line":"    Round(b, c, d, e, f, g, h, a, 0x92722c85, w7 += sigma1(w5) + w0 + sigma0(w8));","class":"lineNoCov","hits":"0",},
{"lineNum":"   95","line":"    Round(a, b, c, d, e, f, g, h, 0xa2bfe8a1, w8 += sigma1(w6) + w1 + sigma0(w9));","class":"lineNoCov","hits":"0",},
{"lineNum":"   96","line":"    Round(h, a, b, c, d, e, f, g, 0xa81a664b, w9 += sigma1(w7) + w2 + sigma0(w10));","class":"lineNoCov","hits":"0",},
{"lineNum":"   97","line":"    Round(g, h, a, b, c, d, e, f, 0xc24b8b70, w10 += sigma1(w8) + w3 + sigma0(w11));","class":"lineNoCov","hits":"0",},
{"lineNum":"   98","line":"    Round(f, g, h, a, b, c, d, e, 0xc76c51a3, w11 += sigma1(w9) + w4 + sigma0(w12));","class":"lineNoCov","hits":"0",},
{"lineNum":"   99","line":"    Round(e, f, g, h, a, b, c, d, 0xd192e819, w12 += sigma1(w10) + w5 + sigma0(w13));","class":"lineNoCov","hits":"0",},
{"lineNum":"  100","line":"    Round(d, e, f, g, h, a, b, c, 0xd6990624, w13 += sigma1(w11) + w6 + sigma0(w14));","class":"lineNoCov","hits":"0",},
{"lineNum":"  101","line":"    Round(c, d, e, f, g, h, a, b, 0xf40e3585, w14 += sigma1(w12) + w7 + sigma0(w15));","class":"lineNoCov","hits":"0",},
{"lineNum":"  102","line":"    Round(b, c, d, e, f, g, h, a, 0x106aa070, w15 += sigma1(w13) + w8 + sigma0(w0));","class":"lineNoCov","hits":"0",},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"    Round(a, b, c, d, e, f, g, h, 0x19a4c116, w0 += sigma1(w14) + w9 + sigma0(w1));","class":"lineNoCov","hits":"0",},
{"lineNum":"  105","line":"    Round(h, a, b, c, d, e, f, g, 0x1e376c08, w1 += sigma1(w15) + w10 + sigma0(w2));","class":"lineNoCov","hits":"0",},
{"lineNum":"  106","line":"    Round(g, h, a, b, c, d, e, f, 0x2748774c, w2 += sigma1(w0) + w11 + sigma0(w3));","class":"lineNoCov","hits":"0",},
{"lineNum":"  107","line":"    Round(f, g, h, a, b, c, d, e, 0x34b0bcb5, w3 += sigma1(w1) + w12 + sigma0(w4));","class":"lineNoCov","hits":"0",},
{"lineNum":"  108","line":"    Round(e, f, g, h, a, b, c, d, 0x391c0cb3, w4 += sigma1(w2) + w13 + sigma0(w5));","class":"lineNoCov","hits":"0",},
{"lineNum":"  109","line":"    Round(d, e, f, g, h, a, b, c, 0x4ed8aa4a, w5 += sigma1(w3) + w14 + sigma0(w6));","class":"lineNoCov","hits":"0",},
{"lineNum":"  110","line":"    Round(c, d, e, f, g, h, a, b, 0x5b9cca4f, w6 += sigma1(w4) + w15 + sigma0(w7));","class":"lineNoCov","hits":"0",},
{"lineNum":"  111","line":"    Round(b, c, d, e, f, g, h, a, 0x682e6ff3, w7 += sigma1(w5) + w0 + sigma0(w8));","class":"lineNoCov","hits":"0",},
{"lineNum":"  112","line":"    Round(a, b, c, d, e, f, g, h, 0x748f82ee, w8 += sigma1(w6) + w1 + sigma0(w9));","class":"lineNoCov","hits":"0",},
{"lineNum":"  113","line":"    Round(h, a, b, c, d, e, f, g, 0x78a5636f, w9 += sigma1(w7) + w2 + sigma0(w10));","class":"lineNoCov","hits":"0",},
{"lineNum":"  114","line":"    Round(g, h, a, b, c, d, e, f, 0x84c87814, w10 += sigma1(w8) + w3 + sigma0(w11));","class":"lineNoCov","hits":"0",},
{"lineNum":"  115","line":"    Round(f, g, h, a, b, c, d, e, 0x8cc70208, w11 += sigma1(w9) + w4 + sigma0(w12));","class":"lineNoCov","hits":"0",},
{"lineNum":"  116","line":"    Round(e, f, g, h, a, b, c, d, 0x90befffa, w12 += sigma1(w10) + w5 + sigma0(w13));","class":"lineNoCov","hits":"0",},
{"lineNum":"  117","line":"    Round(d, e, f, g, h, a, b, c, 0xa4506ceb, w13 += sigma1(w11) + w6 + sigma0(w14));","class":"lineNoCov","hits":"0",},
{"lineNum":"  118","line":"    Round(c, d, e, f, g, h, a, b, 0xbef9a3f7, w14 + sigma1(w12) + w7 + sigma0(w15));","class":"lineNoCov","hits":"0",},
{"lineNum":"  119","line":"    Round(b, c, d, e, f, g, h, a, 0xc67178f2, w15 + sigma1(w13) + w8 + sigma0(w0));","class":"lineNoCov","hits":"0",},
{"lineNum":"  120","line":""},
{"lineNum":"  121","line":"    s[0] += a;","class":"lineNoCov","hits":"0",},
{"lineNum":"  122","line":"    s[1] += b;","class":"lineNoCov","hits":"0",},
{"lineNum":"  123","line":"    s[2] += c;","class":"lineNoCov","hits":"0",},
{"lineNum":"  124","line":"    s[3] += d;","class":"lineNoCov","hits":"0",},
{"lineNum":"  125","line":"    s[4] += e;","class":"lineNoCov","hits":"0",},
{"lineNum":"  126","line":"    s[5] += f;","class":"lineNoCov","hits":"0",},
{"lineNum":"  127","line":"    s[6] += g;","class":"lineNoCov","hits":"0",},
{"lineNum":"  128","line":"    s[7] += h;","class":"lineNoCov","hits":"0",},
{"lineNum":"  129","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  130","line":""},
{"lineNum":"  131","line":"static void secp256k1_sha256_write(secp256k1_sha256_t *hash, const unsigned char *data, size_t len) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  132","line":"    size_t bufsize = hash->bytes & 0x3F;","class":"lineNoCov","hits":"0",},
{"lineNum":"  133","line":"    hash->bytes += len;","class":"lineNoCov","hits":"0",},
{"lineNum":"  134","line":"    while (bufsize + len >= 64) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  135","line":"        /* Fill the buffer, and process it. */"},
{"lineNum":"  136","line":"        memcpy(((unsigned char*)hash->buf) + bufsize, data, 64 - bufsize);","class":"lineNoCov","hits":"0",},
{"lineNum":"  137","line":"        data += 64 - bufsize;","class":"lineNoCov","hits":"0",},
{"lineNum":"  138","line":"        len -= 64 - bufsize;","class":"lineNoCov","hits":"0",},
{"lineNum":"  139","line":"        secp256k1_sha256_transform(hash->s, hash->buf);","class":"lineNoCov","hits":"0",},
{"lineNum":"  140","line":"        bufsize = 0;","class":"lineNoCov","hits":"0",},
{"lineNum":"  141","line":"    }"},
{"lineNum":"  142","line":"    if (len) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  143","line":"        /* Fill the buffer with what remains. */"},
{"lineNum":"  144","line":"        memcpy(((unsigned char*)hash->buf) + bufsize, data, len);","class":"lineNoCov","hits":"0",},
{"lineNum":"  145","line":"    }"},
{"lineNum":"  146","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  147","line":""},
{"lineNum":"  148","line":"static void secp256k1_sha256_finalize(secp256k1_sha256_t *hash, unsigned char *out32) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  149","line":"    static const unsigned char pad[64] = {0x80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};"},
{"lineNum":"  150","line":"    uint32_t sizedesc[2];"},
{"lineNum":"  151","line":"    uint32_t out[8];"},
{"lineNum":"  152","line":"    int i = 0;","class":"lineNoCov","hits":"0",},
{"lineNum":"  153","line":"    sizedesc[0] = BE32(hash->bytes >> 29);","class":"lineNoCov","hits":"0",},
{"lineNum":"  154","line":"    sizedesc[1] = BE32(hash->bytes << 3);","class":"lineNoCov","hits":"0",},
{"lineNum":"  155","line":"    secp256k1_sha256_write(hash, pad, 1 + ((119 - (hash->bytes % 64)) % 64));","class":"lineNoCov","hits":"0",},
{"lineNum":"  156","line":"    secp256k1_sha256_write(hash, (const unsigned char*)sizedesc, 8);","class":"lineNoCov","hits":"0",},
{"lineNum":"  157","line":"    for (i = 0; i < 8; i++) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  158","line":"        out[i] = BE32(hash->s[i]);","class":"lineNoCov","hits":"0",},
{"lineNum":"  159","line":"        hash->s[i] = 0;","class":"lineNoCov","hits":"0",},
{"lineNum":"  160","line":"    }"},
{"lineNum":"  161","line":"    memcpy(out32, (const unsigned char*)out, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  162","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  163","line":""},
{"lineNum":"  164","line":"static void secp256k1_hmac_sha256_initialize(secp256k1_hmac_sha256_t *hash, const unsigned char *key, size_t keylen) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  165","line":"    int n;"},
{"lineNum":"  166","line":"    unsigned char rkey[64];"},
{"lineNum":"  167","line":"    if (keylen <= 64) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  168","line":"        memcpy(rkey, key, keylen);","class":"lineNoCov","hits":"0",},
{"lineNum":"  169","line":"        memset(rkey + keylen, 0, 64 - keylen);","class":"lineNoCov","hits":"0",},
{"lineNum":"  170","line":"    } else {","class":"lineNoCov","hits":"0",},
{"lineNum":"  171","line":"        secp256k1_sha256_t sha256;","class":"lineNoCov","hits":"0",},
{"lineNum":"  172","line":"        secp256k1_sha256_initialize(&sha256);","class":"lineNoCov","hits":"0",},
{"lineNum":"  173","line":"        secp256k1_sha256_write(&sha256, key, keylen);","class":"lineNoCov","hits":"0",},
{"lineNum":"  174","line":"        secp256k1_sha256_finalize(&sha256, rkey);","class":"lineNoCov","hits":"0",},
{"lineNum":"  175","line":"        memset(rkey + 32, 0, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  176","line":"    }"},
{"lineNum":"  177","line":""},
{"lineNum":"  178","line":"    secp256k1_sha256_initialize(&hash->outer);","class":"lineNoCov","hits":"0",},
{"lineNum":"  179","line":"    for (n = 0; n < 64; n++) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  180","line":"        rkey[n] ^= 0x5c;","class":"lineNoCov","hits":"0",},
{"lineNum":"  181","line":"    }"},
{"lineNum":"  182","line":"    secp256k1_sha256_write(&hash->outer, rkey, 64);","class":"lineNoCov","hits":"0",},
{"lineNum":"  183","line":""},
{"lineNum":"  184","line":"    secp256k1_sha256_initialize(&hash->inner);","class":"lineNoCov","hits":"0",},
{"lineNum":"  185","line":"    for (n = 0; n < 64; n++) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  186","line":"        rkey[n] ^= 0x5c ^ 0x36;","class":"lineNoCov","hits":"0",},
{"lineNum":"  187","line":"    }"},
{"lineNum":"  188","line":"    secp256k1_sha256_write(&hash->inner, rkey, 64);","class":"lineNoCov","hits":"0",},
{"lineNum":"  189","line":"    memset(rkey, 0, 64);","class":"lineNoCov","hits":"0",},
{"lineNum":"  190","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  191","line":""},
{"lineNum":"  192","line":"static void secp256k1_hmac_sha256_write(secp256k1_hmac_sha256_t *hash, const unsigned char *data, size_t size) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  193","line":"    secp256k1_sha256_write(&hash->inner, data, size);","class":"lineNoCov","hits":"0",},
{"lineNum":"  194","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  195","line":""},
{"lineNum":"  196","line":"static void secp256k1_hmac_sha256_finalize(secp256k1_hmac_sha256_t *hash, unsigned char *out32) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  197","line":"    unsigned char temp[32];"},
{"lineNum":"  198","line":"    secp256k1_sha256_finalize(&hash->inner, temp);","class":"lineNoCov","hits":"0",},
{"lineNum":"  199","line":"    secp256k1_sha256_write(&hash->outer, temp, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  200","line":"    memset(temp, 0, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  201","line":"    secp256k1_sha256_finalize(&hash->outer, out32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  202","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  203","line":""},
{"lineNum":"  204","line":""},
{"lineNum":"  205","line":"static void secp256k1_rfc6979_hmac_sha256_initialize(secp256k1_rfc6979_hmac_sha256_t *rng, const unsigned char *key, size_t keylen) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  206","line":"    secp256k1_hmac_sha256_t hmac;"},
{"lineNum":"  207","line":"    static const unsigned char zero[1] = {0x00};"},
{"lineNum":"  208","line":"    static const unsigned char one[1] = {0x01};"},
{"lineNum":"  209","line":""},
{"lineNum":"  210","line":"    memset(rng->v, 0x01, 32); /* RFC6979 3.2.b. */","class":"lineNoCov","hits":"0",},
{"lineNum":"  211","line":"    memset(rng->k, 0x00, 32); /* RFC6979 3.2.c. */","class":"lineNoCov","hits":"0",},
{"lineNum":"  212","line":""},
{"lineNum":"  213","line":"    /* RFC6979 3.2.d. */"},
{"lineNum":"  214","line":"    secp256k1_hmac_sha256_initialize(&hmac, rng->k, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  215","line":"    secp256k1_hmac_sha256_write(&hmac, rng->v, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  216","line":"    secp256k1_hmac_sha256_write(&hmac, zero, 1);","class":"lineNoCov","hits":"0",},
{"lineNum":"  217","line":"    secp256k1_hmac_sha256_write(&hmac, key, keylen);","class":"lineNoCov","hits":"0",},
{"lineNum":"  218","line":"    secp256k1_hmac_sha256_finalize(&hmac, rng->k);","class":"lineNoCov","hits":"0",},
{"lineNum":"  219","line":"    secp256k1_hmac_sha256_initialize(&hmac, rng->k, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  220","line":"    secp256k1_hmac_sha256_write(&hmac, rng->v, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  221","line":"    secp256k1_hmac_sha256_finalize(&hmac, rng->v);","class":"lineNoCov","hits":"0",},
{"lineNum":"  222","line":""},
{"lineNum":"  223","line":"    /* RFC6979 3.2.f. */"},
{"lineNum":"  224","line":"    secp256k1_hmac_sha256_initialize(&hmac, rng->k, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  225","line":"    secp256k1_hmac_sha256_write(&hmac, rng->v, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  226","line":"    secp256k1_hmac_sha256_write(&hmac, one, 1);","class":"lineNoCov","hits":"0",},
{"lineNum":"  227","line":"    secp256k1_hmac_sha256_write(&hmac, key, keylen);","class":"lineNoCov","hits":"0",},
{"lineNum":"  228","line":"    secp256k1_hmac_sha256_finalize(&hmac, rng->k);","class":"lineNoCov","hits":"0",},
{"lineNum":"  229","line":"    secp256k1_hmac_sha256_initialize(&hmac, rng->k, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  230","line":"    secp256k1_hmac_sha256_write(&hmac, rng->v, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  231","line":"    secp256k1_hmac_sha256_finalize(&hmac, rng->v);","class":"lineNoCov","hits":"0",},
{"lineNum":"  232","line":"    rng->retry = 0;","class":"lineNoCov","hits":"0",},
{"lineNum":"  233","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  234","line":""},
{"lineNum":"  235","line":"static void secp256k1_rfc6979_hmac_sha256_generate(secp256k1_rfc6979_hmac_sha256_t *rng, unsigned char *out, size_t outlen) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  236","line":"    /* RFC6979 3.2.h. */"},
{"lineNum":"  237","line":"    static const unsigned char zero[1] = {0x00};"},
{"lineNum":"  238","line":"    if (rng->retry) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  239","line":"        secp256k1_hmac_sha256_t hmac;","class":"lineNoCov","hits":"0",},
{"lineNum":"  240","line":"        secp256k1_hmac_sha256_initialize(&hmac, rng->k, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  241","line":"        secp256k1_hmac_sha256_write(&hmac, rng->v, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  242","line":"        secp256k1_hmac_sha256_write(&hmac, zero, 1);","class":"lineNoCov","hits":"0",},
{"lineNum":"  243","line":"        secp256k1_hmac_sha256_finalize(&hmac, rng->k);","class":"lineNoCov","hits":"0",},
{"lineNum":"  244","line":"        secp256k1_hmac_sha256_initialize(&hmac, rng->k, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  245","line":"        secp256k1_hmac_sha256_write(&hmac, rng->v, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  246","line":"        secp256k1_hmac_sha256_finalize(&hmac, rng->v);","class":"lineNoCov","hits":"0",},
{"lineNum":"  247","line":"    }"},
{"lineNum":"  248","line":""},
{"lineNum":"  249","line":"    while (outlen > 0) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  250","line":"        secp256k1_hmac_sha256_t hmac;"},
{"lineNum":"  251","line":"        int now = outlen;","class":"lineNoCov","hits":"0",},
{"lineNum":"  252","line":"        secp256k1_hmac_sha256_initialize(&hmac, rng->k, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  253","line":"        secp256k1_hmac_sha256_write(&hmac, rng->v, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  254","line":"        secp256k1_hmac_sha256_finalize(&hmac, rng->v);","class":"lineNoCov","hits":"0",},
{"lineNum":"  255","line":"        if (now > 32) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  256","line":"            now = 32;","class":"lineNoCov","hits":"0",},
{"lineNum":"  257","line":"        }"},
{"lineNum":"  258","line":"        memcpy(out, rng->v, now);","class":"lineNoCov","hits":"0",},
{"lineNum":"  259","line":"        out += now;","class":"lineNoCov","hits":"0",},
{"lineNum":"  260","line":"        outlen -= now;","class":"lineNoCov","hits":"0",},
{"lineNum":"  261","line":"    }"},
{"lineNum":"  262","line":""},
{"lineNum":"  263","line":"    rng->retry = 1;","class":"lineNoCov","hits":"0",},
{"lineNum":"  264","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  265","line":""},
{"lineNum":"  266","line":"static void secp256k1_rfc6979_hmac_sha256_finalize(secp256k1_rfc6979_hmac_sha256_t *rng) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  267","line":"    memset(rng->k, 0, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  268","line":"    memset(rng->v, 0, 32);","class":"lineNoCov","hits":"0",},
{"lineNum":"  269","line":"    rng->retry = 0;","class":"lineNoCov","hits":"0",},
{"lineNum":"  270","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  271","line":""},
{"lineNum":"  272","line":"#undef BE32"},
{"lineNum":"  273","line":"#undef Round"},
{"lineNum":"  274","line":"#undef sigma1"},
{"lineNum":"  275","line":"#undef sigma0"},
{"lineNum":"  276","line":"#undef Sigma1"},
{"lineNum":"  277","line":"#undef Sigma0"},
{"lineNum":"  278","line":"#undef Maj"},
{"lineNum":"  279","line":"#undef Ch"},
{"lineNum":"  280","line":""},
{"lineNum":"  281","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "aead_fuzz_debug", "date" : "2023-08-09 11:47:39", "instrumented" : 186, "covered" : 0,};
var merged_data = [];
